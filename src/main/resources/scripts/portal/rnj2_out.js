function enter(pi) {
    if (pi.getEventInstance().getIntProperty("statusStg3") == 3) {
	pi.playPortalSound(); pi.warp(926100200, 0); //next
        return true;
    } else {
	pi.playerMessage(5, "门还没有打开");
        return false;
    }
}