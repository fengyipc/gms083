/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Hotel Receptionist - Sleepywood Hotel(105040400)
-- By ---------------------------------------------------------------------------------------------
	Unknown
-- Version Info -----------------------------------------------------------------------------------
        1.3 - More Cleanup by Moogra - 12/17/09
        1.2 - Cleanup and Statement fix by Moogra
	1.1 - Statement fix [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var regcost = 499;
var vipcost = 999;
var iwantreg = 0;

function start() {
    cm.sendNext("欢迎你，这里是林中之城桑拿房。如果您因打猎而疲惫不堪，在我们这里休息一下怎么样?");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 1))
        cm.dispose();
    else {
        if (mode == 0 && status == 2) {
            cm.sendNext("我们也提供其他种类的服务，所以请仔细考虑后再做决定。");
            cm.dispose();
            return;
        }
        status++;
        if (status == 1) {
            cm.sendSimple("我们提供两种房间的服务。请选择一个你喜欢的.\r\n#b#L0#普通桑拿(" + regcost + "金币)#l\r\n#L1#VIP桑拿 (" + vipcost + "金币)#l");
            iwantreg = 1;
        } else if (status == 2) {
            if (selection == 0)
                cm.sendYesNo("你选择了常规的桑拿。你的HP和MP会很快恢复，你甚至可以在那里购买一些物品。你确定要进去吗?");
            else if (selection == 1) {
                cm.sendYesNo("你选择了VIP桑拿。你的HP和MP会比普通桑拿恢复得更快，你甚至可以在那里找到一个特殊的物品。你确定要进去吗?");
		iwantreg = 0;
            }
        } else if (status == 3) {
            if (iwantreg == 1) {
                if (cm.getMeso() >= regcost) {
                    cm.warp(105040401);
                    cm.gainMeso(-regcost);
                } else
                    cm.sendNext("我很抱歉。看起来你没有足够的金币。你需要支付" + regcost + "金币.");
            } else {
                if (cm.getMeso() >= vipcost) {
                    cm.warp(105040402);
                    cm.gainMeso(-vipcost);
                } else
                    cm.sendNext("我很抱歉。看起来你没有足够的金币。你需要支付" + vipcost + "金币.");
            }
            cm.dispose();
        }
    }
}