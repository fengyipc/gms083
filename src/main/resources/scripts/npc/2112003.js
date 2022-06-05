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

/**
 * @author: Ronan
 * @npc: Juliet
 * @map: Magatia - Alcadno - Hidden Room (261000021)
 * @func: Magatia PQ (Alcadno)
*/

var status = 0;
var em = null;
var timeLimit = 5;//每日限制次数
var 积分 = 2;//每次完成积分奖励
var PQtype = "罗密欧与朱丽叶";
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if (cm.getMapId() != 261000021) {
                        if (status == 0) {
                                cm.sendYesNo("我们必须继续战斗来拯救罗密欧，请保持你的步伐。如果你不想继续下去，我会理解。。。所以，你要撤退吗?");
                        } else if (status == 1) {
                                cm.warp(926110700, 0);
                                cm.dispose();
                        }
                } else {
                        if (status == 0) {
                                em = cm.getEventManager("MagatiaPQ_A");
                                if (em == null) {
                                        cm.sendOk("遇到了未知的错误.");
                                        cm.dispose();
                                        return;
                                } else if (cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队副本: 罗密欧与朱丽叶>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我心爱的罗密欧被绑架了! 虽然他是泽努米斯特的，但我不能袖手旁观，仅仅因为这场愚蠢的冲突就看到他受苦。我需要你和你的同事帮忙救他！求你了，帮帮我们！！请你的队长来跟我谈谈.#b\r\n#L0#我想参加组队副本呢.\r\n#L1#我想 " + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索.\r\n#L2#我想听听更多的细节.#l");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("只有在队伍中你才能参加组队任务.");
                                                cm.dispose();
                                        } else if (!cm.isLeader()) {
                                                cm.sendOk("你的队长一定要跟我谈谈才能开始这个组队任务.");
                                                cm.dispose();
                                        } else {
                                                var text;
                                                var map = cm.getPlayer().getMap();
                                                var party = cm.getParty().getPartyMembers();
                                                var 次数满足 = true;
                                                var players = Array();
                                                for (var i = 0; i < party.size(); i++) {
                                                        var p = map.getMapAllPlayers().get(party.get(i).getId());
                                                        if (p == null) {
                                                                text = "由于玩家" + party.get(i).getName() + "不在当前地图,无法开始任务";
                                                                次数满足 = false;
                                                                break;
                                                        }
                                                        if (p.getBossLog(0, PQtype) >= timeLimit) {
                                                                text = "由于玩家" + party.get(i).getName() + "今天剩余挑战次数不足,无法开始任务";
                                                                次数满足 = false;
                                                                break;
                                                        }
                                                        players.push(p);
                                                }
                                                if (次数满足) {
                                                        var eli = em.getEligibleParty(cm.getParty());
                                                        if (eli.size() > 0) {
                                                                if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                        cm.sendOk("其他队伍正在进行,等他们出来又或者去其他频道看看.");
                                                                } else {
                                                                        for (var i = 0; i < players.length; i++)
                                                                                players[i].setBossLog(0, PQtype);
                                                                }
                                                        }
                                                        else {
                                                                cm.sendOk("你还不能开始组队任务,因为你队伍里面的人数不足或者有人没有资格参加.");
                                                        }
                                                } else {
                                                        cm.sendOk(text);
                                                }
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你当前的队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队副本: 罗密欧与朱丽叶>#k#n\r\n不久前，一位名叫尤利特的科学家因为研究阿尔卡多和泽努米斯特的结合炼金术而被逐出了这个小镇，由于这种结合所产生的巨大力量，法律禁止对两者进行研究。然而，他忽视了这一规律，在两项研究中都获得了成功。结果，他被流放了。\r\n他现在正在报复，已经带走了我心爱的一个，他的下一个目标是我，因为我们是两个社会的继承人马加蒂的大照片。但我不害怕。我们必须不惜一切代价找到他!\r\n#e#b每天可以进入" + timeLimit + "次,完成可获得积分奖励");
                                        cm.dispose();
                                }
                        }
                }
        }
}