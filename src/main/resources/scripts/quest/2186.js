/*
    Author: BubblesDev
    Quest: Abel Glasses Quest
*/

var status = -1;    // thanks IxianMace for noticing missing status declaration

function end(mode, type, selection){
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
            if(!qm.isQuestCompleted(2186)) {
                if(qm.haveItem(4031853)){
                    if(qm.canHold(2030019)) {
                        qm.gainItem(4031853, -1);
                        qm.gainExp(1700);
                        qm.gainItem(2030019, 10);

                        qm.sendOk("天啊，你找到我的眼镜了！谢谢，非常感谢。现在我又可以看到一切了！");
                        qm.forceCompleteQuest();
                    }
                    else {
                        qm.sendOk("我需要你有一个空的其他栏空间来奖励你！");
                    }
                }else if(qm.haveItem(4031854) || qm.haveItem(4031855)) {
                    qm.sendOk("嗯，那不是我的眼镜。。。不过还是谢谢你。");
                    qm.forceCompleteQuest();
                }
                else {
                    qm.sendOk("我的眼镜应该丢失在瞭望塔附近了！");
                }
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}