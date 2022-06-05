var status = -1;
var map = 910220000;
var num = 5;
var maxp = 5;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status <= 1) {
	    cm.dispose();
	    return;
	}
	status--;
    }
    if (status == 0) {
        if(cm.getLevel() >= 20) {
			cm.sendOk("只有20级以下玩家才可以进入.");
            cm.dispose();
            return;
        }
        
	var selStr = "你要去训练中心吗";
	for (var i = 0; i < num; i++) {
		selStr += "\r\n#b#L" + i + "#训练中心" + (i+1) + " (" + cm.getPlayerCount(map + i) + "/" + maxp + ")#l#k";
	}
	cm.sendSimple(selStr);
    } else if (status == 1) {
	if (selection < 0 || selection >= num) {
		cm.dispose();
	} else if (cm.getPlayerCount(map + selection) >= maxp) {
		cm.sendNext("这个里面人满了");
		status = -1;
	} else {
		cm.warp(map + selection, 0);
		cm.dispose();
	}
    }
}