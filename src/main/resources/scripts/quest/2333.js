/*
	QUEST: Where's Violetta?
	NPC: none
*/

var status = -1;

function start(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		qm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;


	if(status == 0){
		qm.sendAcceptDecline("请帮帮我!");
	}
	else if(status == 1){
		qm.sendNext("#b蘑菇大臣#k是幕后策划的黑手！哦，不！他来了。。。");
	}
	else if (status == 2){
		qm.forceStartQuest();
		qm.dispose();
	}
}

function end(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		qm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;


	if(status == 0){
		qm.sendNext("天哪! #b#h ##k你居然打败了#b蘑菇大臣#k.");
	}
	else if(status == 1){
		qm.gainExp(15000);
		qm.forceCompleteQuest();
		qm.dispose();
	}
}