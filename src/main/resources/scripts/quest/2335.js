/*
	QUEST: Eliminating the Rest
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
		qm.sendNext("这仅仅是开始， #b#h ##k.#b企鹅国王#k的仆从在城堡里到处都可以找到.");
	}
	else if(status == 1){
		qm.sendAcceptDecline("据我所知，附近有个地方#b摩天楼3#k在那里还可以找到一群企鹅国王的奴仆。我捡到一把前几天企鹅国王丢的钥匙。给，用这把钥匙。");
	}
	else if(status == 2){
		if(qm.canHold(4032405)){
			qm.gainItem(4032405, 1);
			qm.sendNext("最后一次，祝你好运。");
		}
		else{
			qm.sendOk("请在您的其他栏中留至少一个位置。");
			qm.dispose();
		}
	}
	else if(status == 3){
		qm.forceStartQuest();
		qm.dispose();
	}
}

function end(mode, type, selection){}