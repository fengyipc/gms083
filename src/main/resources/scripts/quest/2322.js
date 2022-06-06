/* ===========================================================
			Resonance
	NPC Name: 		Minister of Home Affairs
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Over the Castle Wall (2)
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
			qm.sendNext("真的吗？有没有别的方法可以穿透城堡？如果你不知道，那就来找我。");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendYesNo("就像我告诉过你的，突破障碍不能成为庆祝的理由。那是因为我们的蘑菇王国城堡完全拒绝任何人进入我们的王国之外，所以你很难做到这一点。嗯。。。想办法进去，你能…先调查一下城堡的外墙吗？");
	else if (status == 1)
		qm.sendNext("穿过蘑菇林，当你到达#b选择岔路#k, 选择向城堡走去。祝你好运。");
	else if (status == 2){
		//qm.forceStartQuest();
		//qm.forceStartQuest(2322, "1");
		qm.gainExp(11000);
		qm.sendOk("你做出了正确的选择");
		qm.forceCompleteQuest();
        } else if (status == 3){
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
		qm.sendOk("嗯,我懂了。。。所以他们完全关闭了入口.");
	else if (status == 1){
		qm.forceCompleteQuest();
                qm.gainExp(11000);
		qm.sendOk("你做出了正确的选择");
	} else if (status == 2) {
                qm.dispose();
        }
}
	