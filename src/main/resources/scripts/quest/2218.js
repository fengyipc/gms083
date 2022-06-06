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

var status = -1;

function start(mode, type, selection) {
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
            qm.sendNext("嘿，你看到#r拉凯利斯#k这些天的表现有多奇怪吗？我们应该看看她怎么了，她最近的行为很奇怪。。。");
        } else if (status == 1) {
            qm.forceCompleteQuest();
            qm.gainExp(7000);
            
            if(isAllSubquestsDone() && qm.haveItem(4031894)) {
                qm.gainItem(4031894, -1);
            }
            
            qm.dispose();
        }
    }
}

function isAllSubquestsDone() {
    for(var i = 2216; i <= 2219; i++) {
        if(!qm.isQuestCompleted(i)) {
            return false;
        }
    }
    
    return true;
}