/*
 * NPC : Francis (Doll master)
 * Map : 910510200
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1 || mode == 0 && type > 0) {
        cm.dispose();
        return;
    }
    
    if (mode == 1) {
    	status++;
    } else {
    	status--;
    }
    if (status == 0) {
    	cm.sendNext("我是#p1204001#,黑色之翼的人偶师.你怎敢动我的人偶... 我会让你付出代价.", 9);
    } else if (status == 1) {
    	cm.sendNextPrev("#b(黑色之翼? 哈?那是什么?这和黑魔法师又有什么关系?我觉得你该问问特鲁.)#k", 3);
    } else if (status == 2) {
        cm.completeQuest(21719);
        cm.warp(105040200, 10);//104000004 
        cm.dispose();
    }
}