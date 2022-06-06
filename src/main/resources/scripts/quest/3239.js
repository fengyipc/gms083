var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            if(qm.haveItem(4031092, 10)) {
		if(qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() >= 1) {
                    qm.sendOk("做得好！你把所有的#t4031092#都收集完了. 过来，作为感谢请收下这份礼物。。。");
		} else {
                    qm.sendOk("在收到奖品之前，在你的使用消耗栏上留出一些空间.");
                    qm.dispose();
                    return;
		}
            } else {
                qm.sendOk("请带回10个#t4031092#给我.");
                qm.dispose();
                return;
            }
        } else if (status == 1) {
            qm.gainItem(4031092, -10);
            
            rnd = Math.floor(Math.random() * 4);
            if(rnd == 0) qm.gainItem(2040704, 1);
            else if(rnd == 1) qm.gainItem(2040705, 1);
            else if(rnd == 2) qm.gainItem(2040707, 1);
            else qm.gainItem(2040708, 1);

            qm.gainExp(2700);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}