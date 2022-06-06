importPackage(Packages.tools);

var status = -1;

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        qm.dispose();
    }
    else {
        if (status == 0) {
            qm.sendNext("作为感谢，请收下这些#b活力神药#k。");
        }
	else if (status == 1) {
		if(qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() >= 1) {
			qm.gainItem(4000099, -1);
			qm.gainItem(2000011, 50);
			qm.gainExp(8000);
			qm.forceCompleteQuest();
                        qm.dispose();
		}
		else {
			qm.sendNext("嗯？看来你的消耗栏已经满了。");
		}
	} else if (status == 2) {
                qm.dispose();
        }
    }    
}