status = -1;
close = false;
oldSelection = -1;
var em;

function start() {
    em = cm.getEventManager("Subway");
    var text = "这是检票口.";
	var hasTicket = false;
    if (cm.haveItem(4031713) && cm.getPlayer().getMapId() == 600010001){
        text += "\r\n#b#L0##t4031713#";
		hasTicket = true;
	}
	if(!hasTicket){
		cm.sendOk("你没买票!你可以找贝尔购买.");
		cm.dispose();
	}else
        cm.sendSimple(text);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(mode == 0)
            cm.sendNext("这里还有事情要做,对吗?");
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(selection == 0){
            if (em.getProperty("entry") == "true")
                cm.sendYesNo("看来这里有足够的空间坐这趟车。请把票准备好，我可以让你进去。旅程会很长，但你会很快到达目的地的。你怎么认为？你想搭这趟车吗?");
            else{
                cm.sendNext("我们将在起飞前1分钟开始登机。请耐心等待几分钟。请注意，地铁将准时起飞，在此之前1分钟我们将停止收票，请务必准时到达.");
                cm.dispose();
            }
        }
        oldSelection = selection;
    }else if(status == 1){
        if (oldSelection == 0 && cm.haveItem(4031713)) {
            if(em.getProperty("entry") == "true") {
                cm.gainItem(4031713, -1);
                cm.warp(600010002);
            }
            else {
                cm.sendNext("我们将在起飞前1分钟开始登机。请耐心等待几分钟。请注意，地铁将准时起飞，在此之前1分钟我们将停止收票，请务必准时到达.");
            }
        } else {
            cm.sendNext("你没买票!");
	}
        
        cm.dispose();
    }
}