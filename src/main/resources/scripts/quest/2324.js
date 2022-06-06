/* ===========================================================
			Resonance
	NPC Name: 		Minister of Home Affairs
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Over the Castle Wall (3)
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
			qm.sendOk("这是你进入城堡的唯一途径。请仔细想想");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendNext("啊！也许有办法。。。如果你能利用我们种植的棘藤来保护我们的城堡，那么你就可以进入!");
	if (status == 1)
		qm.sendAcceptDecline("如果你能以某种方式消除藤蔓上的刺，那么你就可以用藤蔓爬过城堡的墙壁。当然，这也需要一个尖刺消除剂。。。");
	if (status == 2)
		qm.sendOk("这个#b尖刺消除剂#k是从陡峭的坡路的神秘草药中提取出来的。企鹅国王用这些草药使猪中毒，占领了蘑菇森林。 #b中毒的猪猪猪尾巴#k是你能找到草药提取物的地方。请集合#b100个中毒的猪猪猪尾巴#k把他们带给#b魔法大臣.#k");
	if (status == 3){
		//qm.forceStartQuest();
		//qm.forceStartQuest(2324, "1");
		qm.gainExp(11000);
		qm.sendOk("很好的引导.");
		qm.forceCompleteQuest();
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
		qm.sendOk("嗯，我明白了。。。所以他们完全关闭了入口.");
	if (status == 1){
		qm.gainExp(11000);
		qm.sendOk("很好的引导.");
		qm.forceCompleteQuest();
		qm.dispose();
	}
}
	