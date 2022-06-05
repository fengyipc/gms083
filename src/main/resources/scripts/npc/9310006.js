/*
	公安C - 上海灘 - 通道 (701010323)
**/

function start() {
    if (cm.getParty() == null) { // No Party
	cm.sendOk("請組隊再來找我");
    } else if (!cm.isLeader()) { // Not Party Leader
	cm.sendOk("請叫你的隊長來找我!");
    } else {
	var party = cm.getParty().getMembers();
	var mapId = cm.getPlayer().getMapId();
	var next = true;
	var levelValid = 0;
	var inMap = 0;

	var it = party.iterator();
	while (it.hasNext()) {
	    var cPlayer = it.next();
	    if ((cPlayer.getLevel() >= 25 && cPlayer.getLevel() <= 200) || cPlayer.getJobId() == 900) {
		levelValid += 1;
	    } else {
		next = false;
	    }
	    if (cPlayer.getMapId() == mapId) {
		inMap += (cPlayer.getJobId() == 900 ? 1 : 1);
	    }
	}
	if (party.size() > 4 || inMap < 1) {
	    next = false;
	}
	if (next) {
	    var em = cm.getEventManager("WuGongPQ");
	    if (em == null) {
		cm.sendOk("當前副本有問題，請聯絡管理員....");
	    } else {
		var prop = em.getProperty("state");
		if (prop.equals("0") || prop == null) {
			cm.getParty().setEligibleMembers(party);
		    em.startInstance(cm.getParty(),cm.getMap());
	            cm.dispose();
		    return;
		} else {
		    cm.sendOk("裡面已經有人在挑戰...");
		}
	    }
	} else {
	    cm.sendOk("等級尚未達到 #r25#k 或者已經超過 #r200#k");
	}
    }
    cm.dispose();
}

function action(mode, type, selection) {
}