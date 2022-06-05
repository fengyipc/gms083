/*
        This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

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
*	Author : Raz
*	Author : Ronan
*
*	NPC = 9103001 - Rolly
*	Map =  Ludibrium - <Ludibrium>
*	NPC MapId = 220000000
*	Function = Start LMPQ
*
*/

var status = 0;

var timeLimit = 3;//每日限制次数
var 积分 = 2;//每次完成积分奖励
var PQtype = "玩具城迷宫";
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
                        em = cm.getEventManager("LudiMazePQ");
                        if (em == null) {
                                cm.sendOk("玩具城迷宫组队挑战出错了.");
                                cm.dispose();
                                return;
                        } else if (cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }

                        cm.sendSimple("#e#b<组队挑战:玩具城迷宫>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n这是玩具城迷宫的入口!\r\n#b#L0#进入迷宫#l\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "队伍搜索.\r\n#L2#玩具城迷宫里有什么?");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("请先组队.");
                                        cm.dispose();
                                } else if (!cm.isLeader()) {
                                        cm.sendOk("队长来!");
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
                                                                cm.sendOk("其他队伍正在挑战,请等他们出来或者去其他频道看看.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("这个至少需要三个人.");
                                                }
                                        } else {
                                                cm.sendOk(text);
                                        }
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("你当前的队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k. ");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队挑战:玩具城迷宫>#k#n\r\n这个迷宫对51~70级玩家开放,需要3~6人的队伍.将有15分钟时间逃出迷宫.房间中间,将会有一个传送门,传送门连接向另外一个可能是出口的房间.Pietri 会在出口的地方,你们需要找到他与他对话.打开房间里的盒子会出现怪物,怪物将掉落通行证.如果在规定时间内收集超过30个通行证,将会得到特殊的奖励.如果时间过去,你们没有离开迷宫,那么什么也得不到.如果队伍里有成员中途离开,剩下的人还可以继续挑战,除非剩余的人数量少于进入挑战的最低人数要求!祝你好运!\r\n#e#b每天可以进入迷宫" + timeLimit + "次,完成可获得积分奖励");
                                cm.dispose();
                        }
                }
        }
}