function enter(pi) {
    if (pi.getPlayer().getJob().getJobNiche() == 1) {
	pi.playPortalSound(); pi.warp(610030510,0);
        return true;
    } else {
	pi.playerMessage(5, "只有战士才能进入这个入口。");
        return false;
    }
}