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
		qm.sendNext("这不正是旅行的最佳天气吗？我是凯琳，这艘船的船长。你一定是个新冒险家吧？很高兴认识你。");
	} else if (status == 1) {
		qm.sendAcceptDecline("我们还没有完全准备好离开，所以请在我们等待的时候到处看一看吧。");
	} else if (status == 2) {
		if (mode == 0) {//decline
			qm.sendNext("H嘿，别紧张！有时候你需要等一会。");
		} else {
			qm.warp(3000000, 0);
			qm.forceCompleteQuest();
                        qm.sendNext("看来我们都准备好了！我认为这将是一次伟大的航行。我们开始吧。");
		}
	} else if (status == 3) {
                qm.dispose();
        }
}