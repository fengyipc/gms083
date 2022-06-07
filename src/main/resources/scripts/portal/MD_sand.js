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
MiniDungeon - Sand
*/ 
var baseid = 260020600;
var dungeonid = 260020630;
var dungeons = 34;

function enter(pi) {
    if (pi.getMapId() == baseid) {
        if (pi.getParty() != null) {
            if (pi.isLeader()) {
                for (var i = 0; i < dungeons; i++) {
                    if(pi.startDungeonInstance(dungeonid + i)) {
                        pi.playPortalSound();
                        pi.warpParty(dungeonid + i, "out00");
                        return true;
                    }
                }
            } else {
                pi.playerMessage(5, "只有单独玩家或者队长才可以进入迷你地图");
                return false;
            }
        } else {
            for (var i = 0; i < dungeons; i++) {
                if(pi.startDungeonInstance(dungeonid + i)) {
                    pi.playPortalSound();
                    pi.warp(dungeonid + i, "out00");
                    return true;
                }
            }
        }
        pi.playerMessage(5, "所有迷你地图现在都在被使用,请稍后再试");
        return false;
    } else {
    	pi.playPortalSound();
    	pi.warp(baseid, "MD00");
    	return true;
    }
}