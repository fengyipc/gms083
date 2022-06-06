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
            if(qm.getQuestProgress(3311, 0) == 1 && qm.getQuestProgress(3311, 1) == 1) {
                qm.sendNext("嗯，所以阿尔卡多医生写了一些关于研究先锋的新赫洛德机器的东西，它可以击败现有的机器，并准备好他的排练的最后一步？我们已经三个星期没有他的消息了，一定出了什么事。。。");
                qm.gainExp(60000);
                qm.forceCompleteQuest();
            } else {
                qm.sendNext("什么都没找到？请好好检查一下德朗医生的房子，那里有些东西可能会告诉你发生了什么事。");
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}