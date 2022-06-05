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
	if (mode == -1) {
        cm.dispose();
    		} else {
        if (mode == 1)
            status++;
        else
            status--;
	if(cm.getPlayer().getMapId() == 140090000) {
		if (!cm.containsAreaInfo(21019, "helper=clear")) {
		if (status == 0) {
		cm.sendNext("你终于醒了...!", 8);
		} else if (status == 1) {
			cm.sendNextPrev("你是谁...?", 2);
		} else if (status == 2) {
			cm.sendNextPrev("曾经对抗黑魔法师的英雄...我一直在等待你的苏醒!", 8);
		} else if (status == 3) {
			cm.sendNextPrev("你是谁...你在说些什么?", 2);
		} else if (status == 4) {
			cm.sendNextPrev("我又是谁...?我什么也想不起来了... 头好疼!", 2);
		} else if (status == 5) {
			cm.showIntro("Effect/Direction1.img/aranTutorial/face");
			cm.showIntro("Effect/Direction1.img/aranTutorial/ClickLilin");
			cm.updateAreaInfo(21019, "helper=clear");
			cm.dispose();
		}
		} else {
		if (status == 0) {
			cm.sendNextPrev("你还好吗?", 8);
		} else if (status == 1) {
			cm.sendNextPrev("我什么都不记得了. 我在哪? 你又是谁...?", 2);
		} else if (status == 2) {
			cm.sendNextPrev("冷静.别慌.黑魔法师清理了你的记忆.我会告诉你你需要知道的所有事情...我们慢慢说.", 8);
		} else if (status == 3) {
			cm.sendNextPrev("几百年前,你打败了黑魔法师拯救了冒险岛世界.但不幸的是,黑魔法师在最后施展了黑魔法让你陷入了长久的休眠.在这个期间你的记忆也随之流失.", 8);
		} else if (status == 4) {
			cm.sendNextPrev("现在在叫做里恩的岛上,黑魔法师就是在这里封印了你.我们在这座岛深处的一个洞穴里面发现了你.", 8);
		} else if (status == 5) {
			cm.sendNextPrev("我是莉琳,里恩的原住民.我们根据古老的传说在这座岛上一直等待英雄的归来.终于找到你了!", 8);
		} else if (status == 6) {
			cm.sendNextPrev("我说了太多.你没听懂也没有关系.你会慢慢了解所有的事情. #b我们先去村子里吧#k.我会跟你一起过去,路上有什么问题你可以问我.", 8);
		} else if (status == 7) {
			cm.spawnGuide();
			cm.warp(140090100, 0);
			cm.dispose();
		}	
	        }	
	} else {
		if (status == 0)
			cm.sendSimple("你还有什么疑问吗.我会一一给你解答. #b#l\r\n#L0#我是谁? #l #l\r\n#L1#我在哪? #l #l\r\n#L2#你是谁?#l#l\r\n#L3#我该做些什么.#l #l\r\n#L4#我怎么使用背包.#l #l\r\n#L5#我该怎么使用技能?#l #l\r\n#L6#我该怎么穿装备.#l #l\r\n#L7#我应该怎么使用快捷键? #l #l\r\n#L8#我怎么才能打开宝箱?#l #l\r\n#L9#我忘了怎么坐椅子上.#l#k");
		else if (status == 1) {
				if (selection == 0) {
					cm.sendNext("你是几百年前从黑魔法师手中解救冒险岛世界的英雄之一.因为黑魔法师的诅咒,你失去了你的记忆");
					cm.dispose();
				} else if (selection == 1) {
					cm.sendNext("这是一座叫做里恩的小岛,冰雪覆盖了这里.");
					cm.dispose();
				} else if(selection == 2) {
					cm.sendNext("我是莉琳,里恩家族的一员.我们一直在这座岛上等待英雄的归来.现在我来做你的向导");
					cm.dispose();
				} else if(selection == 3) {
					cm.sendNext("不浪费时间了,我们快进村子里再一一道来吧.");
					cm.dispose();
				} else if(selection == 4) {
					cm.showInfo("UI/tutorial.img/14");
					cm.dispose();
				} else if(selection == 5) {
					cm.showInfo("UI/tutorial.img/15");
					cm.dispose();
				} else if(selection == 6) {
					cm.showInfo("UI/tutorial.img/16");
					cm.dispose();
				} else if(selection == 7) {
					cm.showInfo("UI/tutorial.img/17");
					cm.dispose();
				} else if(selection == 8) {
					cm.showInfo("UI/tutorial.img/18");
					cm.dispose();
				} else if(selection == 9) {
					cm.showInfo("UI/tutorial.img/19");
					cm.dispose();
				}									
		}
	}
}
}