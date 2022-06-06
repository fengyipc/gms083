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
            qm.sendAcceptDecline("狸猫像野火一样散布谣言。。。通过勒索我和我的出租车服务，他们日复一日地从我身边带走顾客。。。嘿，别告诉任何人，如果你清理一些#r狸猫#k,我会告诉你#r蘑菇城堡#k.");
        } else if (status == 1) {
            qm.sendNext("太好了，你有#r5分钟#k杀死#b40只狸猫#k在这段时间内。祝你好运!");
        } else if (status == 2) {
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
        
        if (status == 0) {
            qm.sendNext("你做到了! 嘿..., #r狸猫#k在这附近可以听我们的谈话.我现在不想谈这个.");
        } else if (status == 1) {
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}