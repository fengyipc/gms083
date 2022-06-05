/**
----------------------------------------------------------------------------------
	Skyferry Between Victoria Island, Ereve and Orbis.

	1100004 Kiru (To Orbis)

        Credits to: MapleSanta 
----------------------------------------------------------------------------------
**/
var menu = new Array("Orbis");
var method;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if (mode == 0) {
            cm.sendNext("好吧.如果想改变主意了,来找我.");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            var display = "";
            for (var i = 0; i < menu.length; i++) {
                display += "\r\n#L" + i + "##b 天空之城(1000金币)#k";
            }
            cm.sendSimple("嗯... 风向是对的.你想离开圣地去别的地方吗?这个航班是从圣地通往天空之城的,你在圣地的事情已经做完了吗?如果你想去#b天空之城#k,我可以送你过去.要出发吗?\r\n" + display);

        } else if (status == 1) {
            if (cm.getMeso() < 1000) {
                cm.sendNext("额... 你好像没有1000金币...");
                cm.dispose();
            } else {
                cm.gainMeso(-1000);
                cm.warp(200090021);
                cm.dispose();
            }
        }
    }
}