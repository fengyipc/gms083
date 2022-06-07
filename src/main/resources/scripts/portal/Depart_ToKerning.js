function enter(pi) {
        var em = pi.getEventManager("KerningTrain");
        if (!em.startInstance(pi.getPlayer())) {
            pi.message("已经满员了。稍后再试。");
            return false;
        }
        
	pi.playPortalSound();
	return true;
}