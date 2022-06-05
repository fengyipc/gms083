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
/* Nana, the Love fairy
	Amoria (680000000)
	Engagement ring NPC.
 */

    var status;
    var state;
    
    var item;
    var mats;
    var matQty;
    var cost;
    
    var options;
    
    function hasProofOfLoves(player) {
        var count = 0;
        
        for(var i = 4031367; i <= 4031372; i++) {
            if(player.haveItem(i)) {
                count++;
            }
        }
        
        return count >= 4;
    }
    
    function getNanaLocation(player) {
        var mapid = player.getMap().getId();
        
        for(var i = 0; i < mapids.length; i++) {
            if(mapid == mapids[i]) {
                return i;
            }
        }
        
        return -1;
    }
    
    var nanaLoc;
    var mapids = [100000000, 103000000, 102000000, 101000000, 200000000, 220000000];
    var questItems = [4000001, 4000037, 4000215, 4000026, 4000070, 4000128];
    var questExp = [2000, 5000, 10000, 17000, 22000, 30000];
    
    function processNanaQuest() {
        if(cm.haveItem(questItems[nanaLoc], 50)) {
            if(cm.canHold(4031367 + nanaLoc, 1)) {
                cm.gainItem(questItems[nanaLoc], -50);
                cm.gainItem(4031367 + nanaLoc, 1);
    
                cm.sendOk("谢谢你,给你#b#t4031367##k.");
                return true;
            } else {
                cm.sendOk("背包装不下了.");
            }
        } else {
            cm.sendOk("给我#b50个#t" + questItems[nanaLoc] + "##k.");
        }
        
        return false;
    }
    
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
    
            if(status == 0) {
                if(!cm.isQuestStarted(100400)) {
                    cm.sendOk("你好#b#h0##k,我是#p9201001#,爱情妖精.");
                    cm.dispose();
                    return;
                }
                
                nanaLoc = getNanaLocation(cm.getPlayer());
                if(nanaLoc == -1) {
                    cm.sendOk("好#b#h0##k,我是#p9201001#,爱情妖精.");
                    cm.dispose();
                    return;
                }
                
                if(!cm.haveItem(4031367 + nanaLoc, 1)) {
                    if(cm.isQuestCompleted(100401 + nanaLoc)) {
                        state = 1;
                        cm.sendAcceptDecline("你弄丢了我给你的#k#t4031367##k? 好吧,我可以再给你,这次别再弄丢了好吗?这次要你带#r50个#t" + questItems[nanaLoc] + "#给我.#k");
                    } else if(cm.isQuestStarted(100401 + nanaLoc)) {
                        if(processNanaQuest()) {
                            cm.gainExp(questExp[nanaLoc] * cm.getPlayer().getExpRate());
                            cm.completeQuest(100401 + nanaLoc);
                        }
                        
                        cm.dispose();
                    } else {
                        state = 0;
                        cm.sendAcceptDecline("你在找#k#t4031367#吗#k?你帮我一个忙的话我可以给你?");
                    }
                } else {
                    cm.sendOk("你已经从我这里获得过#t4031367#吧?");
                    cm.dispose();
                }
            } else if(status == 1) {
                if(state == 0) {
                    cm.startQuest(100401 + nanaLoc);
                    
                    cm.sendOk("我需要你收集#r50个#t" + questItems[nanaLoc] + "##k.");
                    cm.dispose();
                } else {
                    processNanaQuest();
                    cm.dispose();
                }
            }
        }
    }