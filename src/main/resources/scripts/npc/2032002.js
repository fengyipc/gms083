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
/* Aura
 * 
 * Adobis's Mission I: Unknown Dead Mine (280010000)
 * 
 * Zakum PQ NPC (the one and only)
*/

var status;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        var eim = cm.getPlayer().getEventInstance();
        
        if (status == 0) {
            if(!eim.isEventCleared()) {
                cm.sendSimple("...#b\r\n#L0#我在这儿要做些什么?#l\r\n#L1#我带来了你想要的东西!#l\r\n#L2#我要出去!#l");
            } else {
                cm.sendNext("你完成了挑战,挑选你的奖励吧.");
            }
        }
        else if (status == 1) {
            if(!eim.isEventCleared()) {
                selectedType = selection;
                if (selection == 0) {
                    cm.sendNext("你需要重新制造火焰的眼才能揭示它的力量.这个地下城里面藏着#b#z4001018##k,这是制作火焰的眼的必需材料.找到它并带来给我.\r\n\r\n你可以顺便帮我一个忙吗?那里面还有一些文件碎片藏在一些石头下面.如果你可以带来30个,我可以提供一些东西给你.");
                    cm.dispose();
                    return;
                }
                else if (selection == 1) {
                    if(!cm.isEventLeader()) {
                        cm.sendNext("请让你的队长把#z4001018#带来给我.");
                        cm.dispose();
                        return;
                    }

                    if (!cm.haveItem(4001018)) { //fire ore
                        cm.sendNext("请带上#b#z4001018##k.");
                        cm.dispose();
                    }
                    else {
                        gotAllDocs = cm.haveItem(4001015, 30);
                        if (!gotAllDocs) { //documents
                            cm.sendYesNo("你带来了#z4001018#? 那么，我可以给你和你队伍的每一个成员一块,这样就足够制作火焰的眼了。在继续之前，确保你的整个团队都有足够的背包空间。");
                        } else {
                            cm.sendYesNo("你带来了#z4001018#? 那么，我可以给你和你队伍的每一个成员一块,这样就足够制作火焰的眼了. 同事, 由于你 #r带来了文件#k ,我会另外给你一些卷轴,它可以#b带你回废矿区#k. 在继续之前，确保你的整个团队都有足够的背包空间。");
                        }
                    }
                } else if (selection == 2)
                    cm.sendYesNo("确定要离开吗? 如果你是队长,你队伍的所有成员都将被传送出去.");
            } else {
                if(eim.getProperty("gotDocuments") == 1) {
                    if(eim.gridCheck(cm.getPlayer()) == -1) {
                        if(cm.canHoldAll([2030007, 4031061], [5, 1])) {
                            cm.gainItem(2030007, 5);
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("继续之前,确保你背包里有足够的空间.");
                        }
                    } else {
                        cm.sendOk("你已经收到了你的那份。你现在可以通过那边的入口离开矿井了。");
                    }
                } else {
                    if(eim.gridCheck(cm.getPlayer()) == -1) {
                        if(cm.canHold(4031061, 1)) {
                            cm.gainItem(4031061, 1);

                            eim.gridInsert(cm.getPlayer(), 1);
                        } else {
                            cm.sendOk("继续之前,确保你背包里有足够的空间.");
                        }
                    } else {
                        cm.sendOk("你已经收到了你的那份。你现在可以通过那边的入口离开矿井了。");
                    }
                }
                
                cm.dispose();
            }
            
        }
        else if (status == 2) {
            if (selectedType == 1) {
                cm.gainItem(4001018, -1);
                
                if(gotAllDocs) {
                    cm.gainItem(4001015, -30);
                    
                    eim.setProperty("gotDocuments", 1);
                    eim.giveEventPlayersExp(20000);
                } else {
                    eim.giveEventPlayersExp(12000);
                }
                
                eim.clearPQ();
                cm.dispose();
            }
            else if (selectedType == 2) {
                cm.warp(211042300);
                cm.dispose();
            }
        }
    }
}