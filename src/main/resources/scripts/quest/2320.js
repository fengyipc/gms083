/* ===========================================================
			Resonance
	NPC Name: 		Scarrs
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  A Friendship with Bruce
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
			qm.sendOk("我想让你亲自把这条好消息告诉#b布鲁斯#k，但如果你很忙的话，我能理解。");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("我还有一个要求。你想听听吗？");
	else if (status == 1){
		qm.forceStartQuest();
		qm.gainItem(4032389, 1);
		qm.sendOk("老实说，这些#b奇拉蘑菇孢子#k并不是完全出自我的工作.你还记得射手村的#b布鲁斯#k吗?我从小就是他的朋友, #b奇拉蘑菇孢子#k是我和他分享以后，共同研究完成的。这都要感谢他，所以我想让你把这个给他.");
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
		qm.sendOk("哦！你是代表#b斯卡斯#k吗? \r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n#fUI/UIWindow.img/QuestIcon/8/0# 8800 经验");
	else if (status == 1){
                qm.forceCompleteQuest();
		qm.gainExp(8800);
		qm.gainItem(4032389, -1);
		qm.sendOk("啊，这就是#b奇拉蘑菇孢子#k我过去一直在研究他们。我很难收集到原料，所以我只在理论上留了下来，但他能完成，还有一个样品可以展示。请告诉他我很欣赏他的工作。");
	} else if (status == 2) {
                qm.dispose();
        }
}
	