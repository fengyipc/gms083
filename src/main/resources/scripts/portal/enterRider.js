function enter(pi) {
    if(pi.isQuestStarted(21610) && pi.haveItem(4001193, 1) == 0) {
        var em = pi.getEventManager("Aran_2ndmount");
        if (em == null) {
            pi.message("抱歉，二级坐骑已关闭。");
            return false;
        }
        else {
            var em = pi.getEventManager("Aran_2ndmount");
            if (!em.startInstance(pi.getPlayer())) {
                pi.message("当前有人正在挑战，请稍后再来。");
                return false;
            } else {
                pi.playPortalSound();
                return true;
            }
        }
    } else {
        pi.playerMessage(5, "只有第二次战狼任务的战神可以进入这个领域。");
        return false;
    }
}