/* ===========================================================
			Resonance
	NPC Name: 		Head Patrol Officer
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  The Test
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
			qm.sendOk("嗯。。。你一定还不熟悉你的战斗技巧。我们会在这里等你，等你准备好了再来找我们。");
		    qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("我们需要你的帮助，高贵的探险家。我们的王国现在面临着巨大的威胁，我们迫切需要一个勇敢的冒险家愿意为我们而战，这就是为什么不过，请你明白，既然我们需要信任你，我们必须先测试你的能力，然后才能坚定地支持你。你能帮我们吗？");
	else if (status == 1){
		qm.forceStartQuest();
		qm.sendOk("继续前进，你会看到#b得意的蘑菇仔#k, 它们是背弃蘑菇王国的孢子。请你击败它们并带回来#b50个变异的孢子#k.");
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
		qm.sendOk("你已经击败了得意的蘑菇仔吗?");
	else if (status == 1){
		qm.forceCompleteQuest();
		qm.gainExp(11500);
		qm.gainItem(4000499, -50);
		qm.sendOk("太棒了。我为怀疑你的能力而道歉。请帮助我们把蘑菇王国从这场危机中拯救出来！");
	} else if (status == 2){
                qm.dispose();
        }
}
	