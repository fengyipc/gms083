var status = 0;
var entry;
function start() {
	if(cm.getPlayer().getMapId() == 922000000) {
		entry = 0;
		cm.sendYesNo("要放弃吗?");
		status++;
	}

	else if(cm.isQuestStarted(3239)) {
		entry = 1;
		cm.sendYesNo("你要进入#m922000009##k吗?");
		status++;
	}
	else {
		cm.sendOk("#m922000009#不对外开放");
	}
}

function action(mode, type, selection) {
	if(status == 1) {
		if(entry == 0) {
			if(mode <= 0) {
				cm.sendOk("好.如果想出去了找我.");
				cm.dispose();
				return;
			}
			
			cm.warp(922000009, 0);
			if(!(cm.isQuestStarted(3239) && cm.haveItem(4031092, 10))) cm.removeAll(4031092);
			cm.dispose();
		}

		else {
			if(mode <= 0) {
				cm.dispose();
				return;
			}
                        
                        if(cm.getWarpMap(922000000).countPlayers() == 0) {
                                cm.warp(922000000, 0);
                                if(!(cm.isQuestStarted(3239) && cm.haveItem(4031092, 10))) cm.removeAll(4031092);
                        } else {
                                cm.sendOk("里面有人了.");
                        }
	
			cm.dispose();		
		}
	}
}