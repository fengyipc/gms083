function enter(pi) {
    if (pi.getEventInstance().getIntProperty("statusStg2") == 1) {
	pi.playPortalSound(); pi.warp(926100100, 0); //next
        return true;
    } else {
	pi.playerMessage(5, "门还没有打开");
        return false;
    }
}