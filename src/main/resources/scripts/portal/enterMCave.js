importPackage(Packages.server.quest);
importPackage(Packages.server.life);

function enter(pi) {
	if(pi.isQuestStarted(21201)) { // Second Job
		for (var i = 108000700; i < 108000709; i++){
			if(pi.getPlayerCount(i) > 0 && pi.getPlayerCount(i + 10) > 0)
				continue;
			
			pi.playPortalSound();
			pi.warp(i, "out00");
			pi.setQuestProgress(21202, 21203, 0);
			return true;
		}
		pi.message("镜子是空白的，因为许多玩家回忆起他们的记忆。请稍候再试。");
		return false;
	} else if(pi.isQuestStarted(21302) && !pi.isQuestCompleted(21303)) { // Third Job
		if(pi.getPlayerCount(108010701) > 0 || pi.getPlayerCount(108010702) > 0) {
			pi.message("镜子是空白的，因为许多玩家回忆起他们的记忆。请稍候再试。");
			return false;
		} else {
			var map = pi.getClient().getChannelServer().getMapFactory().getMap(108010702);
			spawnMob(-210, 454, 9001013, map);
			
			pi.playPortalSound();
			pi.setQuestProgress(21303, 21203, 1);
			pi.warp(108010701, "out00");
			return true;
		}
	} else {
                pi.message("您已通过测试，无需再次访问镜像。");
		return false;
	}
}

function spawnMob(x, y, id, map) {
	if(map.getMonsterById(id) != null)
		return;
		
	var mob = MapleLifeFactory.getMonster(id);
	map.spawnMonsterOnGroundBelow(mob, new java.awt.Point(x, y));
}