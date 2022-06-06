/* ===========================================================
			Ronan Lana
	NPC Name: 		John, Jack
	Description: 	Quest - Lost in Translation
=============================================================
Version 1.0 - Script Done.(10/7/2017)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
            else {
                qm.sendOk("拜托，这个城市真的需要你配合!");
                qm.dispose();
                return;
            }
	}
	if (status == 0)
		qm.sendAcceptDecline("我知道这件事我们可以依靠外人！既然我们有他翻译的信，把它交给杰克，他知道该怎么办了.");
	else if (status == 1){
            if(qm.haveItem(4032018, 1)) {
                qm.forceStartQuest();
            } else if(qm.canHold(4032018, 1)) {
                qm.gainItem(4032018, 1);
                qm.forceStartQuest();
            } else {
                qm.sendOk("哦，你需要在你的ETC中有一个位置才能拿到公报.");
            }

            qm.dispose();
	}
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(type == 1 && mode == 0)
                status -= 2;
        else {
            qm.dispose();
            return;
        }
    }
    if (status == 0){
        if(qm.haveItem(4032018, 1)) {
            qm.sendOk("哦，是你带来的。做得好，对策过程现在就容易多了.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0# \r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 50000 EXP");
        } else {
            qm.sendOk("怎么了？为什么你还没找到翻译过的信息？请把信的内容带给我，让我尽快制定对策.");
            qm.dispose();
        }
    } else if (status == 1){
        qm.gainItem(4032018, -1);
        qm.gainExp(50000);
        qm.forceCompleteQuest();
        
        qm.dispose();
    }
}
