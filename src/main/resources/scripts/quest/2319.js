/* ===========================================================
			Resonance
	NPC Name: 		Scarrs
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Killer Mushroom Spores(3)
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
			qm.sendOk("我知道这不是一项艰巨的任务，所以如果你准备好了就回来找我。");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("哦，我差点忘了！我在想什么？我需要你把这个#b变种孢子#k的样本交给魔法大臣并报告结果。");
	else if (status == 1){
		qm.forceStartQuest();
		qm.gainItem(4032389, 1);
		qm.sendOk("魔法大臣告诉我一旦#b奇拉蘑菇孢子#k完成，他也想要一个样本。我把样品给你，现在请把它交给我们的#b魔法大臣。#k");
        } else if (status == 2){
		qm.dispose();
	}
}

function end(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendOk("#b奇拉蘑菇孢子#k终于完成了吗?");
	else if (status == 1){
                qm.forceCompleteQuest();
		qm.gainExp(4200);
		qm.gainItem(4032389, -1);
		qm.sendOk("好的，这就是#b奇拉蘑菇孢子#k，谢谢你。");
	} else if (status == 2) {
                qm.dispose();
        }
}
	