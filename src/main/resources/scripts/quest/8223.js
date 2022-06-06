/* ===========================================================
			Ronan Lana
	NPC Name: 		Lukan
	Description: 	Quest - Storming the Castle
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
		qm.sendAcceptDecline("哦，杰克派你来的？很好的时机，我正计划和杰克和其他人一起冲进禁区，从扭曲的主人手中夺回我们的权利。你好像已经准备好和我们并肩作战了，对吧?");
	else if (status == 1){
		qm.sendOk("太好了！你现在的任务是击溃他们的一些军队，削弱他们的防御能力。击败每一个：风袭者，火种和夜影，然后返回我报告.");
		qm.forceStartQuest();
	} else if (status == 2) {
                qm.dispose();
        }
}
