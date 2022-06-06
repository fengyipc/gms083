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
            qm.sendSimple("呃，你还在说迪欧是个怪物吗？不，迪奥不是怪物，他是一个来自该地区王室的和平领袖。\r\n\r\n#L0##b你听说过一群穿过沙漠的商人被怪物袭击了吗？#k");
        } else if (status == 1) {
            qm.sendSimple("是这样吗？我想知道这些商人为什么在沙漠中如此肆无忌惮地游荡。他们侵入了仙人掌的领地！他们一开始不应该四处游荡，他们应该先得到阿里安特的许可。\r\n\r\n#L0##b这都是因为女王在维护小镇安全方面的疏忽。#k");
        } else if (status == 2) {
            qm.sendSimple("呃。。。是的，这个城市并不是真的很好，因为目前的执政，这确实是一个事实。只能等沙漠的守护者回来收拾这烂摊子。。。\r\n\r\n#L0##b当我们在女王的暴政下，沙漠守护者在做什么？#k");
        } else if (status == 3) {
            qm.sendSimple("他们已经出发远征，以消除沙漠中的一些主要威胁，肆虐阿里安特，一段时间以来。。。很奇怪，他们应该已经回来了。。。现在想想，最后一次对商人的攻击是围绕着卫士离开的方向。。。不，那不可能。。。可以吗？\r\n\r\n#L0##b也许迪欧已经变成了一个怪物。#k");
        } else if (status == 4) {
            qm.forceCompleteQuest();
            qm.gainItem(4011008, -1);
            qm.gainExp(20000);

            qm.sendNext("如果是这样的话，我们就有大麻烦了。看起来真的很像。如果皇室仙人掌迪欧疯了，那就别唱咏叹调了。你，你能做点什么来打败迪欧吗？我们现在真的需要你的帮助。");
        } else if (status == 5) {
            qm.dispose();
        }
    }
}