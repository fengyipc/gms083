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
	Konpei - Near the Hideout (Beautiful Sky)(801040101)
-- By ---------------------------------------------------------------------------------------------
	Ronan
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Ronan
---------------------------------------------------------------------------------------------------
**/

var status;

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if (status == 0) {
                        cm.sendNext("Ah, The Boss has been defeated. What a happy day this turns out to be! Congratulations, everyone. Follow this way back to town.");
                        cm.sendNext("哈哈哈，Boss被打败了！多么幸福的一天！恭喜大家，跟着这条路回镇上吧。");

                } else if (status == 1) {
                        cm.warp(801000000);
                        cm.dispose();
                }
        }
}
