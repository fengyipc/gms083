function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Trains");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("Do you want to go to Orbis?");
        else{
            cm.sendOk("去往天空之城的列车已经出发,请耐心等待下一班列车.");
            cm.dispose();
        }
    }else{
        cm.sendOk("请带上你的车票.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧,改变主意了记得来找我!");
        cm.dispose();
	return;
    } 
    
    var em = cm.getEventManager("Trains");
    if (em.getProperty("entry") == "true") {
        cm.warp(220000111);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else {
        cm.sendOk("列车已经停止检票了,请耐心等待下一班.");
        cm.dispose();
    }
}