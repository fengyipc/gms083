/*
	QUEST: Jame's Whereabouts (1)
	NPC: James
*/

var status = -1;

function end(mode, type, selection){
	if(mode == -1){
		qm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;

	if(status == 0){
		qm.sendNext("我 。。。我很害怕。。。拜托。。。请帮帮我。。。");
	}
	else if(status == 1){
		qm.sendNextPrev("别害怕,是#b#p1300005##k让我来找你的.", 2);
	}
	else if(status == 2){
		qm.forceCompleteQuest();
		qm.gainExp(6000);
                qm.sendOk("什么？我哥哥派你来的？啊。。。我现在安全了。非常感谢你。。。");
	} else if (status == 3) {
                qm.dispose();
        }
}