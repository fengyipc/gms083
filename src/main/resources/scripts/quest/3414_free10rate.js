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
		qm.sendNext("哇。。。就这样！！！有了这个样本，正在欧米茄领域进行的研究将重新焕发出成果！找一个比我更擅长打猎的人，我也不知该说些什么。我必须回到正轨上！不管怎样，为了你的工作做得好，我必须奖励你。");
	}

	else if(status == 1) {
            var talkStr = "请选择你想要的卷轴。所有的成功率都是10%。 \r\n\r\n#r选择卷轴\r\n#b"
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
            item = qm.gainItem(item, 1);
            
            if (item != null) {
                qm.gainExp(12000);
                qm.completeQuest();
            }
                    
            qm.dispose();
        }
}
