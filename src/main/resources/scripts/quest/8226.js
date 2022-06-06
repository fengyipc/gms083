/* ===========================================================
			Ronan Lana
	NPC Name: 		Taggrin
	Description: 	Quest - The Right Path
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
		else{
			qm.sendOk("好吧，那么。回头见.");
			qm.dispose();
			return;
		}
	}
	if (status == 0)
		qm.sendAcceptDecline("既然你是我们队的一员，听我说吧。我们，忍者的乌鸦族，被雇佣来处理很多问题，每个人都在非洲大陆的不同地区工作，为我们的雇主解决问题。我要谈谈你的任务，你准备好了吗?");
	else if (status == 1){
		qm.sendOk("你的下一个任务是：打败在这片森林里游荡的长辈。不过，这些人很难对付，所以要保持警惕。我要你给我拿100 #t4032010# as proof of your duty.");
		qm.forceStartQuest();
	} else if (status == 2) {
                qm.dispose();
        }
}
