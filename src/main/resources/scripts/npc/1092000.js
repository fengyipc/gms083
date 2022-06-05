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
 * @Name         Tangyoon
 * @Author       xXOsirisXx (BubblesDev)
 */

var status;

function start() {
	status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection){
	if (mode == -1 || !cm.isQuestStarted(2180)){
		cm.dispose();
		return;
	}
	else{
		if (mode == 1) status++;
		else status --;

		if (status == 0){
			cm.sendNext("好了,我会把你送到我的奶牛牛圈. 小心小牛喝掉了所有的牛奶,不然你的努力就白瞎了.");
		}
		else if (status == 1){
			cm.sendNextPrev("一眼就能分辨出小牛和母牛是不容易的。这些小牛犊可能只有一两个月大，但它们已经长到和妈妈一样大了。他们看起来没什么区别...我有时都会弄错!祝你好运!");
		}
		else if (status == 2){
			if (cm.canHold(4031847)){
				cm.gainItem(4031847, 1);
				cm.warp(912000100, 0);
			}
			else{
				cm.sendOk("你的其他栏满了");
			}
			cm.dispose();
		}
	}
}