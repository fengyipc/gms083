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
	NPC Name: 	        Yulete
	Map(s): 		Magatia
	Description: 		Quest - Yulete's Reward
	Quest ID: 		3382
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
            if(qm.haveItem(4001159, 25) && qm.haveItem(4001160, 25) && !qm.haveItemWithId(1122010, true)) {
                if(qm.canHold(1122010)) {
                    qm.gainItem(4001159, -25);
                    qm.gainItem(4001160, -25);
                    qm.gainItem(1122010, 1);

                    qm.sendOk("谢谢你找回#b蒙特鸠珠子#k。作为谢意请收下这个吊坠。");
                } else {
                    qm.sendNext("在领取奖品之前，请确认装备栏是否有足够的空位。");
                    return;
                }
            } else if(qm.haveItem(4001159, 10) && qm.haveItem(4001160, 10)) {
                if(qm.canHold(2041212)) {
                    qm.gainItem(4001159, -10);
                    qm.gainItem(4001160, -10);
                    qm.gainItem(2041212, 1);

                    qm.sendOk("谢谢你找回#b卡帕莱特珠子#k。我会#b智慧之石#k作为奖励，它可以用来提高#b#t1122010##k的属性。");
                } else {
                    qm.sendNext("在领取奖品之前，请确认消耗栏是否有足够的空位。");
                    return;
                }
            } else {
                qm.sendNext("我至少需要#b10个#t4001159#k或者10个#t4001160##k才能给你适当的奖励。如果你搜集了#b25个蒙特鸠珠子或者卡帕莱特珠子#k,我会给你更好的奖励。");
                return;
            }

            qm.forceCompleteQuest();
        } else if (status == 1) {
            qm.dispose();
        }
    }
}
