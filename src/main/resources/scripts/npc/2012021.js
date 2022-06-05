function start() {
    if(cm.haveItem(4031331)){
        var em = cm.getEventManager("Cabin");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("要上飞机吗?");
        } else {
            cm.sendOk("飞机还没有抵达,请等等.");
            cm.dispose();
        }
    } else {
        cm.sendOk("你有票吗.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("改变主意了随时来找我!");
        cm.dispose();
	return;
    }

    var em = cm.getEventManager("Cabin");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000132);
        cm.gainItem(4031331, -1);
    } else {
        cm.sendOk("飞机还没有抵达,请等等.");
    }
    cm.dispose();
}