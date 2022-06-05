var status = -1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
    if (status == 0) {
	cm.sendYesNo("要退出吗?你的队伍付出了很大的努力.");
    } else if (status == 1) {
	cm.removeAll(4001163);
	cm.removeAll(4001169);
	cm.removeAll(2270004);
	cm.warp(930000800, 0);
	cm.dispose();
    }
}