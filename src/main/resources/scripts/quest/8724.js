

var status = -1;

function start(mode, type, selection) {
    	if (mode == -1) {
	qm.sendNext("*Sob* Aran has declined my request!");
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
		if (status == 0)
			qm.sendNext("睡觉对于人类来说是非常重要的事情。如果你做了噩梦，就去找解梦家谈谈吧。");
		else if (status == 1) {
                        qm.sendNext("解梦家听了梦的内容后，说是不好的凶梦，需要进行辟邪。为了辟邪，必须捕捉僵尸蘑菇，搜集僵尸蘑菇掉落的僵尸符。\n\n#b恶梦次数  5次以上#k \n\n10级~30级 僵尸蘑菇的#t4032221##i4032221# #b#c4032221#/30#k\n\n31级~50级 僵尸猴的#t4032222##i4032222# #b#c4032222#/30#k\n\n51级~70级 僵尸的#t4032223##i4032223# #b#c4032223#/30#k\n\n71级~200级 僵尸蘑菇王的#t4032224##i4032224# #b#c4032224#/30#k");
                        qm.forceStartQuest();
			qm.dispose();
		}
	}
}

function end(mode, type, selection) {
	if (mode == -1) {
	qm.sendNext("孩子怎么样？请给我的孩子。");
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
		if (status == 0)
                  if (qm.getPlayerStat("LVL") >= 10 && qm.getPlayerStat("LVL") <= 30 && qm.haveItem(4032221,30)) {
                                qm.sendNext("我要的东西你都带来了呀.请收好我给你的礼物");
                                qm.gainItem(4032226,1);
                                qm.gainItem(4032221,-30);
                                qm.forceCompleteQuest();
                        } else if (qm.getPlayerStat("LVL") >= 31 && qm.getPlayerStat("LVL") <= 50 && qm.haveItem(4032222,30)) {
                                qm.sendNext("我要的东西你都带来了呀.请收好我给你的礼物");
                                qm.gainItem(4032226,1);
                                qm.gainItem(4032222,-30);
                                qm.forceCompleteQuest();
                        } else if (qm.getPlayerStat("LVL") >= 51 && qm.getPlayerStat("LVL") <= 70 && qm.haveItem(4032223,30)) {
                                qm.sendNext("我要的东西你都带来了呀.请收好我给你的礼物");
                                qm.gainItem(4032226,1);
                                qm.gainItem(4032223,-30);
                                qm.forceCompleteQuest();
                        } else if (qm.getPlayerStat("LVL") >= 71 && qm.getPlayerStat("LVL") <= 250 && qm.haveItem(4032224,30)) {
                                qm.sendNext("我要的东西你都带来了呀.请收好我给你的礼物");
                                qm.gainItem(4032226,1);
                                qm.gainItem(4032224,-30);
                                qm.forceCompleteQuest();
                        } else {
                                qm.sendNext("你已经得到以下物品了吗？#k \r\n 10级~30级 僵尸蘑菇的#t4032221##i4032221# #b#c4032221#/30#k\n\n\r\n 31级~50级 僵尸猴的#t4032222##i4032222# #b#c4032222#/30#k\n\n\r\n 51级~70级 僵尸的#t4032223##i4032223# #b#c4032223#/30#k\n\n\r\n 71级~200级 僵尸蘑菇王的#t4032224##i4032224# #b#c4032224#/30#k");	
                                qm.dispose();
                        }
		else if (status == 1) {
			qm.dispose();
		}
	}
}
