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
/*
-- Odin JavaScript --------------------------------------------------------------------------------
    Camel Cab - Magatia (GMS Like)
-- Version Info -----------------------------------------------------------------------------------
    1.3 - Actually fixed by Alan (SharpAceX)
    1.2 - Fixed and recoded by Moogra
    1.1 - Shortened by Moogra
    1.0 - First Version by Maple4U - who stepped up and coded first version of several Magatia NPCs
---------------------------------------------------------------------------------------------------
*/

var toMagatia = "你想乘坐#b骆驼中巴#k去#b马加提亚#k吗?费用是#b1500金币#k.";
var toAriant = "你想乘坐#b骆驼中巴#k去#b阿里安特#k吗??费用是#b1500金币#k.";

function start() {
    cm.sendYesNo(cm.getPlayer().getMapId() == 260020000 ? toMagatia : toAriant);
}

function action(mode, type, selection) {
    if (mode == 1) {
        if (cm.getMeso() < 1500) {
            cm.sendNext("抱歉,你没有足够的金币.我想你可能要自己走过去才行了.");
            cm.dispose();
       } else {
            cm.warp(cm.getPlayer().getMapId() == 260020000 ? 261000000 : 260000000, 0);
	    cm.gainMeso(-1500);
            cm.dispose();
	}
    } else if (mode == 0)
        cm.sendNext("嗯,在这里还有没做完的事情吗?那你有需要了再来找我吧.");
        cm.dispose();
}