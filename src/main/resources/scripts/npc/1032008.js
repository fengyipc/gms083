function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("你想去天空之城?");
        else{
            cm.sendOk("飞船已经离开了,请等下一班.");
            cm.dispose();
        }
    }else{
        cm.sendOk("确定你有我们的船票吗?");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好的,想改变主意了就跟我说!");
	cm.dispose();
	return;
    }
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(101000301);
        cm.gainItem(4031045, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("飞船已经停止检票了,请等待下一班.");
        cm.dispose();
    }
}	