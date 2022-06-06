/* ===========================================================
			Ronan Lana
	NPC Name: 		Jack
	Description: 	Quest - Mark of Heroism
=============================================================
Version 1.0 - Script Done.(11/7/2017)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
		else{
			qm.sendOk("好吧，那么。回头见.");
			qm.dispose();
			return;
		}
	}
        if (status == 0){
		qm.sendAcceptDecline("时间到了！我们需要给你一条安全到达克里姆森伍德山谷山顶的路，否则我们所做的一切都是徒劳的。你必须把手放在 #b#t3992039##k. 你准备好要去了吗?");
	}
	else if (status == 1){
		qm.sendOk("好吧，我需要你先把这些东西拿到手上: #b10 #t4010006##k, #b4 #t4032005##k and #b1 #t4004000##k. Go!");
		qm.forceStartQuest();
	} else if (status == 2) {
                qm.dispose();
        }
}
