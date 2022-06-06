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
/* Author: PurpleMadness
 * The sorcerer who sells emotions
*/

importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
        if(qm.getPlayer().getMeso() >= 1000000) {
            if(qm.canHold(2022337, 1)) {
                qm.gainItem(2022337, 1);
                qm.gainMeso(-1000000);
                
                //qm.sendOk("Nice doing business with you~~.");
                qm.startQuest(3514);
            } else {
                qm.sendOk("请确认你的消耗栏是否有足够的空间。");
            }
        } else {
            qm.sendOk("购买#b魔法制炼术士的药水#k需要花费#b1000,0000#k金币，请确认你有足够的金币。");
        }
        
        qm.dispose();
}

function usedPotion(ch) {
        return ch.getBuffSource(MapleBuffStat.HPREC) == 2022337;
}

function end(mode, type, selection) {
        if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		qm.dispose();
		return;
	} else {
		status++;
	}
    
        if(status == 0) {
                if(!usedPotion(qm.getPlayer())) {
                        if(qm.haveItem(2022337)) {
                                qm.sendOk("你害怕喝药水吗？我可以向你保证只有未成年人才有#r副作用#k。");
                        } else {
                                if(qm.canHold(2022337)) {
                                        qm.gainItem(2022337, 1);
                                        qm.sendOk("丢了吗？幸运的是，我设法找回了它。拿着吧。");
                                } else {
                                        qm.sendOk("丢了？幸运的是，我设法找回了它。请在背包中留出一个空位来接收。");
                                }
                        }
                        
                        qm.dispose();
                        return;
                } else {
                        qm.sendOk("看来药水起作用了，你的情绪不再僵化。还有，哦，不对。。。发生副作用了，快把它弄出来。");
                }
        } else if(status == 1) {
                qm.gainExp(891500);
                qm.completeQuest(3514);
                qm.dispose();
        }
}