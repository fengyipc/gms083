/**
----------------------------------------------------------------------------------
	Whale Between Lith harbor and Rien.

	1200004 Puro

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/

var menu = new Array("Rien");
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
			cm.sendNext("好吧,你如果改变主意了记得找我.");
			cm.dispose();
			return;
		}
		status++;
		if (status == 0) {
                        var display = "";
			for(var i=0; i < menu.length; i++) {
                                display += "\r\n#L"+i+"##b前往里恩(800金币)#k";
                        }
                        cm.sendSimple("你想离开金银岛去寒冷的里恩吗? 支付800金币我带你过去.\r\n"+display);
			
                } else if(status == 1) {
                        if(cm.getMeso() < 800) {
                                cm.sendNext("你没有足够的金币...");
                                cm.dispose();
                        } else {
                                cm.gainMeso(-800);
                                cm.warp(200090060);
                                cm.dispose();
                        }
                }
        }
}