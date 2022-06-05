function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (status == 0 && mode == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if(status == 0){
			cm.sendSimple("等等!尽管你到了10级就会知道这些事情,但是如果你想事先知道,你可以看看这些.\r\n\r\n告诉我你想知道什么?\r\n#b#L0#你是谁#l\r\n#L1#小地图#l\r\n#L2#任务窗口#l\r\n#L3#道具栏#l\r\n#L4#常规攻击狩猎#l\r\n#L5#怎么拾取道具#l\r\n#L6#怎么穿装备#l\r\n#L7#技能窗口#l\r\n#L8#怎么使用快捷键#l\r\n#L9#怎么打破箱子#l\r\n#L10#怎么坐#l\r\n#L11#世界地图#l\r\n#L12#任务信息#l\r\n#L13#增强属性#l\r\n#L14#骑士团是什么?#l");
	    } else if(status == 1){
			if(selection == 0){
				cm.sendNext("我是#p1101008#,圣地女皇守护者米哈尔的手下.我在这里作为骑士团新手的向导.在你到达11级之前我都会在这里为你提供帮助.");
		    } else if(selection == 1){
				cm.showInfo("UI/tutorial.img/1");
				cm.dispose();
			} else if(selection == 2){
				cm.showInfo("UI/tutorial.img/2");
				cm.dispose();
			} else if(selection == 3){
				cm.showInfo("UI/tutorial.img/3");
				cm.dispose();
			} else if(selection == 4){
				cm.showInfo("UI/tutorial.img/4");
				cm.dispose();
			} else if(selection == 5){
				cm.showInfo("UI/tutorial.img/5");
				cm.dispose();
			} else if(selection == 6){
				cm.showInfo("UI/tutorial.img/6");
				cm.dispose();
			} else if(selection == 7){
				cm.showInfo("UI/tutorial.img/7");
				cm.dispose();
			} else if(selection == 8){
				cm.showInfo("UI/tutorial.img/8");
				cm.dispose();
			} else if(selection == 9){
				cm.showInfo("UI/tutorial.img/9");
				cm.dispose();
			} else if(selection == 10){
				cm.showInfo("UI/tutorial.img/10");
				cm.dispose();
			} else if(selection == 11){
				cm.showInfo("UI/tutorial.img/11");
				cm.dispose();
			} else if(selection == 12){
				cm.showInfo("UI/tutorial.img/12");
				cm.dispose();
			} else if(selection == 13){
				cm.showInfo("UI/tutorial.img/13");
				cm.dispose();				
			} else if(selection == 14){
				cm.sendOk("黑魔法师试图破坏我们和平的冒险岛世界..我们的女皇为了抵抗黑魔法师创立了骑士团.当你到达10级就可以加入骑士团了.");
				cm.dispose();
			} 
		}else if(status == 2){
				cm.sendNextPrev("你现在还不需要知道这些. 你到了10级以后我会告诉你.");
				cm.dispose();
			}
	}
}