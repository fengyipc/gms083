function enter(pi) {
    pi.removeAll(4001162);
    pi.removeAll(4001163);
    pi.removeAll(4001164);
    pi.removeAll(4001169);
    pi.removeAll(2270004);

    var spring = pi.getMap().getReactorById(3008000);  // thanks Chloek3, seth1 for noticing fragments not being awarded properly
    if (spring != null && spring.getState() > 0) {
        if (!pi.canHold(4001198, 1)) {
            pi.playerMessage(5, "检查下其他栏是不是满了.");
            return false;
        }
        if (pi.getPlayer().getBossLog(0, "毒雾森林完成") == 0) {
            pi.getPlayer().dropMessage("今日已完成毒雾森林组队副本,获得1点组队挑战积分");
            pi.getPlayer().setBossLog(0, "毒雾森林完成");
            pi.getPlayer().setBossLog(-1, "组队挑战积分", 2);
        }
        pi.gainItem(4001198, 1);
    }
    pi.playPortalSound(); pi.warp(300030100, 0);
    return true;
}