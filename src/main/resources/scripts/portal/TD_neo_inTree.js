function enter(pi) {
    var nex = pi.getEventManager("GuardianNex");
    if(nex == null) {
        pi.message("Guardian Nex challenge遇到错误，无法使用。");
        return false;
    }
    
    var quests = [3719, 3724, 3730, 3736, 3742, 3748];
    var mobs = [7120100, 7120101, 7120102, 8120100, 8120101, 8140510];
    
    for(var i = 0; i < quests.length; i++) {
        if (pi.isQuestActive(quests[i])) {
            if(pi.getQuestProgressInt(quests[i], mobs[i]) != 0) {
                pi.message("你已经面对过Nex了。完成你的任务。");
                return false;
            }
            
            if(!nex.startInstance(i, pi.getPlayer())) {
                pi.message("有人已经在挑战Nex了。等他们说完再进去。");
                return false;
            } else {
                pi.playPortalSound();
                return true;
            }
        }
    }
    
    pi.message("一股神秘的力量不会让你进来的。");
    return false;
}