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
Leave the Cave of Life - Entrance Map and go back to the Peak of the Big Nest (240040600) should probably cancel the HT morph buff
*/
importPackage(Packages.client);
function enter(pi) {
    pi.playPortalSound();
    var map, portal;
    var msg;
    if (!(isTransformed(pi.getPlayer()) || pi.haveItem(4001086))) {
        map = 240040600;
        portal = 4;
        msg = "你需要变身或携带敢死队名誉队员的象征才可以进入";
    } else if (pi.getPlayer().getLevel() > 99) {
        map = 240050000;
        portal = 0;
        msg = "小心,现在已经踏入了生命之穴";
    } else {
        map = 240040600;
        portal = 4;
        msg = "挑战暗黑龙王需要100级以上";
    }
    pi.warp(map, portal);
    pi.getPlayer().dropMessage(msg);
    return true;
}
function isTransformed(ch) {
    return ch.getBuffSource(MapleBuffStat.MORPH) == 2210003;
}
