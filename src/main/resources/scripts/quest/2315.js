/* ===========================================================
			Resonance
	NPC Name: 		Minister of Home Affairs
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Exploring Mushroom Forest(2)
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
			qm.sendOk("请继续帮我们.");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("一个强大的魔法屏障，嗯？那我们该怎么办。。。？如果我们找不到办法打破这个障碍，那么我们就救不了公主。如果如你所说，身体上无法突破，那么请问问#b魔法大臣#k?");
	else if (status == 1){
		qm.forceStartQuest();
		qm.sendOk("请马上去见他。魔法大臣似乎有点紧张，但他知识渊博，我相信他会知道该怎么做。");
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
		qm.sendOk("什么？你调查了蘑菇森林的屏障？");
	else if (status == 1){
		qm.forceCompleteQuest(); 
                qm.gainExp(4000);
		qm.sendOk("嗯…这很有趣。这是一个有强大魔法力量的人设置的屏障，这意味着我们无法突破它。");
	} else if (status == 2) {
                qm.dispose();
        }
}
	