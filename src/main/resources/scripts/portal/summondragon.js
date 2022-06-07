function enter(pi) {
    var player = pi.getPlayer();
    if (player.haveItem(4001094) && pi.isQuestStarted(100203)) {
        pi.spawnNpc(2081008, pi.getMap().getReactorById(2406000).getPosition(), pi.getMap());
        player.dropMessage("九灵龙的蛋，舒舒服服的发了一道神秘的光，现在已经回到巢里。");
        pi.gainItem(4001094, -1);
    }
    return false;
}