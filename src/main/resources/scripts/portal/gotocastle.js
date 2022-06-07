function enter(pi) {
    if (pi.isQuestCompleted(2324)) {
        pi.playPortalSound(); pi.warp(106020501,0);
        return true;
    } else {
        pi.playerMessage(5, "前面的路布满了蔓生的藤蔓刺，只有一个尖刺消除剂才能把它清除掉。。。");
        return false;
    }
}