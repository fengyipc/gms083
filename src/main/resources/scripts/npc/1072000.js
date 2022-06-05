/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Warrior Job Instructor
	Warrior 2nd Job Advancement
	Victoria Road : West Rocky Mountain IV (102020300)
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
                        if (cm.isQuestCompleted(100004)) {
                            cm.sendOk("你真是个英雄!");
                            cm.dispose();
                        } else if(cm.isQuestCompleted(100003)) {
                            cm.sendNext("好的，我让你进去！打败里面的怪物，收集30个#b黑珠#k，然后和里面的教官对话。他会给你一个英雄的证明，证明你通过了考试。祝你好运。");
                            status = 4;
                        } else if (cm.isQuestStarted(100003)) {
                            cm.sendNext("嗯...这一定是#b武术教官#k的信件...所以你一路过来是来进行战士二转测试的.好的,我来给你说明.别紧张,并不困难.");
                        } else {
                            cm.sendOk("你准备好了我会给你开门.");
                            cm.dispose();
                        }
                }
                else if (status == 1)
                        cm.sendNextPrev("我会把你送到一个隐藏地图里.在里面你会遇到平常碰不到的怪物.他们和普通怪物看起来没有什么区别,但是属性不太一样. 击败它们你得不到经验值或者战利品.");
                else if (status == 2)
                        cm.sendNextPrev("击败怪物你可以得到#b#t4031013##k.收集30个,然后和教官对话.这样你就可以通过测试了.");
                else if (status == 3)
                        cm.sendYesNo("当你进去以后,在你完成任务之前你不能出来.如果你死了,你的经验值会降低..一定做好准备了再进去...现在要进去吗?");
                else if (status == 4) {
                        cm.sendNext("好的!几百里面的怪物,收集30个黑珠,然后和里面的教官对话.");
                        cm.completeQuest(100003);
                        cm.startQuest(100004);
                        cm.gainItem(4031008, -1);
                }
                else if (status == 5) {
                        cm.warp(108000300, 0);
                        cm.dispose();
                } else {
                    cm.dispose();
                }
        }
}
