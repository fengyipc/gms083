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
var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		cm.dispose();
		return;
	} else {
		status++;
	}
    if (mode == 1) {
        status++;
    } else {
        status--;
	}
	if (status == 0) {
		cm.sendNext("战神,你苏醒了! 感觉怎么样? 嗯?你想知道发生什么了吗?");
	} else if (status == 1) {
		cm.sendNext("我们已经准备好撤离了. 你不必担心. 我已经找到了全部的人.当我们准备完毕我们就会出发前往金银岛.");
	} else if (status == 2) {
		cm.sendNext("其他英雄?他们去和黑魔法师战斗了. 他们在为我们的撤离争取时间. 什么? 你想和他们并肩战斗? 不!你不能这样!你已经受伤了. 你得和我们一起离开!");
	} else if (status == 3) {
		//cm.setQuestProgress(21002, 1);
		cm.showIntro("Effect/Direction1.img/aranTutorial/Trio");
		cm.dispose();
	}
} 