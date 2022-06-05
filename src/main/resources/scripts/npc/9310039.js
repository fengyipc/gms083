function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	}
	else if (mode == 0) {
		cm.sendOk("好的如果要挑战#b妖僧#k随时来找我.");
		cm.dispose();
	}
	else {
		if (mode == 1)
			status++;
		else
			status--;

		if (status == 0)
			var party = cm.getPlayer().getParty();
		if (party == null || party.getLeader().getId() != cm.getPlayer().getId()) {
			cm.sendOk("你不是队长。请你们队长来说话吧！");
			cm.dispose();
		} else if (cm.getPlayer().getBossLog(0, "挑战妖僧") >= 2) {
			cm.sendOk("您好,限定每天只能挑战2次！");
			cm.dispose();
		} else if (!cm.getPlayerCount(702060000) <= 0) {//判断里面有没有人
			cm.sendOk("里面有人暂时无法进入！!");
			cm.dispose();
		} else {
			map = cm.getPlayer().getMap();
			var 可以进入 = true;
			var 原因;
			var players = cm.getPlayer().getPartyMembersOnSameMap();
			if (players.size() != cm.getPlayer().getParty().getPartyMembers().size()) {
				cm.sendOk("队伍中有玩家不在附近,无法进入");
			} else {
				for (var i = 0; i < players.size(); i++) {
					if (players.get(i).getBossLog(0, "挑战妖僧") >= 2) {
						可以进入 = false;
						原因 = players.get(i).getName() + "剩余挑战次数不足";
						break;
					}
				} if (可以进入) {
					for (var i = 0; i < players.size(); i++) {
						players.get(i).setBossLog(0, "挑战妖僧");
					}
					cm.getMap(702060000).resetFully();//地图刷新
					cm.warpParty(702060000, 0);
					cm.getPlayer().getMap().startTimeLimitTask(30 * 60, map.getId());
				}
			}
			//cm.getPlayer().startMapTimeLimitTask(1200, map);//给地图时间
			cm.dispose();
		}
	}
}
