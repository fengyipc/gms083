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
                        if(cm.isQuestStarted(3311)) {
                                var progress = cm.getQuestProgressInt(3311);
                                
                                if (progress == 4) {
                                        progress = 7;
                                } else {
                                        progress = 5;
                                }
                                
                                cm.setQuestProgress(3311, progress);
                                
                                cm.sendOk("德朗博士的的笔记.很多公式和浮夸的科学文献可以在书页中找到，但值得注意的是，在最后一篇文章（3周前）中，有人写道，他完成了对新赫罗里德蓝图改进的研究，从而为向“社会”展示它做了最后的准备。。。 后面没有内容了...", 2);
                        } else if(cm.isQuestStarted(3322) && !cm.haveItem(4031697, 1)) {
                                if(cm.canHold(4031697, 1))
                                        cm.gainItem(4031697, 1);
                                else
                                        cm.sendNext("你的背包满了,请将其他栏腾出一些空间.");
                        }
                    
                        cm.dispose();
                }
        }
}
