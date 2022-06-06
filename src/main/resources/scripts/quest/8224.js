/* ===========================================================
			Ronan Lana
	NPC Name: 		Taggrin
	Description: 	Quest - The Fallen Woods
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
            qm.sendAcceptDecline("嘿，旅行者，过来！我是Taggrin，乌鸦忍者部落的首领。我们是目前在新叶市郡的雇佣兵。我们的任务是追捕这些天一直潜伏在这里的生物。你有兴趣帮我们办点事吗？当然，付款对双方都有利.");
    else if (status == 1){
            qm.sendOk("好啊。我要你在森林里找些假树，收集其中的50滴作为你参与此事的证据.");
            qm.forceStartQuest();
    } else if (status == 2) {
            qm.dispose();
    }
}
