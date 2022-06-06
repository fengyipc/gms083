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
        
        if(status == 0) {
            qm.sendNext("很忙吗，英雄大人？前不久我使尽各种手段在金银岛上四处探查，终于找到了一个有意思的情报。是关于人偶师的......");
         } else if(status == 1) {
            qm.sendNext("你知道吗？自从英雄你教训了人偶师之后，曾位于森林尽头的入口就被封闭了！人偶师那个家伙好像是把居所安置在了别的地方。");
         } else if(status == 2) {
            qm.sendNext("我得到信息说人偶师的藏身处就在黑森林打猎场Ⅱ的小木屋里，这个信息应该比较可靠。");
         } else if(status == 3) {
            qm.sendNext("那么你准备好了吗？如果你接受的话，请你到那里把人偶师消灭。");
        } else {
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}

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
        
        if(status == 0) {
            qm.sendNext("看样子，你应该已经打败人偶师了......怎么不高兴的样子？发生什么事了？");
        } else if (status == 1) {
	qm.sendNextPrev("没发现任何有关金银岛封印石的情报。", 2);
        } else if(status == 2) {
            qm.sendNext("啊哈！原来事为这事。呵呵呵......完全不用担心。");
        } else if(status == 3) {
            qm.sendNext("为了你在这一系列任务中表现出的勇敢，我现在将适当地奖励你。看，这个#r连环吸血#k技能：将部分伤害变成HP的增益技能。恢复角色最大HP。");
        } else if(status == 4) {
            qm.forceCompleteQuest();
            
            qm.gainExp(12500);
            qm.teachSkill(21100005, 0, 20, -1); // combo drain
            
            qm.dispose();
        }
    }
}