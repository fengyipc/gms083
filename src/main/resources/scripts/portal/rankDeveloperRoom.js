function enter(pi) {
    if (pi.getPlayer().getMapId() != 777777777) {
        if(!Packages.net.server.Server.getInstance().canEnterDeveloperRoom()) {
            pi.message("下一个房间目前不可用。");
            return false;
        }
        
        pi.getPlayer().saveLocation("DEVELOPER");
        pi.playPortalSound(); pi.warp(777777777, "out00");
    } else {
        try {
            var toMap = pi.getPlayer().getSavedLocation("DEVELOPER");
            pi.playPortalSound(); pi.warp(toMap, "in00");
        } catch(err) {
            pi.playPortalSound(); pi.warp(100000000, 0);
        }
    }
    
    return true;
}