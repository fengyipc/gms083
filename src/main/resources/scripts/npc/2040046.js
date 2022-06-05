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
	Robert Holly - Ludibrium: Ludibrium (220000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

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
		cm.sendNext("我明白了... 你没有那么多朋友. 只是开玩笑!无论何时你改变主意了,回来我们聊聊.如果你朋友很多,你就明白了... 呵呵 ...");
		cm.dispose();
		return;
	} else if (status >= 1 && mode == 0) {
		cm.sendNext("我明白了…我认为你并没有我想象的那么多朋友。如果没有，你现在没有240,000金币 ?不管怎样，如果你改变主意了，回来我们再谈正事。当然，那是在你有足够的金币后。嘿嘿……");
		cm.dispose();
		return;
	}	
	if (mode == 1)
		status++;
	else
		status--;
	if (status == 0) {
		cm.sendYesNo("我希望我能挣到和昨天一样多的钱。嗯,你好!你不想扩大你的好友名单吗?你看起来像一个有很多朋友的人……你觉得怎么样?有了钱，我可以为你实现它。但是请记住，它一次只适用于一个字符，所以它不会影响您帐户上的任何其他字符。您想要扩展您的好友列表吗?");
	} else if (status == 1) {
		cm.sendYesNo("好吧！这并不是说贵实际。#b花费240,000金币，我会添加5个好友名单到你的好友列表#k中。我不会单独出售它。一旦你购买它，这将永远在你的好友列表上。如果你是需要更多的好友位，那么你还不如去做。你怎么看？你会花240，000金币吗？");
	} else if (status == 2) {
		var capacity = cm.getPlayer().getBuddylist().getCapacity();
		if (capacity >= 50 || cm.getMeso() < 240000){
			cm.sendNext("嘿 你确定你有#b240,000金币#k? 或者是不是你的好友列表已经满了..");
            cm.dispose();
		} else {
			var newcapacity = capacity + 5;
			cm.gainMeso(-240000);
			cm.getPlayer().setBuddyCapacity(newcapacity)		
			cm.sendOk("好吧!我已经给你的好友名单添加了5个位置。请检查一下。如果你的好友名单上还需要更多空间，你知道该找谁。当然，这不是免费的……好吧，下次再见……");
			cm.dispose();
			}
		}
	}
}