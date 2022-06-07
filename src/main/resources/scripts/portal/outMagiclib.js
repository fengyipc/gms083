function enter(pi) {
	if(pi.getMap().countMonster(2220100) > 0){
		pi.getPlayer().message("在所有的蓝蘑菇都被击败之前不能离开。");
		return false;
	}
	else{
		var eim = pi.getEventInstance();
		eim.stopEventTimer();
		eim.dispose();
	
		pi.playPortalSound();
		pi.warp(101000000, 26);

		if(pi.isQuestCompleted(20718))
			pi.openNpc(1103003, "MaybeItsGrendel_end");
		
		return true;
	}
}