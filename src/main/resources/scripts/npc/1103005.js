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
 * @NPC: Cygnus
 * @ID: 1103005
 * @Map Id: 913040006
 * @Function: Cygnus Creator
 * @Author Jay <text>
 * @Author David
 */

 function start() {
    cm.sendAcceptDecline("成为骑士团的一员需要智慧,信仰,力量和毅力... 看来这些品质你都有. 考虑一下要成为魂骑士吗?我可以带你去圣地");
}
 	
function action(coded, by, Moogra) {
    if (coded > 0)
        cm.warp(130000000);
    else {
        try {
            cm.warp(cm.getPlayer().getSavedLocation("CYGNUSINTRO"));
        } catch(err) {
            cm.warp(100000000);
        }
    }
    cm.dispose();
}
