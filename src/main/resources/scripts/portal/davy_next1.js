function enter(pi) {
    try {
        var eim = pi.getEventInstance();
        if (eim != null && eim.getProperty("stage2").equals("3")) {
            pi.playPortalSound(); pi.warp(925100200,0); //next
            return true;
        } else {
            pi.playerMessage(5, "传送门还没有打开");
            return false;
        }
    } catch(e) {
        pi.playerMessage(5, "错误: " + e);
    }
 
    return false;
}