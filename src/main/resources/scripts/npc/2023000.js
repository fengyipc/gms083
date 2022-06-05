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

var toMap = new Array(211040200, 220050300, 220000000, 240030000);
var inMap = new Array(211000000, 220000000, 221000000, 240000000);
var cost = new Array(10000, 25000, 25000, 65000);
var location;
var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.sendNext("谢谢你.这不便宜,但一定是物超所值的");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            for (var i = 0; i < toMap.length; i ++) {
                if (inMap[i] == cm.getPlayer().getMap().getId()) {
                    location = i;
                    break;
                }
            }
            cm.sendNext("你好! 这辆出租车将会把你送到神秘岛中心的危险区域!我们将从#m" + inMap[location] + "#前往神秘岛中心的#b#m"+toMap[location]+"##k!费用是#b"+ cost[location] +"金币#k.这不便宜,但是可以节约你很多时间与怪物战斗!");
        }
        else if (status == 1)
            cm.sendYesNo("愿意花费#b"+ cost[location] +"金币#k去#b#m"+toMap[location]+"##k吗?");
        else if (status == 2) {
            if (cm.getMeso() < cost[location]) {
                cm.sendNext("你的金币不够.");
            } else {
                cm.warp(toMap[location], location != 1 ? 0 : 1);
                cm.gainMeso(-cost[location]);
            }
            cm.dispose();
        }
    }
}
