function enter(pi) {
        var eim = pi.getEventInstance();
    
        if (eim.isEventCleared()) {
                if(pi.isEventLeader()) {
                        pi.playPortalSound();
                        eim.warpEventTeam(930000800);
                        return true;
                } else {
                        pi.playerMessage(5, "等待队长通过入口。");
                        return false;
                }
        } else {
                pi.playerMessage(5, "请消灭毒魔。");
                return false;
        }
}