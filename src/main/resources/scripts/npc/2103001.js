var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(cm.isQuestStarted(3927)) {
        cm.sendNext("如果我有铁锤和匕首，弓和箭...");
        cm.setQuestProgress(3927, 1);
    }
    
    cm.dispose();
}