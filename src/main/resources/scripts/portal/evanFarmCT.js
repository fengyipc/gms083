function enter(pi) {
	if(pi.isQuestStarted(22010) || pi.getPlayer().getJob().getId() != 2001) {
		pi.playPortalSound(); pi.warp(100030310, 0);
	} else {
		pi.playerMessage(5, "无缘无故不能进入潘姆之家大路1。");
	}
	return true;
}