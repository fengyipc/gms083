/* ===========================================================
			Resonance
	NPC Name: 		Minister of Magic
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Exploring Mushroom Forest(3)
=============================================================
Version 1.0 - Script Done.(18/7/2010)
=============================================================
*/

importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendOk("你为什么还要问你是不是要拒绝这个？");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("我想我听说过一种能打破这些障碍的药水。我想它叫#b奇拉蘑菇孢子#k。嗯...在外面，你会找到蘑菇学着#b斯卡斯#k. #b斯卡斯#k是蘑菇专家, 去跟他谈谈.");
	else if (status == 1){
		qm.forceStartQuest();
		qm.sendOk("我相信#b斯卡斯#k会尽一切力量帮助你.");
	} else if (status == 2){
		qm.dispose();
	}
}

function end(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0) {
		    status -= 2;
		} else {
			qm.dispose();
			return;
		}
	}
	if (status == 0) {
		qm.sendOk("啊，你就是人们所说的冒险家。我是#b斯卡斯#k, 蘑菇王国的研究专家.所以你需要一些#b奇拉蘑菇孢子#k吗?");
	} else if (status == 1) {
        qm.forceCompleteQuest();
		qm.gainExp(4200);
		qm.sendOk("#b奇拉蘑菇孢子#k。。。我想我以前听说过。。。");
	} else if (status == 2) {
        qm.dispose();
    }
}
	