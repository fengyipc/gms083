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
/* Author: Xterminator
	NPC Name: 		Peter
	Map(s): 		Maple Road: Entrance - Mushroom Town Training Camp (3)
	Description: 	Takes you out of Entrace of Mushroom Town Training Camp
*/
var status = 0;

function start() {
    cm.sendNext("你完成了所有的训练.干得漂亮.你看样子已经准备好开始旅程了!很好,我会送你去下一站.");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) 
            cm.sendNextPrev("但是记住,一旦你出去了,你会进入一个满是怪物的村庄!");
        else if (status == 2) {
            cm.warp(40000, 0);
            cm.gainExp(3);
            cm.dispose();
        }
    }
}