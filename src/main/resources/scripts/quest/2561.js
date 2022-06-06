var status = -1;

function start(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		qm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
		qm.sendNext("哦，哦！哦！哦！哦！哦？！");
	} else if (status == 1) {
		qm.sendNextPrev("我记得…我在去彩虹岛的路上，想成为一名探险家。。。怎么了？发生什么事？", 2);
	} else if (status == 2) {
		qm.sendNextPrev("哦！哦！哦！哦哦！");
	} else if (status == 3) {
		qm.sendNextPrev("我在和船长谈话，欣赏风景，然后。。。蝙蝠怪！蝙蝠怪袭击了那艘船！所以。。。我落水了吗？那么，为什么我还活着？我知道#b我会游泳#k,但我能在失去知觉的时候游泳吗？也许我可以。也许我是个天生的游泳运动员！", 2);
	} else if (status == 4) {
		qm.sendNext("喔！哦！哦！(嗯，一只小猴子……愤怒地拍打着它的脚。事实上，当我第一次醒来的时候，我看到的只有那只猴子。。。)");
	} else if (status == 5) {
		qm.sendNextPrev("呵呵？你为什么那样挥舞手臂？你想告诉我什么吗？(猴子从旁边的箱子里拿出一个苹果。看起来很好吃。但是，他想告诉你什么？)\r\n\r\n#i2010000#", 2);
	} else if (status == 6) {
		qm.sendAcceptDecline("你看！哦，不，不！(猴子看起来很沮丧，因为你不了解他。他假装吃苹果。等等，他要你吃吗？一定是这样！多好的猴子啊。)");
	} else if (status == 7) {
		if (mode == 0) {//decline
			qm.sendNext("问题是，我不喜欢苹果。。。对不起，但不，谢谢。", 2);
			qm.dispose();
		} else {
			if (!qm.isQuestStarted(2561)) {//seems that hp is not changed o.o
				qm.gainItem(2010000, true);
				qm.forceStartQuest();
			}
			qm.sendNext("(你收到了一个好看的苹果。你应该吃了它。现在…你怎么打开你的库存？是那个钥匙吗。。。？)", 2);
		}
	} else if (status == 8) {
		qm.showInfo("UI/tutorial.img/28");
		qm.dispose();
	}
}
	