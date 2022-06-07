function enter(pi) {
    if(pi.canHold(4001193, 1)) {
        pi.gainItem(4001193, 1);
        pi.playPortalSound(); pi.warp(211050000, 4);
        return true;
    } else {
        pi.playerMessage(5, "其他栏留一个空间给雷电透明道具.");
        return false;
    }
}