importPackage(Packages.client);

var item;
var stance;
var status = -1;
var vecItem;

function end(mode, type, selection) {
	if(mode == 0) {
		qm.dispose();
		return;
	}
        status++;

	if(status == 0) {
		qm.sendNext("这是我儿子丢失的地契!你甚至带来了建造房子所需的所有材料！非常感谢你。。。我的亲戚都可以搬进来住#m102000000#!为了表示感谢。。。");
	}

	else if(status == 1) {
	    if(qm.getPlayer().getInventory(Packages.client.inventory.MapleInventoryType.USE).getNumFreeSlot() < 1) {
		qm.getPlayer().dropMessage(1, "消耗栏满了.");
		qm.dispose();
		return;
	    }

            var talkStr = "好吧，现在选择你喜欢的卷轴。。。成功几率都是10%。 \r\n\r\n#r选择一个道具\r\n#b";
            stance = qm.getPlayer().getJobStyle();
            
            if(stance == Packages.client.MapleJob.WARRIOR || stance == Packages.client.MapleJob.BEGINNER) vecItem = new Array(2043002, 2043102, 2043202, 2044002, 2044102, 2044202, 2044402, 2044302);
            else if(stance == Packages.client.MapleJob.MAGICIAN) vecItem = new Array(2043702, 2043802);
            else if(stance == Packages.client.MapleJob.BOWMAN || stance == Packages.client.MapleJob.CROSSBOWMAN) vecItem = new Array(2044502, 2044602);
            else if(stance == Packages.client.MapleJob.THIEF) vecItem = new Array(2043302, 2044702);
            else vecItem = new Array(2044802, 2044902);
            
            for (var i = 0; i < vecItem.length; i++)
            talkStr += "\r\n#L" + i + "# #i" + vecItem[i] + "# #t" + vecItem[i] + "#";
            qm.sendSimple(talkStr);
	}

        else if(status == 2) {
            item = vecItem[selection];
            qm.gainItem(item, 1);
            qm.gainItem(4000022, -100);
            qm.gainItem(4003000, -30);
            qm.gainItem(4003001, -30);
            qm.gainItem(4001004, -1);
            qm.gainExp(20000);
            qm.gainMeso(15000);
            qm.gainFame(2);
            qm.completeQuest();
                    
            qm.dispose();
        }
}