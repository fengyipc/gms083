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
 * @npc: Charles
 * @func: Treasure PQ
*/

var status = 0;
var em = null;
var timeLimit = 1;//每日限制次数
var 积分 = 5;//每次完成积分奖励
var PQtype = "藏宝猎人";
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

                if (status == 0) {
                        em = cm.getEventManager("TreasurePQ");
                        if (em == null) {
                                cm.sendOk("副本出错.");
                                cm.dispose();
                                return;
                        } else if (cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }

                        cm.sendSimple("#e#b<组队任务: 盖福克斯的宝藏>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你不能再往前走了，因为前面有非常危险的生物.您愿意与团队成员合作完成任务吗? 这样的话,请让队长与我对话.#b\r\n#L0#我想参加组队挑战.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索.\r\n#L2#我想知道细节.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("你必须组队参加挑战.");
                                        cm.dispose();
                                } else if (!cm.isLeader()) {
                                        cm.sendOk("只有队长才可以开始挑战");
                                        cm.dispose();
                                } else {
                                        var text;
                                        var map = cm.getPlayer().getMap();
                                        var party = cm.getParty().getPartyMembers();
                                        var 次数满足 = true;
                                        for (var i = 0; i < party.size(); i++) {
                                                if (map.getMapAllPlayers().get(party.get(i).getId()).getBossLog(0, PQtype) >= timeLimit) {
                                                        text = "由于玩家" + party.get(i).getName() + "今天剩余挑战次数不足,无法开始";
                                                        次数满足 = false;
                                                        break;
                                                }
                                        }
                                        if (次数满足) {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if (eli.size() > 0) {
                                                        if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("其他队伍正在挑战.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("你的队伍人数不足,或者队伍里有人不满足挑战条件.");
                                                }
                                        } else {
                                                cm.sendOk(text);
                                        }
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("你当前队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k. ");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<Party Quest: 盖福克斯的宝藏>#k#n\r\nMV appeared once more, disrupting the welfare of the people of New Leaf City. Join forces with other maplers to fend off this sudden attack. After defeating MV and his minions, fetch your prizes at MV's treasure room.\r\n每天可以进入" + timeLimit + "次,完成可以获得积分奖励");
                                cm.dispose();
                        }
                }
        }
}