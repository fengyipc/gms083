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

/* Magician Job Instructor
	Magician 2nd Job Advancement
	Victoria Road : The Forest North of Ellinia (101020000)
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
                        if (cm.isQuestCompleted(100007)) {
                            cm.sendOk("你真是个英雄！");
                            cm.dispose();
                        } else if(cm.isQuestCompleted(100006)) {
                            cm.sendNext("好吧，我让你进去！打败里面的怪物，收集30个黑珠，然后和里面的人谈谈。他会给你英雄的证明");
                            status = 4;
                        } else if (cm.isQuestStarted(100006)) {
                            cm.sendNext("嗯...肯定是那封信。#k...所以你千里迢迢来这里参加考试，参加魔法师第二次转职测试。好吧，我来给你解释一下。别操心太多，没那么复杂。");
                        } else {
                            cm.sendOk("一旦你准备好了，我可以带你去。");
                            cm.dispose();
                        }
                }
                else if(status == 1)
                        cm.sendNextPrev("我会送你去看隐藏的地图。你会看到平时看不到的怪物。他们看起来和普通怪物一样,但是打败他们不会让你获得任何经验或者道具");
                else if (status == 2)
                        cm.sendNextPrev("他们会掉落#b#z4031013##k,你需要收集30个");
                else if (status == 3)
                        cm.sendYesNo("你进去以后必须完成任务,否则只有死亡才可以离开,确定要进去了吗?");
                else if (status == 4) {
                        cm.sendNext("好吧，我让你进去！打败里面的怪物，收集30个黑珠,拿到#b英雄的证明#k, 祝你好运。");
                        cm.completeQuest(100006);            
                        cm.startQuest(100007);
                        cm.gainItem(4031009, -1);
                }
                else if (status == 5) {
                        cm.warp(108000200, 0);
                        cm.dispose();
                }
                else cm.dispose();
        }
}
