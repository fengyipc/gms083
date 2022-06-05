function start() {
    var status = cm.getQuestStatus(20706);
    
    if (status == 0) {
        cm.sendNext("这里开起来没什么不对劲的.");
    } else if (status == 1) {
        cm.forceCompleteQuest(20706);
        cm.sendNext("你发现了点什么!最好向#p1103001#报告.");
    } else if (status == 2) {
        cm.sendNext("你发现了点什么!最好向#p1103001#报告.");
    }
    cm.dispose();
}