/*
	NPC Name: 		Insiginificant Being
	Map(s): 		Dungeon : Another Entrance
	Description: 		Takes you to another Dimension
*/

function start() {
    if (cm.getQuestStatus(6107) == 1 || cm.getQuestStatus(6108) == 1) {
	var ret = checkJob();
	if (ret == -1) {
	    cm.sendOk("请创建一个队伍再与我交谈");
	} else if (ret == 0) {
	    cm.sendOk("请确定你的队伍只有2个人.");
	} else if (ret == 1) {
	    cm.sendOk("你的队员没有资格进入异界之门。");
	} else if (ret == 2) {
	    cm.sendOk("你的队员没有资格进入异界之门。");
	} else {
	    var em = cm.getEventManager("s4aWorld");
	    if (em == null) {
		cm.sendOk("未知原因无法进入。再试一次。" );
	    } else if (em.getProperty("started").equals("true")) {
		cm.sendOk("已经有人试图在异界之门挑战武术教练。" );
	    } else {
                var eli = em.getEligibleParty(cm.getParty());
                if(eli.size() > 0) {
                    if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                        cm.sendOk("你的队伍已经登记了");
                    }
                } else {
                    cm.sendOk("您还无法启动组队任务，因为您的队伍不在范围大小内，您的组队成员中的某些人没有资格尝试，或者他们不在此地图中。");
                }
	    }
	}
    } else {
        cm.sendOk("未知原因无法进入。再试一次。。");
    }
    
    cm.dispose();
}

function action(mode, type, selection) {
}

function checkJob() {
    var party = cm.getParty();

    if (party == null) {
	return -1;
    }
    //    if (party.getMembers().size() != 2) {
    //	return 0;
    //    }
    var it = party.getMembers().iterator();

    while (it.hasNext()) {
	var cPlayer = it.next();

	if (cPlayer.getJobId() == 312 || cPlayer.getJobId() == 322 || cPlayer.getJobId() == 900) {
	    if (cPlayer.getLevel() < 120) {
		return 2;
	    }
	} else {
	    return 1;
	}
    }
    return 3;
}