function enter(pi) {
	if(pi.getPlayer().getMapId() == 130030001){
		if(pi.isQuestStarted(20010)){
			pi.playPortalSound(); pi.warp(130030002, 0);
                        return true;
		} else {
			pi.message("请先点击NPC获得任务。");
		}
	} else if(pi.getPlayer().getMapId() == 130030002){
                if(pi.isQuestCompleted(20011)){
			pi.playPortalSound(); pi.warp(130030003, 0);
                        return true;
		} else {
			pi.message("请在继续之前完成所需的任务。");
		}
	} else if(pi.getPlayer().getMapId() == 130030003){
		if(pi.isQuestCompleted(20012)){
			pi.playPortalSound(); pi.warp(130030004, 0);
                        return true;
		} else {
			pi.message("请在继续之前完成所需的任务。");
		}
	} else if(pi.getPlayer().getMapId() == 130030004){
		if(pi.isQuestCompleted(20013)){
			pi.playPortalSound(); pi.warp(130030005, 0);
                        return true;
		} else {
			pi.message("请在继续之前完成所需的任务。");
		}
	}
        
        return false;
}