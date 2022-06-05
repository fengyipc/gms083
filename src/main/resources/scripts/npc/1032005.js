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
	VIP Cab - Victoria Road : Ellinia (101000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
    1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var cost = 10000;

function start() {
    cm.sendNext("支付10000金币,我可以把你送到#b蚂蚁广场#k.");
}

function action(mode, type, selection) {
    status++;
    if (mode == -1){
        cm.dispose();
        return;
    } else if (mode == 0) {
        cm.sendOk("想去的时候找我.");
    	cm.dispose();
    	return;
    }
    if (status == 1) {
        cm.sendYesNo(cm.getJobId() == 0 ? "还是新手?那只用支付1000金币就好了" : "确定要花10000金币去蚂蚁广场吗?");
        cost /= ((cm.getJobId() == 0) ? 10 : 1);
    } else if (status == 2) {
        if (cm.getMeso() < cost)
            cm.sendNext("你没有足够的金币.")
        else {
            cm.gainMeso(-cost);
            cm.warp(105070001);
        }
        cm.dispose();
    }
}