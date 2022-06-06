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
		qm.sendNext("吱!吱!吱!");
	} else if (status == 1) {
		qm.sendNextPrev("好吧，那正好，但是。。。我还是不明白发生了什么。船在哪里？嘿，你知道我怎么了吗？", 2);
	} else if (status == 2) {
		qm.sendAcceptDecline("吱! (猴子点了点头。他真的知道怎么回事吗？不由自主地问。)");
	} else if (status == 3) {
		if (mode == 0) {//decline
			qm.sendNext("吱!吱! (猴子看起来很不满意。)");
		} else {
			qm.forceStartQuest();
                        qm.dispose();
		}
	} else if (status == 4) {
                qm.dispose();
        }
}
	