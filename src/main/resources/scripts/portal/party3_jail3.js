function enter(pi) {
    if(pi.getEventInstance().getIntProperty("statusStg8") == 1) {
        pi.playPortalSound(); pi.warp(920010930,0);
        return true;
    }
    else {
        pi.playerMessage(5, "由于精灵的力量仍在塔内活跃，所以目前无法进入储藏室。");
        return false;
    }
}