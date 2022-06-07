function enter(pi) {
    pi.message("你找到了一条通往地下神庙的捷径。");
    pi.playPortalSound(); pi.warp(105100000, 2);
    return true;
}