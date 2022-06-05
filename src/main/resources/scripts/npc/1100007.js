/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100007 Kiriru (Victoria Island Station to Ereve)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Ereve");
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
			cm.sendNext("如果想改变主意,请跟我说...");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
			var display = "";
                        for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b圣地(1000金币)#k";
                        }			
                        cm.sendSimple("要去圣地吗?只需要支付#b1000金币#k\r\n"+display);
			
		} else if(status == 1) {
		 if(cm.getMeso() < 1000) {
				cm.sendNext("你好像没有这么多钱...");
				cm.dispose();
			} else {
				cm.gainMeso(-1000);
				cm.warp(200090030);
				cm.dispose();
				}
			}
		}
}