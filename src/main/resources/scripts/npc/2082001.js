function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("要上船吗?");
        } else {
            cm.sendOk("船还没抵港,等会在过来.");
            cm.dispose();
        }
    } else {
        cm.sendOk("你没有票.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好的!");
        cm.dispose();
	return;
    }
    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(240000111);
        cm.gainItem(4031045, -1);
    } else {
        cm.sendOk("船还没抵港,等会在过来");
    }
    cm.dispose();
}