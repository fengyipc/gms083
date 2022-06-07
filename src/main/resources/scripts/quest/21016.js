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
        qm.sendAcceptDecline("我们要继续你的基础训练吗？在开始之前，请确保您已经正确装备了您的剑，并且您的技能和药水可以在热键中轻松访问。");
    } else if (status == 1) {
		if (mode == 0) {
			qm.sendNext("你还没准备好狩猎#o0100132#吗？当您完全准备好时，请再来找我。 没有什么比在没有充分准备的情况下进行战斗更糟糕的了。");
			qm.dispose();
		} else {
			qm.forceStartQuest();
			qm.sendNext("好的，这一次，让我们打败#r#o0100132##k，它比#o0100131#们稍微强大一些。 前往#b#m140020100##k并击败其中的#r15#k只。这应该可以帮助你提升自己的力量。好！我们出发吧！", 1);
		}
	} else if (status == 2) {
		qm.showInfo("Effect/OnUserEff.img/guideEffect/aranTutorial/tutorialArrow3");
		qm.dispose();
    }
}