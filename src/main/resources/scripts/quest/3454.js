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
	Author : 		Ronan
	NPC Name: 	        Dr. Kim
	Map(s): 		Omega Sector
	Description: 		Quest - Wave Translator
	Quest ID: 		3454
*/

var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            if(qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.ETC).getNumFreeSlot() < 1) {
                qm.sendOk("请确认你的其他栏是否有足够的空间。");
                qm.dispose();		
                return;
            }

            qm.gainItem(4000125, -1);
            qm.gainItem(4031926, -10);
            qm.gainItem(4000119, -30);
            qm.gainItem(4000118, -30);

            rnd = Math.random();
            if(rnd < 1.0) {
                qm.gainItem(4031928, 1);
            }
            else {
                qm.gainItem(4031927, 1);
            }

            qm.sendOk("现在，去见见外星人格雷，用这个卧底通读他们的计划。如果失败了，我们需要再次收集一些材料。");
            qm.forceCompleteQuest();
        } else if (status == 1) {
            qm.dispose();
        }
    }
}
