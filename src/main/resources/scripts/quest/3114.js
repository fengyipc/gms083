/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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

var status = -1;

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
            if(qm.getQuestProgress(3114, 7777) != -1) {
                if(!qm.haveItem(4161036, 1)) {
                    if(qm.canHold(4161036, 1)) {
                        qm.gainItem(4161036, 1);
                        qm.sendNext("你好像丢了一本给小星星写笔记的书。这是另一个。请为我演奏。", 9);
                    } else {
                        qm.sendNext("你好像丢了一本带小星星笔记的书，但是你没有足够的空间。", 9);
                    }
                } else {
                    qm.sendNext(".....", 9);
                }
                
                qm.dispose();
                return;
            }
            
            qm.sendNext("(他似乎睡得很沉。)", 3);
        } else if (status == 1) {
            qm.gainFame(20);
            
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}