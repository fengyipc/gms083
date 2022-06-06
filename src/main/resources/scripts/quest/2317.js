/* ===========================================================
			Resonance
	NPC Name: 		Scarrs
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Killer Mushroom Spores(1)
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
			qm.sendOk("突破障碍需要#b紫色毒蘑菇盖#k。你改变主意的时候跟我说。");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("啊！如果我没搞错的话，我还是个孩子的时候就在一本书中看到过#b奇拉蘑菇孢子#k。到现在我还记得它。。。，它是从#b紫色毒蘑菇盖#k提取的强力毒素，这意味着你需要收集一些#b紫色毒蘑菇盖#k。");
	else if (status == 1){
		qm.forceStartQuest();
		qm.sendOk("请打败#b紫色毒蘑菇#k然后带回来#b100个紫色毒蘑菇盖#k给我.");
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
		qm.sendOk("你还没有收集完#b100个紫色毒蘑菇盖#k。");
	else if (status == 1){
                qm.sendOk("我很惊讶你能收集到#b100个紫色毒蘑菇盖#k，太棒了！我想我可以制作出#b奇拉蘑菇孢子#k了.");
	} else if (status == 2) {
                qm.forceCompleteQuest();
                qm.gainExp(13500);
		qm.gainItem(4000500, -100);
		qm.dispose();
        }
}
	