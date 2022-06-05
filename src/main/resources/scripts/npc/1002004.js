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
	VIP Cab - Victoria Road : Lith Harbor (104000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var cost = 10000;

function start() {
    cm.sendNext("你好！这辆计程车只供贵宾使用。我们提供更优质的服务，而不是像普通出租车那样带你去不同的城镇。有点贵，但是。。。只要10000金币，我们会把你安全带到\r\n#b蚂蚁广场#k.");
}

function action(mode, type, selection) {
    status++;
    if (mode == -1){
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("如果你之后需要去蚂蚁广场，那么再找我们。");
    	cm.dispose();
    	return;
    }
    if (status == 1) {
        cm.sendYesNo(cm.getJobId() == 0 ? "我们对新手有九折优惠。蚂蚁广场位于金银岛中心的深处，那里有24小时商店。你想花#b1000金币#k去那里吗？" : "普通费用适用于所有非新手。 蚂蚁广场位于金银岛中心的深处，那里有24小时商店。你想花#b10000金币#k去那里吗？");
        cost /= ((cm.getJobId() == 0) ? 10 : 1);
    } else if (status == 2) {
        if (cm.getMeso() < cost)
            cm.sendNext("看起来你没有足够的金币。对不起，我不能为你服务。")
        else {
            cm.gainMeso(-cost);
            cm.warp(105070001);
        }
        cm.dispose();
    }
}
