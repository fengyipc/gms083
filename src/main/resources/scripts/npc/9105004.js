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
 * @Author Ronan
 * Snow Spirit
	Maplemas PQ coordinator
 */

importPackage(Packages.server.life);

var prizeTree = [[[2000002, 1002850], [20, 1]], [[2000006, 1012011], [20, 1]]];

var state;
var status;
var gift;
var pqType;
        
function start() {
        pqType = ((cm.getMapId() / 10) % 10) + 1;
        state = (cm.getMapId() % 10 > 0) ? 1 : 0;
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
        
                if(state > 0) {
                        insidePqAction(mode, type, selection);
                } else {
                        recruitPqAction(mode, type, selection);
                }
        }
}

function recruitPqAction(mode, type, selection) {
        if (status == 0) {
                em = cm.getEventManager("HolidayPQ_" + pqType);
                if(em == null) {
                        cm.sendOk("The Holiday PQ " + pqType + " has encountered an error.");
                        cm.dispose();
                } else if(cm.isUsingOldPqNpcStyle()) {
                        action(1, 0, 0);
                        return;
                }

                cm.sendSimple("#e#b<组队挑战:圣诞派对>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n来参加组队挑战吧? 在这里，你会发现一些障碍和问题，如果没有良好的团队合作，你将无法战胜它.如果你想挑战,就让队长来跟我对话#b\r\n#L0#我想参加组队挑战.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "队伍搜索.\r\n#L2#我想知道一些细节.");
        } else if (status == 1) {
                if (selection == 0) {
                        if (cm.getParty() == null) {
                                cm.sendOk("你只有组队才可以参加挑战.");
                                cm.dispose();
                        } else if(!cm.isLeader()) {
                                cm.sendOk("队长才可以开始.");
                                cm.dispose();
                        } else {
                                var eli = em.getEligibleParty(cm.getParty());
                                if(eli.size() > 0) {
                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), pqType)) {
                                                cm.sendOk("其他队伍正在进行挑战了.");
                                        }
                                }
                                else {
                                        cm.sendOk("队伍人数不足或者有人不满足等级限制.");
                                }

                                cm.dispose();
                        }
                } else if (selection == 1) {
                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                        cm.sendOk("你当前队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.");
                        cm.dispose();
                } else {
                        cm.sendOk("#e#b<组队挑战:圣诞派对>#k#n\r\n\r\n堆雪人来保护幸福村.进去以后用任何方法保护雪人,为雪人添加活力.");
                        cm.dispose();
                }
        }
}

function insidePqAction(mode, type, selection) {
        var eim = cm.getEventInstance();
        var difficulty = eim.getIntProperty("level");
        var stg = eim.getIntProperty("statusStg1");

        var mapobj = eim.getInstanceMap(889100001 + 10 * (difficulty - 1));

        if(status == 0) {
                if(stg == -1) {
                        cm.sendNext("#b#h0##k... 你来了.这是幸福村居民堆巨型雪人的地方.但是史高基的下属现在正在攻击它.现在赶快! 请在时间范围内保护雪人.如果你消除了它们，它们就会掉落一个叫做雪活力的物品.收集这些并且放在雪人身上,你会看到雪人会长大.当雪人恢复到它正常的大小了你的任务就完成了. 有一个事情要注意就是有可能会出现加的雪人活力,这将使雪人融化.祝你好运.");
                } else if(stg == 0) {
                        if(cm.getMap().getMonsterById(9400321 + 5 * difficulty) == null) {
                                cm.sendNext("拜托,打败这些坏蛋帮雪人长大.");
                                cm.dispose();
                        } else {
                                cm.sendNext("干得漂亮.");
                        }
                } else {
                        if(!eim.isEventCleared()) {
                                cm.sendNext("请击败他!");
                                cm.dispose();
                        } else {
                                cm.sendNext("哇!!你做到了!!");
                        }
                }
        } else if(status == 1) {
                if(stg == -1) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("请让队长来.");
                                cm.dispose();
                                return;
                        }

                        mapobj.allowSummonState(true);
                        var snowman = MapleLifeFactory.getMonster(9400317 + (5 * difficulty));
                        mapobj.spawnMonsterOnGroundBelow(snowman, new java.awt.Point(-180, 15));
                        eim.setIntProperty("snowmanLevel", 1);
                        eim.dropMessage(5, "雪人出现了,请尽力保护它!");

                        eim.setIntProperty("statusStg1", 0);
                        cm.dispose();
                        return;
                } else if(stg == 0) {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("让队长来.");
                                cm.dispose();
                                return;
                        }

                        mapobj.broadcastStringMessage(5, "雪人长大了,怪物出来了!");
                        eim.getEm().getIv().invokeFunction("snowmanHeal", eim);

                        var boss = MapleLifeFactory.getMonster(9400318 + difficulty);
                        mapobj.spawnMonsterOnGroundBelow(boss, new java.awt.Point(-180, 15));
                        eim.setProperty("spawnedBoss", "true");

                        eim.setIntProperty("statusStg1", 1);
                        cm.dispose();
                } else {
                        gift = cm.haveItem(4032092, 1);
                        if(gift) {
                                var optStr = generateSelectionMenu(generatePrizeString());
                                cm.sendSimple("哦,你拿来了一个#b#t4032092##k? 很好，等一下... 这是你的礼物.请选择你想要的:\r\n\r\n" + optStr);
                        } else if(eim.gridCheck(cm.getPlayer()) == -1) {
                                cm.sendNext("给你~");
                        } else {
                                cm.sendOk("快乐!!");
                                cm.dispose();
                        }
                }

        } else if(status == 2) {
                if(gift) {
                        var selItems = prizeTree[selection];
                        if(cm.canHoldAll(selItems[0], selItems[1])) {
                                cm.gainItem(4032092, -1);
                                cm.gainItem(selItems[0][0], selItems[1][0]);

                                if(selection == 1) {
                                        var rnd = (Math.random() * 9) | 0;
                                        cm.gainItem(selItems[0][1] + rnd, selItems[1][1]);
                                } else {
                                        cm.gainItem(selItems[0][1], selItems[1][1]);
                                }
                        } else {
                                cm.sendOk("背包空间不足.");
                        }
                } else {
                        if(eim.giveEventReward(cm.getPlayer(), difficulty)) {
                                eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                                cm.sendOk("背包空间不足.");
                        }
                }

                cm.dispose();
        }
}

function generatePrizeString() {
        var strTree = [];
        
        for(var i = 0; i < prizeTree.length; i++) {
                var items = prizeTree[i][0];
                var qtys = prizeTree[i][1];

                var strSel = "";
                for(var j = 0; j < items.length; j++) {
                        strSel += ("#i" + items[j] + "# #t" + items[j] + "#" + (qtys[j] > 1 ? (" : " + qtys[j]) : ""));
                }

                strTree.push(strSel);
        }
        
        return strTree;
}

function generateSelectionMenu(array) {
        var menu = "";
        for (var i = 0; i < array.length; i++) {
                menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
}