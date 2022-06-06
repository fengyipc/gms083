/*
	QUEST: The Identity of the Princess
	NPC: Violetta
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
		qm.forceStartQuest();
		qm.sendNext("非常感谢你, #b#h ##k.你是拯救蘑菇王国的英雄。我很感激你所做的一切。我不知道该怎么感谢你。请理解为什么我不能让你看到我的脸。");
	}
	else if(status == 1){
		qm.sendNextPrev("这么说很丢人，但从我还是个孩子的时候起，我的家人就把我的脸蒙住了。他们害怕男人绝望地爱上我。我已经习惯了，甚至对女人都避而远之。我知道，背对着英雄是不礼貌的，但我需要一些时间鼓起勇气才能面对面地向你打招呼。");
	}
	else if(status == 2){
		qm.sendNextPrev("我懂了。。。\r\n#b(哇，她有多漂亮？)", 2);
	}
	else if(status == 3){
		qm.sendNextPrev("#b(什么--)", 2);
	}
	else if(status == 4){
		qm.sendNextPrev("#b(在蘑菇的世界里，这是被认为很美的东西吗？)", 2);
	}
	else if(status == 5){
		qm.sendNextPrev("我太害羞了，脸红了。不管怎样，谢谢你，#b#h ##k.");
	}
	else if(status == 6){
		qm.forceStartQuest();
		qm.gainExp(1000);
		qm.forceCompleteQuest();
		qm.dispose();
	}
}

function end(mode, type, selection){}