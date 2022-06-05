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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Shalon - Ticketing Usher
-- By ---------------------------------------------------------------------------------------------
	Whoever written this script
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Whoever written this script
	2.0 - Second Version by Jayd
---------------------------------------------------------------------------------------------------
**/

status = -1;
oldSelection = -1;

function start() {
    cm.sendSimple("你好,我是新加坡机场的#p9270038#.我可以帮你迅速回到废弃都市.\r\n#b#L0#我要购买前往废弃都市的机票\r\n#b#L1#让我登机.");
}

function action(mode, type, selection) {
	status++;
    if (mode <= 0){
		oldSelection = -1;
		cm.dispose();
	}
	
	if(status == 0){
		if(selection == 0){
			cm.sendYesNo("票价是5000金币,确认要购买吗?");
		}else if(selection == 1){
			cm.sendYesNo("现在要登机?请把机票给我.");
		}
		oldSelection = selection;
	}else if(status == 1){
		if(oldSelection == 0){
			if (cm.getPlayer().getMeso() > 4999 && !cm.getPlayer().haveItem(4031732)) {
                                if(cm.getPlayer().canHold(4031732, 1)) {
                                        cm.gainMeso(-5000);
                                        cm.gainItem(4031732);
                                        cm.sendOk("谢谢选择大力航空!");
                                        cm.dispose();
                                }
				else {
                                        cm.sendOk("你没有足够的金币,或者其他栏空间不足.");
                                        cm.dispose();
                                }
			} else {
				cm.sendOk("你没有足够的金币,或者你已经买过票了.");
				cm.dispose();
			}
		}else if(oldSelection == 1){
			if(cm.itemQuantity(4031732) > 0){
				var em = cm.getEventManager("AirPlane");
				if(em.getProperty("entry") == "true"){
					cm.warp(540010001);
					cm.gainItem(4031732, -1);
				}else{
					cm.sendOk("飞机已经起飞,请等待下一班.");
				}
			}else{
				cm.sendOk("你需要#b#t4031732##k才可以登机!");
			}
		}
		cm.dispose();
	}
}