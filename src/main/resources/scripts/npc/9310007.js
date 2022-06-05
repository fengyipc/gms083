function start() {
	cm.sendYesNo("你真的現在要出去嗎?");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.warp(701010320, 0);}
    cm.dispose();
}