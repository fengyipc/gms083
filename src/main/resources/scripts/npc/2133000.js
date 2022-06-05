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
 * @npc: Ellin
 * @map: 300030100 - Deep Fairy Forest
 * @func: Ellin PQ
*/

var status = 0;
var em = null;
var timeLimit = 5;//每日限制次数
var 积分 = 1;//每次完成积分奖励
var PQtype = "毒雾森林";
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
                        em = cm.getEventManager("EllinPQ");
                        if (em == null) {
                                cm.sendOk("组队任务不可用.");
                                cm.dispose();
                                return;
                        } else if (cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }

                        cm.sendSimple("#e#b<组队任务: 毒雾森林>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想组队参加任务解开#b毒雾森林#k的谜团吗?请让#b队长#k与我交谈或者自己创建一个队伍.#b\r\n#L0#我想参加组队任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索.\r\n#L2#我想知道更多细节.\r\n#L3#我要领取奖励.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("必须组队才能参加组队任务.");
                                        cm.dispose();
                                } else if (!cm.isLeader()) {
                                        cm.sendOk("你的队长才可以开始任务.");
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
                        } else if (selection == 2) {
                                cm.sendOk("#e#b<组队任务:毒雾森林>#k#n\r\n在这个副本中，你的任务是逐步地穿过树林，迎战你道路上的所有怪物，解决你遇到的许多难题，采取最好的团队合作，克服时间限制和强大的生物。击败最后的怪物，你的团队有机会获得一个宝石，把它放置在出口前的泉水中，你们团队将得到额外的奖励。祝你好运.#e#b\r\n挑战每天限制进入" + timeLimit + "次,完成挑战将获得积分奖励");
                                cm.dispose();
                        }
                        else {
                                cm.sendSimple("那么你想要什么奖励?\r\n#b#L0##z1032060##l.\r\n#L1##z1032061##l.\r\n#L2##z1032072#(全属性5双攻3时装)#l");
                        }
                } else if (status == 2) {
                        if (selection == 0) {
                                if (!cm.haveItem(1032060) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060, 1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("你已经有#z1032060#或者你没有10个#z4001198#.");
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                if (cm.haveItem(1032060) && !cm.haveItem(1032061) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032060, -1);
                                        cm.gainItem(1032061, 1);
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("你没有#z1032060#或者10个#z4001198#或者你已经拥有了#z1032061#.");
                                        cm.dispose();
                                }
                        } else if (selection == 2) {
                                if (cm.haveItem(1032061) && !cm.haveItem(1032072) && cm.haveItem(4001198, 10)) {
                                        cm.gainItem(1032061, -1);
                                        cm.gainItem(1032072, 5, 5, 5, 5, 0, 0, 3, 3);    // thanks yuxaij for noticing unexpected itemid here
                                        cm.gainItem(4001198, -10);
                                        cm.dispose();
                                } else {
                                        cm.sendOk("你没有#z1032061#或者10个#z4001198#或者你已经拥有了#z1032072#.");
                                        cm.dispose();
                                }
                        }
                }
        }
}