/* ===========================================================
			Resonance
	NPC Name: 		Scarrs
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Killer Mushroom Spores(2)
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
			qm.sendOk("我知道这不是一件容易的事，但是没有#b紫色毒蘑菇盖#k我做不出#b奇拉蘑菇孢子#k。请重新考虑。");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("嗯...当你收集#b紫色毒蘑菇盖#k的时候，我调查了#b奇拉蘑菇孢子#k的制造过程，意识到我们需要更多的材料。我需要你再收集#b50个变种孢子#k。你能做到吗？");
	else if (status == 1){
		qm.forceStartQuest();
		qm.sendOk("好吧，我要你打败#b得意的蘑菇仔#k，并带回#b变种孢子#k作为回报。");
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
		qm.sendOk("你收集了所有必要的材料吗?")
	else if (status == 1){
                if (!qm.haveItem(4000499, 50)) {
                        qm.sendOk("请先收集所有的材料.");
                        status = 2;
                        return;
                }

                qm.sendNext("这些应该够我做#b奇拉蘑菇孢子#k了。请稍等.");
	} else if(status == 2){
                qm.sendOk("请收下，这就是致命的#b奇拉蘑菇孢子#k。希望这足够你拯救我们的公主，帮助我们收回王国。祝你好运！");
	} else if(status == 3) {
                qm.forceCompleteQuest();
                qm.gainExp(11500);
		qm.gainItem(4000499, -50);
		qm.gainItem(2430014, 1);
                qm.dispose();
        }
}
	