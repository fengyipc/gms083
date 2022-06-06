

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
			qm.sendNext("如果你做猪梦，可以获得黄金猪猪道具。");
		else if (status == 1) {
                        qm.sendNext("如果有5个黄金猪猪道具，递给旅馆主人，就赠送给你一个礼物能帮助你好好的睡着。\n\n#b猪梦5次以上#k\n\n#i4032226##t4032226##b#c4032226#/5#k");
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
		if(qm.haveItem(4032226,5)){
                qm.forceCompleteQuest();
                qm.gainItem(4032226,-5); 
                qm.gainItem(2210029,1); 
                qm.sendNext("收到了一瓶黄金猪变身秘药，能帮助熟睡的。");
            }else{
                qm.sendOk("如果有5个黄金猪猪道具，递给旅馆主人，就赠送给你一个礼物能帮助你好好的睡着。\n\n#i4032226##t4032226#   #b#c4032226#/5#k")
                qm.dispose();   
           }  
		else if (status == 1) {
			qm.dispose();
		}
	}
}
