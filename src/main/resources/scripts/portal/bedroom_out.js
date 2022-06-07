function enter(pi) {
	if (pi.isQuestStarted(2570)) {
		pi.playPortalSound(); pi.warp(120000101, 0);
		return true;
	}
	pi.earnTitle("你还有一些事情要处理。我能从你的眼睛里看到。等等…不，那些是眼袋。");
	return false;
}