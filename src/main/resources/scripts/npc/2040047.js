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
@	Author : Raz
@       Author : Ronan
@
@	NPC = Sgt.Anderson
@	Map =  Abandoned Tower <Stage 1>
@	NPC MapId = 922010100
@	NPC Exit-MapId = 221024500
@
 */

var status;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection){
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    var mapId = cm.getPlayer().getMapId();
    if (mapId == 922010000) {
        if (status == 0) {
            cm.sendNext("要回去之前的地图,请走这条路.");
        } else {
            cm.warp(221024500);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            var outText = "当你离开, 你再次挑战的话就要重新开始了.  确定要离开了吗?";
            cm.sendYesNo(outText);
        } else if (mode == 1) {
            cm.warp(922010000); // Warp player
            cm.dispose();
        }
    }
}