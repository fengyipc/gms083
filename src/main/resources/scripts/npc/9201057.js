function start() {
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001)
        cm.sendYesNo("去" + (cm.c.getPlayer().getMapId() == 103000100 ? "新叶城" : "废弃都市") + "费用是#b5000金币#k.要购买#b#t" + (4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000)) + "##k吗?");
    else if (cm.c.getPlayer().getMapId() == 600010002 || cm.c.getPlayer().getMapId() == 600010004)
        cm.sendYesNo("列出出发前你要离开吗?");
}

function action(mode, type, selection) {
    if(mode != 1){
        cm.dispose();
        return;
    }
    if (cm.c.getPlayer().getMapId() == 103000100 || cm.c.getPlayer().getMapId() == 600010001){
	var item = 4031711 + parseInt(cm.c.getPlayer().getMapId() / 300000000);

        if(!cm.canHold(item)) {
            cm.sendNext("背包满了.");
	}
	else if(cm.getMeso() >= 5000){
            cm.gainMeso(-5000);
            cm.gainItem(item, 1);
            cm.sendNext("给你.");
        }else
            cm.sendNext("金币不够.");
    }else{
        cm.warp(cm.c.getPlayer().getMapId() == 600010002 ? 600010001 : 103000100);
    }
    cm.dispose();
}