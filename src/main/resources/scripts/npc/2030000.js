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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Jeff - El Nath : El Nath : Ice Valley II (211040200)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;

function start() {
    if(cm.haveItem(4031450, 1)) {
        cm.warp(921100100, 1);
        cm.dispose();
        return;
    }
    
    cm.sendNext("嘿，你看起来想去更深处。不过，在那里，你会发现自己被好斗、危险的怪物包围，所以即使你觉得自己已经准备好了，也请小心。很久以前，我们镇上有几个勇敢的人进去想消灭任何威胁镇上的人，但一直没有回来。。。");
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (status == 1 && mode == 0 && cm.getLevel() > 49) {
            cm.sendNext("即使你的等级很高，也很难去那里，但如果你改变主意，请找我。毕竟，我的工作是保护这个地方。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (cm.getLevel() > 49)
                cm.sendYesNo("如果你想进去，我建议你改变主意。但如果你真的想进去。。。我只让那些强壮到可以在里面生存的人进来。我不想看到别人死。让我们看看。。。。。。！你看起来很强壮。好吧，你想进去吗？");
             else 
                cm.sendPrev("你等级太低了,进去就是送死,回头吧");
        } else if (status == 2) {
            if (cm.getLevel() >= 50) 
                cm.warp(211040300, 5);
            cm.dispose();
        }
    }
}