/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100003 Kiriru (To Victoria Island From Ereve)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Victoria Island");
var method;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == -1) {
		cm.dispose();
		return;
	} else {
		if(mode == 0 && status == 0) {
			cm.dispose();
			return;
		} else if(mode == 0) {
			cm.sendNext("如果你不感兴趣，那好吧。。。");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b金银岛(1000 金币)#k";
                        }			
                        cm.sendSimple("- 你好.我负责#b圣地#k到#b金银岛#k的航线,如果你需要的话,我可以把你送到#b金银岛#k... 你需要支付#b1000#k 金币.\r\n"+display);
		} else if(status == 1) {
                        if(cm.getMeso() < 1000) {
				cm.sendNext("额..你确定你有#b1000#k金币吗?");
				cm.dispose();
			} else {
				cm.gainMeso(-1000);
				cm.warp(200090031);
				cm.dispose();
                        }
                }
	}
}