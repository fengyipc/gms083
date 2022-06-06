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
		qm.sendAcceptDecline("你回来了！我把点火装置都接上了，这样我们就能回到文明社会了。这里没什么可做的了，对吧？我们开始吧！");
	} else if (status == 1) {
		if (mode == 0) {//decline
			
		} else {
			qm.forceStartQuest();
			qm.warp(912060200, 0);
		}
		qm.dispose();
	}
}

function end(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode == -1) {
		qm.dispose();
		return;
	} else {
		status++;
	}
	if (status == 0) {
		qm.sendNext("");
	}	
}
	