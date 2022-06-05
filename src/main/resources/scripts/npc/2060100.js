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
//carta
function start(){
    if(cm.isQuestStarted(6301)) {
        if (cm.haveItem(4000175)) {
            cm.gainItem(4000175, -1);
            cm.warp(923000000, 0);
        } else {
            cm.sendOk("为了打开维度的裂缝，你必须放置一块皮亚奴斯的模型。你可以打败皮亚奴斯获得.");
        }
    } else {
        cm.sendOk("我是#b#p2060100#k,你不要忽悠我,因为我有把人变成虫子的习惯.");
    }
    
    cm.dispose();
}