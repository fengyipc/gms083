var status = 0;
var cost = 3000;
var mapId;
var 勇士部落 = 102000000;
var 上海城市广场 = 701000100;
function start() {
	mapId = cm.getPlayer().getMapId();
	if(mapId == 勇士部落){
		 cm.sendYesNo("请问是否想去#m"+上海城市广场+"#?? 3000金币一次~~~~");
	}else 
    cm.sendYesNo("请问是否想回去#m"+勇士部落+"#?? 3000金币一次~~~~");
}

function action(mode, type, selection) {
    if (mode != 1) {
        if (mode == 0)
        cm.sendOk("什么时候想回去了再来找我~~~");
        cm.dispose();
        return;
    }
    status++;
    if (status == 1) {
		if(cm.getMeso() < cost) {
		cm.sendOk("你的金币不够回#m"+(mapId == 勇士部落?上海城市广场:勇士部落)+"#!!");
		cm.dispose();
		} else {
		cm.gainMeso(-cost);
		cm.warp(mapId == 勇士部落?上海城市广场:勇士部落, 0);
        cm.dispose();
    }
}
}