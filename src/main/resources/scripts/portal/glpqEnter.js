function enter(pi) {
    if (pi.haveItem(3992041, 1)) {
	pi.playPortalSound(); pi.warp(610030020, "out00");
        return true;
    } else {
	pi.playerMessage(5, "巨大的铁门无论如何都不会动，但有一个看得见的钥匙形插座。");
        return false;
    }
}