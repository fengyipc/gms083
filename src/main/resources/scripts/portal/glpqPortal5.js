function enter(pi) {
    var eim = pi.getEventInstance();
    if (eim != null) {
	if (eim.getIntProperty("glpq5") < 5){
	    pi.playerMessage(5, "传送门还没打开");
            return false;
	} else {
            pi.playPortalSound(); pi.warp(610030600, 0);
            return true;
	}
    }
    
    return false;
}