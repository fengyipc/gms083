function start() {
    if(cm.haveItem(4031576)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("这不是短途飞行，如果你还需要处理一些事情，我建议你在登机前做完。现在就要登机吗?");
        } else {
            cm.sendOk("等等.");
            cm.dispose();
        }
    } else {
        cm.sendOk("你有票吗.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好的,改变主意了来找我!");
        cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Genie");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000152);
        cm.gainItem(4031576, -1);
    } else {
        cm.sendOk("等等.");
    }
    
    cm.dispose();
}