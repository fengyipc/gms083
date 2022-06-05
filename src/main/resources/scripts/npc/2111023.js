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
                        if(cm.isQuestStarted(3345)) {
                                var progress = cm.getQuestProgressInt(3345);
                            
                                if(progress == 3 && cm.haveItem(4031739, 1) && cm.haveItem(4031740, 1) && cm.haveItem(4031741, 1)) {
                                        cm.setQuestProgress(3345, 4);
                                        cm.gainItem(4031739, -1);
                                        cm.gainItem(4031740, -1);
                                        cm.gainItem(4031741, -1);
                    
                                        cm.sendOk("(当你放置碎片时，一束光照在圆圈上, 击退神器内部正在酝酿的任何预兆.)", 2);
                                        cm.dispose();
                                } else if(progress < 4) {
                                        cm.setQuestProgress(3345, 0);
                                        cm.dispose();
                                } else {
                                        cm.dispose();
                                }
                        }
                }
        }
}
