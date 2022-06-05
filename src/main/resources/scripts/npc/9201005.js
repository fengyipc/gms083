/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2017 RonanLana

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Assistant Nicole
    Marriage NPC
 */

importPackage(Packages.net.server.channel);

var status;
var wid;
var isMarrying;

var cathedralWedding = true;
var weddingEventName = "WeddingCathedral";
var weddingEntryTicketCommon = 5251000;
var weddingEntryTicketPremium = 5251003;
var weddingSendTicket = 4031395;
var weddingGuestTicket = 4031407;
var weddingAltarMapid = 680000210;
var weddingIndoors;

function isWeddingIndoors(mapid) {
    return mapid >= 680000100 && mapid <= 680000500;
}

function hasSuitForWedding(player) {
    var baseid = (player.getGender() == 0) ? 1050131 : 1051150;

    for (var i = 0; i < 4; i++) {
        if (player.haveItemWithId(baseid + i, true)) {
            return true;
        }
    }

    return false;
}

function getMarriageInstance(weddingId) {
    var em = cm.getEventManager(weddingEventName);

    for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
        var eim = iterator.next();

        if (eim.getIntProperty("weddingId") == weddingId) {
            return eim;
        }
    }

    return null;
}

function hasWeddingRing(player) {
    var rings = [1112806, 1112803, 1112807, 1112809];
    for (var i = 0; i < rings.length; i++) {
        if (player.haveItemWithId(rings[i], true)) {
            return true;
        }
    }

    return false;
}

function start() {
    weddingIndoors = isWeddingIndoors(cm.getMapId());
    status = -1;

    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (!weddingIndoors) {
            var hasEngagement = false;
            for (var x = 4031357; x <= 4031364; x++) {
                if (cm.haveItem(x, 1)) {
                    hasEngagement = true;
                    break;
                }
            }

            if (status == 0) {
                var text = "欢迎来到#b大教堂#k!有什么事吗?";
                var choice = ["我应该怎么准备婚礼?", "我订婚了，想安排婚礼", "我受邀请来参加婚礼"];
                for (x = 0; x < choice.length; x++) {
                    text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                }

                if (cm.haveItem(5251100)) {
                    text += "\r\n#L" + x + "##b制作额外的请柬#l";
                }

                cm.sendSimple(text);
            } else if (status == 1) {
                switch (selection) {
                    case 0:
                        cm.sendOk("你首先需要#b与某人订婚#k.#p9201000#制作订婚戒指.一旦是订婚状态,购买一个#b#t" + weddingEntryTicketCommon + "##k.\r\n给我看看你们的订婚戒指和婚礼票,我就会为你预订#r15张请柬#k.使用请柬邀请宾客.他们需要一张请柬才可以参加婚礼.");
                        cm.dispose();
                        break;

                    case 1:
                        if (hasEngagement) {
                            var wserv = cm.getClient().getWorldServer();
                            var cserv = cm.getClient().getChannelServer();
                            var weddingId = wserv.getRelationshipId(cm.getPlayer().getId());

                            if (weddingId > 0) {
                                if (cserv.isWeddingReserved(weddingId)) {    // registration check
                                    var placeTime = cserv.getWeddingReservationTimeLeft(weddingId);
                                    cm.sendOk("你们的婚礼将在#r" + placeTime + "#k开始.打扮好自己别迟到!");
                                } else {
                                    var partner = wserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                                    if (partner == null) {
                                        cm.sendOk("你的伴侣现在好像离线了... ");
                                        cm.dispose();
                                        return;
                                    }

                                    if (hasWeddingRing(cm.getPlayer()) || hasWeddingRing(partner)) {
                                        cm.sendOk("你或者你的伴侣已经有了结婚戒指.");
                                        cm.dispose();
                                        return;
                                    }

                                    if (!cm.getMap().equals(partner.getMap())) {
                                        cm.sendOk("请让你的伴侣也来登记预订.");
                                        cm.dispose();
                                        return;
                                    }

                                    if (!cm.canHold(weddingSendTicket, 15) || !partner.canHold(weddingSendTicket, 15)) {
                                        cm.sendOk("你们俩有人的背包空间不足.");
                                        cm.dispose();
                                        return;
                                    }

                                    if (!cm.getUnclaimedMarriageGifts().isEmpty() || !partner.getAbstractPlayerInteraction().getUnclaimedMarriageGifts().isEmpty()) {
                                        cm.sendOk("Eerhm... 对不起，根据婚礼村结婚礼物登记处的记录，有些东西不对劲. 请和#b#p9201014##k确认一下.");
                                        cm.dispose();
                                        return;
                                    }

                                    var hasCommon = cm.haveItem(weddingEntryTicketCommon);
                                    var hasPremium = cm.haveItem(weddingEntryTicketPremium);

                                    if (hasCommon || hasPremium) {
                                        var weddingType = (hasPremium ? true : false);

                                        var player = cm.getPlayer();
                                        var resStatus = cserv.pushWeddingReservation(weddingId, cathedralWedding, weddingType, player.getId(), player.getPartnerId());
                                        if (resStatus > 0) {
                                            cm.gainItem((weddingType) ? weddingEntryTicketPremium : weddingEntryTicketCommon, -1);

                                            var expirationTime = Channel.getRelativeWeddingTicketExpireTime(resStatus);
                                            cm.gainItem(weddingSendTicket, 15, false, true, expirationTime);
                                            partner.getAbstractPlayerInteraction().gainItem(weddingSendTicket, 15, false, true, expirationTime);

                                            var placeTime = cserv.getWeddingReservationTimeLeft(weddingId);

                                            var wedType = weddingType ? "Premium" : "Regular";
                                            cm.sendOk("你们俩都拿到了15张请柬,把它们送给你们的朋友. #b双击请柬#k 发送.#r婚礼开始前#k才可以发送邀请. 你们的#b" + wedType + " 婚礼#k 将在#r" + placeTime + "#k举行.打扮好自己别迟到了!");
                                            player.dropMessage(6, "婚礼助手:你们俩都拿到了15张请柬. 婚礼开始前才可以发送邀请. 你们的" + wedType + "婚礼将在" + placeTime + "举行. 打扮好别迟到!");
                                            partner.dropMessage(6, "婚礼助手:你们俩都拿到了15张请柬. 婚礼开始前才可以发送邀请. 你们的" + wedType + "婚礼将在" + placeTime + "举行. 打扮好别迟到!");

                                            if (!hasSuitForWedding(player)) {
                                                player.dropMessage(5, "婚礼助手:请在出席婚礼前购买一件婚纱。一个可以在最左边的婚庆店买到.");
                                            }

                                            if (!hasSuitForWedding(partner)) {
                                                partner.dropMessage(5, "婚礼助手:请在出席婚礼前购买一件婚纱。一个可以在最左边的婚庆店买到.");
                                            }
                                        } else {
                                            cm.sendOk("你的婚礼预约一定是最近办理的.请稍后再试.");
                                        }
                                    } else {
                                        cm.sendOk("Please have a #b#t" + weddingEntryTicketCommon + "##k available on your CASH inventory before trying to register a reservation.");
                                    }
                                }
                            } else {
                                cm.sendOk("Wedding reservation encountered an error, try again later.");
                            }

                            cm.dispose();
                        } else {
                            cm.sendOk("You do not have an engagement ring.");
                            cm.dispose();
                        }
                        break;

                    case 2:
                        if (cm.haveItem(weddingGuestTicket)) {
                            var cserv = cm.getClient().getChannelServer();

                            wid = cserv.getOngoingWedding(cathedralWedding);
                            if (wid > 0) {
                                if (cserv.isOngoingWeddingGuest(cathedralWedding, cm.getPlayer().getId())) {
                                    var eim = getMarriageInstance(wid);
                                    if (eim != null) {
                                        cm.sendOk("Enjoy the wedding. Don't drop your Gold Maple Leaf or you won't be able to finish the whole wedding.");
                                    } else {
                                        cm.sendOk("Please wait a moment while the couple get ready to enter the Cathedral.");
                                        cm.dispose();
                                    }
                                } else {
                                    cm.sendOk("Sorry, but you have not been invited for this wedding.");
                                    cm.dispose();
                                }
                            } else {
                                cm.sendOk("There is no wedding booked right now.");
                                cm.dispose();
                            }
                        } else {
                            cm.sendOk("You do not have a #b#t" + weddingGuestTicket + "##k.");
                            cm.dispose();
                        }
                        break;

                    default:
                        var wserv = cm.getClient().getWorldServer();
                        var cserv = cm.getClient().getChannelServer();
                        var weddingId = wserv.getRelationshipId(cm.getPlayer().getId());

                        var resStatus = cserv.getWeddingReservationStatus(weddingId, cathedralWedding);
                        if (resStatus > 0) {
                            if (cm.canHold(weddingSendTicket, 3)) {
                                cm.gainItem(5251100, -1);

                                var expirationTime = Channel.getRelativeWeddingTicketExpireTime(resStatus);
                                cm.gainItem(weddingSendTicket, 3, false, true, expirationTime);
                            } else {
                                cm.sendOk("Please have a free ETC slot available to get more invitations.");
                            }
                        } else {
                            cm.sendOk("You're not currently booked on the Cathedral to make additional invitations.");
                        }

                        cm.dispose();
                }
            } else if (status == 2) {   // registering guest
                var eim = getMarriageInstance(wid);

                if (eim != null) {
                    cm.gainItem(weddingGuestTicket, -1);
                    eim.registerPlayer(cm.getPlayer());     //cm.warp(680000210, 0);
                } else {
                    cm.sendOk("The marriage event could not be found.");
                }

                cm.dispose();
            }
        } else {
            if (status == 0) {
                var eim = cm.getEventInstance();
                if (eim == null) {
                    cm.warp(680000000, 0);
                    cm.dispose();
                    return;
                }

                isMarrying = (cm.getPlayer().getId() == eim.getIntProperty("groomId") || cm.getPlayer().getId() == eim.getIntProperty("brideId"));

                if (eim.getIntProperty("weddingStage") == 0) {
                    if (!isMarrying) {
                        cm.sendOk("Welcome to the #b#m" + cm.getMapId() + "##k. Please hang around with the groom and bride while the other guests are gathering here.\r\n\r\nWhen the timer reach it's end the couple will head to the altar, at that time you will be allowed to root over them from the #bguests area#k.");
                    } else {
                        cm.sendOk("Welcome to the #b#m" + cm.getMapId() + "##k. Please greet the guests that are already here while the others are coming. When the timer reach it's end the couple will head to the altar.");
                    }

                    cm.dispose();
                } else {
                    cm.sendYesNo("The #bbride and groom#k are already on their way to the altar. Would you like to join them now?");
                }
            } else if (status == 1) {
                cm.warp(weddingAltarMapid, "sp");
                cm.dispose();
            }
        }

    }
}