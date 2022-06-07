function enter(pi) {
    if(pi.isQuestActive(21747) || pi.isQuestActive(21744) && pi.isQuestCompleted(21745)) {
        pi.playPortalSound(); pi.warp(925040000,0);
        return true;
    }
    else {
        pi.message("你没有得到进入这个区域的允许");
        return false;
    }
}