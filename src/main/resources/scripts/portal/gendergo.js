function enter(pi) {
    var map = pi.getPlayer().getMap();
    if(pi.getPortal().getName() == "female00") {
        if (pi.getPlayer().getGender() == 1) {
            pi.playPortalSound(); pi.warp(map.getId(), "female01");
            return true;
        } else {
            pi.message("这个入口通向女澡堂，试试另一边的入口。");
            return false;
        }
    } else {
        if (pi.getPlayer().getGender() == 0) {
            pi.playPortalSound(); pi.warp(map.getId(), "male01");
            return true;
        } else {
            pi.message("这个入口通向男澡堂，试试另一边的入口。");
            return false;
        }
    }
}