
var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            if(qm.isQuestCompleted(3523) || qm.isQuestCompleted(3524) || qm.isQuestCompleted(3525) || qm.isQuestCompleted(3526) || qm.isQuestCompleted(3527) || qm.isQuestCompleted(3529) || qm.isQuestCompleted(3539)) {
                qm.completeQuest();
                qm.sendOk("你现在想起了你所有的回忆。。你现在可以去#m270020000#了。");
            } else {
                qm.sendOk("你还没有和你的第一任教官说起过你的记忆吗？");
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}