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

importPackage(Packages.client);

var status = -1;

function isPillUsed(ch) {
        return ch.getBuffSource(MapleBuffStat.HPREC) == 2022198;
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
            if(isPillUsed(qm.getPlayer())) {
                if(qm.canHoldAll([2050004, 2022224], [10, 20])) {
                    qm.sendNext("你做了我的实验。嗯，所以这就是结果，呵呵。。。好吧，把那当作补偿好吗？哦，你可以马上#r吐出来#k(#b右击屏幕右上角的药丸图标#k),别担心.");
                
                    qm.gainExp(12500);
                    qm.gainItem(2050004, 10);

                    var i = Math.floor(Math.random() * 5);
                    qm.gainItem(2022224 + i, 10);

                    qm.forceCompleteQuest();
                } else {
                    qm.sendNext("嗯，你的背包已经满了。先清理一些空间。");
                }
            } else {
                qm.sendNext("你看起来很正常，不是吗？我看不出我的实验对你有什么影响。去吃我让你吃的药，给我看看效果，好吗？");
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}