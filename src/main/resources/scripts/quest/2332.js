/*
	QUEST: Where's Violetta?
	NPC: none
*/

var status = -1;

function start(mode, type, selection){
	if(qm.hasItem(4032388) && !qm.isQuestStarted(2332)){
		qm.forceStartQuest();
		qm.getPlayer().showHint("我必须找到碧欧蕾塔！！(#b任务开始#k)");
	}
	qm.dispose();
}

function end(mode, type, selection){
}