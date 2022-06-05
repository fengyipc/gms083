/*
	Trash Can 3
	Kerning Subway
*/

var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1){
		cm.dispose();
		return;
	}
	else{
		if(mode == 0 && status == 0){
			cm.dispose();
			return;
		}
		else if(mode == 0)
			status--;
		else
			status++;

		if(status == 0) {
			if(cm.isQuestStarted(20710)) {
				if(!cm.hasItem(4032136)) {
					if(cm.canHold(4032136)) {
						cm.gainItem(4032136, 1);
						cm.sendNext("在垃圾桶里发现了一个#b#t4032136##k#i4032136#");
					} else {
						cm.sendOk("你的其他栏放不下#i4032136#.");
					}
				} else {
					cm.sendOk("只是个垃圾桶而已。");
				}
			} else {
				cm.sendOk("只是个垃圾桶而已。");
			}
		} else if(status == 1){
			cm.dispose();
		}
	}
}