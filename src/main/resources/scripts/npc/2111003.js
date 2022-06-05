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

/*
-- Odin JavaScript --------------------------------------------------------------------------------
	Humanoid A - Magatia (GMS Like)
-- By ---------------------------------------------------------------------------------------------
	Maple4U
-- Version Info -----------------------------------------------------------------------------------
    1.2 - With quest feature added by Ronan
    1.1 - Shortened 3x by Moogra
    1.0 - First Version by Maple4U
---------------------------------------------------------------------------------------------------
*/

function start() {
    if(cm.isQuestStarted(3335) && !cm.haveItem(4031695, 1)) {
        cm.warp(926120300, "out00");
        cm.dispose();
    } else {
        cm.sendOk("我的感觉是对的吗?还是机器出错了?");
        cm.dispose();
    }
}
