function start() {
    if(cm.haveItem(4031047)){
        var em = cm.getEventManager("Boats");
        if (em.getProperty("entry") == "true")
            cm.sendYesNo("Do you want to go to Ellinia?");
        else{
            cm.sendOk("开往魔法密林的飞船已经起航了,请等待下一班.");
            cm.dispose();
        }
    }else{
        cm.sendOk("你有#z4031047#吗.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("改变主意了再找我!");
	cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Boats");
    if (em.getProperty("entry") == "true") {
        cm.warp(200000112);
        cm.gainItem(4031047, -1);
        cm.dispose();
    }
    else{
        cm.sendOk("开往魔法密林的飞船已经停止检票了,请等待下一班");
        cm.dispose();
    }
}