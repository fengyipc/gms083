/* ===========================================================
			Resonance
	NPC Name: 		Head Patrol Officer
	Map(s): 		Mushroom Castle: Corner of Mushroom Forest(106020000)
	Description: 	Quest -  The Story Behind the Case
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
			qm.sendOk("时间不多了。请快点。");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("我已经跟#b内务部长#k说明了你的能力.请立即去联系他");
	else if (status == 1){
		qm.forceStartQuest();
		qm.sendOk("请拯救我们的王国，我相信你！");
	} else if (status == 2){
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
	if (status == 0) {
		qm.forceCompleteQuest(); 
		qm.gainExp(4000);
		qm.dispose();
	}
}
