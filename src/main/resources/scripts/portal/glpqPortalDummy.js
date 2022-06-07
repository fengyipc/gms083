function enter(pi) {
    var react = pi.getMap().getReactorByName("mob0");
    
    if (react.getState() < 1) {
        react.forceHitReactor(1);
        
        var eim = pi.getEventInstance();
        eim.setIntProperty("glpq1", 1);
        
        pi.getEventInstance().dropMessage(5, "一股奇怪的力量开始从传送门溢出来，显示出一条曾经被封锁的隐藏路径现在已经打开。");
        pi.playPortalSound(); pi.warp(610030100, 0);
        
        pi.getEventInstance().showClearEffect();
        eim.giveEventPlayersStageReward(1);
        return true;
    }
    
    pi.getEventInstance().dropMessage(5, "由于最近一次传送，传送门出现故障。找到另一条出路。");
    return false;
}