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
            qm.sendNext("你知道吗，他们说下水道里有人想#r开发一种神奇的粉末让人生长#k, 这不是很棒吗?");
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