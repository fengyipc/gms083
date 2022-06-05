/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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

/*
    NPC ID: 1052013 
    NPC NAME: Computer
    @author Ronan
*/

var status;
var pqArea;

function start() {
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

        if (cm.getMapId() != 193000000) {
            var eim = cm.getEventInstance();

            if (status == 0) {
                if (!eim.isEventCleared()) {
                    var couponsNeeded = eim.getIntProperty("couponsNeeded");

                    if (cm.isEventLeader()) {
                        if (cm.haveItem(4001007, couponsNeeded)) {
                            cm.sendNext("你们收集了需要的所有通行证,干得不错!");
                            cm.gainItem(4001007, couponsNeeded);
                            eim.clearPQ();

                            cm.dispose();
                            return;
                        } else {
                            cm.sendYesNo("你们必须收集#r" + couponsNeeded + "#k张通行证.收集齐了和我说... 或者现在想#b退出#k?如果你退出了#r你的队伍会被强制退出#k.");
                        }
                    } else {
                        cm.sendYesNo("你们必须收集#r" + couponsNeeded + "#k张通行证.收集齐了和我说... 或者现在想#b退出#k?如果你退出了#r你的队伍会被强制退出#k.");
                    }
                } else {
                    if (!eim.giveEventReward(cm.getPlayer())) {
                        cm.sendOk("其他栏空间不足.");
                        cm.dispose();
                    } else {
                        cm.warp(193000000);
                        cm.dispose();
                    }
                }
            } else if (status == 1) {
                cm.warp(193000000);
                cm.dispose();
            }
        } else {
            var levels = ["#m190000000#", "#m191000000#", "#m192000000#", "#m195000000#", "#m196000000#", "#m197000000#"];
            if (status == 0) {
                var sendStr = "网吧里面可以组队进行任务, 里面可以获得很多经验以及#p1052014#需要的橡皮擦.选择你要去的区域:\r\n\r\n#b";
                for (var i = 0; i < 6; i++) {
                    sendStr += "#L" + i + "#" + levels[i] + "#l\r\n";
                }

                cm.sendSimple(sendStr);
            } else if (status == 1) {
                pqArea = selection + 1;

                em = cm.getEventManager("CafePQ_" + pqArea);
                if (em == null) {
                    cm.sendOk("网吧组队任务_" + pqArea + "出错了.");
                    cm.dispose();
                    return;
                } else if (cm.isUsingOldPqNpcStyle()) {
                    status = 1;
                    action(1, 0, 0);
                    return;
                }

                cm.sendSimple("#e#b<组队任务:网吧- " + levels[selection] + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n#p1052014#和其他位置不一样. 不要金币或者百宝券,只有#r橡皮擦#k可以作为完成任务的证明.你需要组队进入.准备好了让队长和我对话.#b\r\n#L0#我想参加组队任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "队伍搜索.\r\n#L2#我想知道细节.");
            } else if (status == 2) {
                if (selection == 0) {
                    if (cm.getParty() == null) {
                        cm.sendOk("只能组队以后进入.");
                        cm.dispose();
                    } else if (!cm.isLeader()) {
                        cm.sendOk("队长才可以开启任务.");
                        cm.dispose();
                    } else {
                        var eli = em.getEligibleParty(cm.getParty());
                        if (eli.size() > 0) {
                            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                cm.sendOk("其他队伍正在挑战了.");
                            }
                        }
                        else {
                            cm.sendOk("你不能开始,队伍人数不足或者等级不合要求.");
                        }

                        cm.dispose();
                    }
                } else if (selection == 1) {
                    var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                    cm.sendOk("队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.");
                    cm.dispose();
                } else {
                    cm.sendOk("#e#b组队任务:网吧>#k#n\r\n进入地图之后你要对抗一些怪物. 它们会掉落一些通行证,收集然后交给我.之后你们会得到橡皮擦. 橡皮擦可以进行抽奖.");
                    cm.dispose();
                }
            }
        }
    }
}
