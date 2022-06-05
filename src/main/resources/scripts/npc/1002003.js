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
	NPC Name: 		Mr. Goldstein
	Map(s): 		Victoria Road : Lith Harbour (104000000)
	Description:		Extends Buddy List
*/
var status = 0;
	
function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (status == 0 && mode == 0) {
		cm.sendNext("我看看。。。你想你没有我想象中的那么多朋友。哈哈哈，开玩笑的！不管怎样，如果你想改变主意，请随时回来，我们继续谈。");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("我看看。。。我想你没有我想象中那么多朋友。如果不是，你现在就没有24万金币？不管怎样，如果你改变主意，我们回来继续谈。");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("你好！你看起来像是个有很多朋友的人，你不想增加你的好友名单吗？花钱我可以帮你实现。但是，记住，它一次只适用于一个角色，因此不会影响您帐户上的其他任何角色。你想扩展你的好友列表吗？");
	} else if (status == 1) {
		cm.sendYesNo("好的！其实没那么贵。#b240000金币#k，我会在你的好友列表中再增加5个空间。一旦你买了它，它将永远在你的好友名单上。所以，如果你是那种需要更多好友名单空间的人，那么你可以这么做。你怎么认为？你想花24万金币购买吗？");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("你确定你有#b240000金币#k吗？如果是这样的话，那么检查一下你是否已经把你的好友列表扩展到了最大值。即使你付了钱，你的好友列表上最多也只有50个。");
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("好吧！你的好友列表现在增加了5个。看看吧。如果你还需要更多的空间在你的好友名单上，你知道该找谁。当然，这不是免费的，再见！");
			cm.dispose();
			}
		}
	}
}