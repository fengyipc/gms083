function enter(pi) {
    if (pi.getMap().getReactorByName("rnj32_out").getState() == 1) {
	pi.playPortalSound(); pi.warp(926100200, 2);
        return true;
    } else {
	pi.playerMessage(5, "门还没有打开");
        return false;
    }
}