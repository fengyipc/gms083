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

var status;
 
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
                        if(cm.isQuestStarted(28177) && !cm.haveItem(4032479)) {
                                if(cm.canHold(4032479)) {
                                        cm.gainItem(4032479, 1);
                                        cm.sendOk("啊?你在找我?是长老斯坦让你过来的对吗? 但我真不是你们要找的人.我有什么可以证明?来,把这个带给#b#p1012003##k就可以了.");
                                } else {
                                        cm.sendOk("嘿,背包里留一些空间.");
                                }
                        } else {
                                cm.sendOk("Zzzzzz...");
                        }
                    
                        cm.dispose();
                }
        }
}
