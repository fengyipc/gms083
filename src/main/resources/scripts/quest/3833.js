importPackage(Packages.tools);

var status = -1;

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        qm.dispose();
    } else {
        if (status == 0) {
            qm.sendOk("太好了！你设法得到了我需要的药草。为了#b表示感谢#k,带着这个东西去旅行吧。");
        } else if (status == 1) {
		if(qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() >= 2) {
			if(qm.haveItem(4000294, 1000)) {
				qm.gainItem(4000294, -1000);
				qm.gainItem(2040501, 1);
				qm.gainItem(2000005, 50);
				qm.gainExp(54000);
				qm.forceCompleteQuest();
			}
		
			else if(qm.haveItem(4000294, 600)) {
				qm.gainItem(4000294, -600);
				qm.gainItem(2020013, 50);
				qm.gainExp(54000);
				qm.forceCompleteQuest();
			}

			else if(qm.haveItem(4000294, 500)) {
				qm.gainItem(4000294, -500);
				qm.gainExp(54000);
				qm.forceCompleteQuest();
			}

			else if(qm.haveItem(4000294, 100)) {
				qm.gainItem(4000294, -100);
				qm.gainExp(45000);
				qm.forceCompleteQuest();
			}

			else if(qm.haveItem(4000294, 50)) {
				qm.gainItem(4000294, -50);
				qm.gainItem(2020007, 50);
				qm.gainExp(10000);
				qm.forceCompleteQuest();
			}

			else if(qm.haveItem(4000294, 1)) {
				qm.gainItem(4000294, -1);
				qm.gainItem(2000000, 1);
				qm.gainExp(10);
				qm.forceCompleteQuest();
			}

                        qm.dispose();
		}
		else {
			qm.sendOk("需要提供#b2个#k消耗栏空间来按接收奖励。");
		}
	} else if (status == 2) {
            qm.dispose();
        }
    }
}