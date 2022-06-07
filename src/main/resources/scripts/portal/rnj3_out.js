function enter(pi) {
    if (pi.getEventInstance().getIntProperty("complete") == 1) {
        pi.playPortalSound(); pi.warp(926100203, 0); //next
        return true;
    } else {
        pi.playerMessage(5, "门还没开");
        return false;
    }
}