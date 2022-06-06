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
            if(!qm.haveItem(4001094, 1)) {
                qm.sendNext("你没有#b#t4001094##k...");
                qm.dispose();
                return;
            }
            
            if (qm.haveItem(2041200, 1)) {
                qm.sendOk("(#b#t2041200##k在我的包里自从到达这个地方就变得更明亮了。。。又一次注意到，那边的小龙似乎在狠狠地瞪着它。)");
                qm.dispose();
                return;
            }
            
            qm.sendNext("你带来了#b#t4001094##k,谢谢你把我的一个孩子带到巢里来！请拿着这个。。。\r\n\r\n....... (bleuuhnuhgh) (blahrgngnhhng) ...\r\n\r\n请收下#b#t2041200##k，感谢你帮我把孩子带回来。谢谢！");
        } else if (status == 1) {
            if (!qm.canHold(2041200, 1)) {
                qm.sendOk("请确认你的消耗栏是否有足够的空间来接收奖励。");
                qm.dispose();
                return;
            }
            
            qm.forceCompleteQuest();
            qm.gainItem(4001094, -1);
            qm.gainItem(2041200, 1);    // quest not rewarding properly found thanks to MedicOP & Thora
            qm.gainExp(42000);
            qm.dispose();
        }
    }
}
