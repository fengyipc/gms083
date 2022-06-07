function enter(pi) {
    if (pi.getPlayer().getJob().getJobNiche() == 5) {
	pi.playPortalSound(); pi.warp(610030550,0);
        return true;
    } else {
	pi.playerMessage(5, "只有海盗可以进入");
        return false;
    }
}