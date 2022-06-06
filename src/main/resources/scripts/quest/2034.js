importPackage(Packages.client);

var item;
var status = -1;
var item;

function end(mode, type, selection) {
	if(mode == 0) {
		qm.dispose();
		return;
	}
        status++;

	if(status == 0) {
		qm.sendNext("我就知道。。。我就知道你能搞定的，快点！上一次你的工作做得很好，你又来了，照顾生意！！好吧，既然你做得这么好，我应该好好奖励你。#b#p1051000##k给你一双鞋，希望对你以后的旅行有所帮助。");
	}

	else if(status == 1) {
	    if(qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.EQUIP).getNumFreeSlot() < 1) {
		qm.sendOk("装备栏空间不足.");
		qm.dispose();
		return;
	    }

            var stance = qm.getPlayer().getJobStyle();
            if(stance == Packages.client.MapleJob.WARRIOR) item = 1072003;
            else if(stance == Packages.client.MapleJob.MAGICIAN) item = 1072077;
            else if(stance == Packages.client.MapleJob.BOWMAN || stance == Packages.client.MapleJob.CROSSBOWMAN) item = 1072081;
            else if(stance == Packages.client.MapleJob.THIEF) item = 1072035;
            else if(stance == Packages.client.MapleJob.BRAWLER || stance == Packages.client.MapleJob.GUNSLINGER) item = 1072294;
            else item = 1072018;
         
            qm.gainItem(item, 1);
            qm.gainItem(4000007, -150);
            qm.gainExp(2200);
            qm.completeQuest();
            
            qm.sendOk("好吧，如果你需要工作的话，随时回来找我。这个镇上肯定需要像你这样的人帮忙~");
        }

        else if (status == 2) {
            qm.dispose();
        }
}