var status = -1;

function start(mode, type, selection) {
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
            qm.sendNext("那棵树... 我曾经听说过, 我甚至研究了它的行为!如果我没记错的话,#b树妖王#k当土壤被某种魔法认为是贫瘠的时候，它就会活跃起来,那些在这种条件下进化的树桩开始排出这些可疑的魔法资源，而不是水和矿物来生存, 这使得他们对附近的居民和村庄非常威胁.");
            qm.forceCompleteQuest();
        } else if (status == 1) {
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
        qm.dispose();
}