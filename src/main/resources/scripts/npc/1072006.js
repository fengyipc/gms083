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
        Bowman Job Instructor - Ant Tunnel For Bowman (108000100)
-- By ---------------------------------------------------------------------------------------------
        Unknown
-- Version Info -----------------------------------------------------------------------------------
        1.2 - Cleanup by Moogra
        1.1 - Statement fix [Information]
        1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var status;
var completed;

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

        if (status == 0) {
            if (cm.haveItem(4031013, 30)) {
                completed = true;
                cm.sendNext("哇.. 你已经收集了30个黑珠!!这应该不容易...难以置信!你通过了测试,给你#b#z4031012##k.拿好了去交给武术教练.");
            } else {
                completed = false;
                cm.sendSimple("你要收集#b30个 #t4031013##k给我.加油. \r\n#b#L1#我想放弃#l");
            }
        } else if (status == 1) {
            if (completed) {
                cm.removeAll(4031013);
                cm.completeQuest(100001);
                cm.startQuest(100002);
                cm.gainItem(4031012);
            }

            cm.warp(106010000, 9);
            cm.dispose();
        }
    }
}
