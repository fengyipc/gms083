var status = -1;

function start(mode, type, selection) {
    qm.dispose();
}

function end(mode, type, selection) {
    if (qm.getPlayer().getMarriageId() > 0 && qm.getPlayer().getGuildId() > 0 && qm.getPlayer().getJunior1() > 0 && qm.canHold(1142081, 1)) {
        qm.sendNext("哇.给你勋章!");
        qm.forceCompleteQuest();
        qm.gainItem(1142081, 1);
    } else {
        qm.sendNext("我想你没满足我的条件.结婚,加入家族,学院再来找我.");
    }
    qm.dispose();
}
