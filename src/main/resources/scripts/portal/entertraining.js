function enter(pi) {
	if (pi.isQuestStarted(1041)) {
		pi.playPortalSound(); pi.warp(1010100, 4);
        } else if (pi.isQuestStarted(1042)) {
		pi.playPortalSound(); pi.warp(1010200, 4);
        } else if (pi.isQuestStarted(1043)) {
		pi.playPortalSound(); pi.warp(1010300, 4);
        } else if (pi.isQuestStarted(1044)) {
		pi.playPortalSound(); pi.warp(1010400, 4);
        } else {
		pi.message("只有受过麦训练的探险家才能进入。");
		return false;
	}
	return true;
}