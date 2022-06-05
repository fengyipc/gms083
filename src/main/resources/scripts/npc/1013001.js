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
	if (status == 0) {
	    cm.sendNext("注定成为驯龙高手的你……终于来了。", 1);
	} else if (status == 1) {
	    cm.sendNextPrev("去履行你作为驯龙高手的职责..", 1);
	} else if (status == 2) {
	    cm.warp(900090101, 0);
	    cm.dispose();
	}
}