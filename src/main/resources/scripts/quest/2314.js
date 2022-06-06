/* ===========================================================
			Resonance
	NPC Name: 		Minister of Home Affairs
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  Exploring Mushroom Forest(1)
=============================================================
Version 1.0 - Script Done.(18/7/2010)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendNext("请不要对我们失去信心.");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("为了营救公主，你必须先在蘑菇林中活动。企鹅国王设置了一道强大的屏障，禁止任何人进入城堡。请为我们调查此事。");
	else if (status == 1)
		qm.sendNext("从你现在站的地方往东走，你会在蘑菇林遇到障碍物。请小心，我听说这个地区到处都是令人恐惧的怪物.");
	else if(status == 2){
		//qm.forceStartQuest();
		//qm.forceStartQuest(2314,"1");
		qm.gainExp(8300);
		qm.sendOk("我明白了，所以这绝对不是一个固定的障碍。干得好。如果没有你的帮助，我们根本不知道那是怎么回事。");
		qm.forceCompleteQuest(); 
	} else if(status == 3){
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
		qm.sendOk("我看你已经彻底调查了蘑菇林的屏障。感觉如何？");
	else if (status == 1){
		qm.forceCompleteQuest(); 
		qm.gainExp(8300);
		qm.sendOk("我明白了，所以这绝对不是一个固定的障碍。干得好。如果没有你的帮助，我们根本不知道那是怎么回事。");
        } else if (status == 2){
                qm.dispose();
        }
}
	