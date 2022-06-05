function start() {
    if(cm.haveItem(4031074)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("你想去玩具城吗?");
        } else {
            cm.sendOk("开往玩具城的列车已经出发了,请等下一班.");
            cm.dispose();
        }
    } else {
        cm.sendOk("你有票吗.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("改变主意了找我!");
        cm.dispose();
	return;
    } 
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000122);
        cm.gainItem(4031074, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("停止检票了,请等下一班.");
        cm.dispose();
    }
}