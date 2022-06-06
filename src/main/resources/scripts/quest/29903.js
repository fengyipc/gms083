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
	Author : 		kevintjuh93
	Description: 		Quest - Master Adventurer
	Quest ID : 		29903
*/

var status = -1;

function start(mode, type, selection) {
		if (qm.forceStartQuest()) qm.showInfoText("你已经获得 <冒险大师> 头衔. 你可以去找达赖尔领取勋章.");
		qm.dispose();
}


function end(mode, type, selection) {
    status++;
    if (mode != 1) 
        qm.dispose();
    else {
        if (status == 0) 
            qm.sendNext("恭喜你获得了 #b<冒险大师>#k 头衔. 祝您在未来的战斗中一切顺利！ 继续加油吧勇士.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n #v1142110:# #t1142110# 1");
        else if (status == 1) {
                if (qm.canHold(1142110)) {
                        qm.gainItem(1142110);
                        qm.forceCompleteQuest();
                        qm.dispose();
                } else {
                        qm.sendNext("请给背包留出空位。");//NOT GMS LIKE
                }
        } else if (status == 2) {
            qm.dispose();
        }
    }
	
}