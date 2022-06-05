var status;

function start(){
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection){
	if(mode == -1 || (mode == 0 && status == 0)){
		cm.dispose();
		return;
	}
	else if(mode == 0)
		status--;
	else
		status++;



	if(status == 0){
		cm.sendGetText("请输入... #b暗号#k!");
	}
	else if(status == 1){
                if(cm.getWarpMap(925040100).countPlayers() > 0) {
                        cm.sendOk("有人已经在#m925040100#了.");
                        cm.dispose();
                        return;
                }
		if(cm.getText() == "事实胜于雄辩"){
			if(cm.isQuestStarted(21747) && cm.getQuestProgressInt(21747, 9300351) == 0)
				cm.warp(925040100, 0);
                        else
                                cm.playerMessage(5, "尽管你说对了暗号,我还是不会让你进去.");

			cm.dispose();
		}
		else{
			cm.sendOk("#r错了!");
		}
	}
	else if(status == 2){
		cm.dispose();
	}
}