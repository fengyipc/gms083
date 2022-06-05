var map = 677000010;
var quest = 28283;
var status = -1;
var inHuntingGround;

function start(mode, type, selection) {
        inHuntingGround = (cm.getMapId() >= 677000010 && cm.getMapId() <= 677000012);
	action(1, 0, 0);        
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if(!inHuntingGround) {
            if (cm.isQuestStarted(quest)) {
                if(!cm.getPlayer().haveItemEquipped(1003036)) {
                    cm.sendOk("里面充满了毒气...进去之前请穿好#r#z1003036##k.");
                    cm.dispose();
                    return;
                }

                cm.sendYesNo("你想去#b#m" + map + "##k吗?");
            } else {
                cm.sendOk("入口被堵住了.");
                cm.dispose();
            }
        } else {
            if(cm.getMapId() == 677000011) {
                map = 677000012;
                cm.sendYesNo("要去#b#m" + map + "##k吗?");
            } else {
                map = 105050400;
                cm.sendYesNo("要离开吗?");
            }
        }
    } else {
        cm.warp(map, 0);
	cm.dispose();
    }
}