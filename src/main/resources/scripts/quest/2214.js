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
	Author : 		Ronan
	NPC Name: 		Knocked Trash Can
	Map(s): 		Hut in the Swamp
	Description: 		Quest - The Run-down Huts in the Swamp
	Quest ID: 		2214
*/

var status = -1;
var canComplete;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            var hourDay = qm.getHourOfDay();
            if(!(hourDay >= 17 && hourDay < 20)) {
                qm.sendNext("(嗯，我在垃圾桶里找#t4031894#，但找不到咪咪说的那个，也许还不是时候。。。 )");
                canComplete = false;
                return;
            }
            
            if(!qm.canHold(4031894, 1)) {
                qm.sendNext("(呃，我现在拿不了#t4031894#，其他栏满了。)");
                canComplete = false;
                return;
            }
            
            canComplete = true;
            qm.sendNext("(啊，这里有张破纸条。。。嗯，它包含了一些即将发生的计划的细节，那一定是#r#p1052002##k说的.)");
        } else if (status == 1) {
            if (canComplete) {
                qm.forceCompleteQuest();
                qm.gainItem(4031894, 1);
                qm.gainExp(20000);
            }
            
            qm.dispose();
        }
    }
}