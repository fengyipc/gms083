var map = 677000000;
var quest = 28198;
var questItem = 4032495;
var status = -1;

function start(mode, type, selection) {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if (cm.isQuestStarted(quest)) {
            // if (cm.haveItem(questItem)) {
            cm.sendYesNo("要进入#b#m" + map + "##k吗?");
            /*} else {
                cm.sendOk("入口被封锁了,只有某种勋章才可以进去。");
                cm.dispose();
            }*/
        } else {
            cm.sendOk("入口被一股神秘力量封锁了.");
            cm.dispose();
        }
    } else {
        cm.warp(map, 0);
        cm.dispose();
    }
}