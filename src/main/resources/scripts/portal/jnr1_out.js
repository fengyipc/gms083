function enter(pi) {
    if (pi.getEventInstance().getIntProperty("statusStg2") == 1) {
	pi.playPortalSound(); pi.warp(926110100, 0); //next
        return true;
    } else {
	pi.playerMessage(5, "门还没开");
        return false;
    }
}