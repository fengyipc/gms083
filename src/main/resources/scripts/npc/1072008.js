/**
	Author: xQuasar
	NPC: Kyrin - Pirate Job Advancer
	Inside Test Room
**/

var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if(status == 0) {
            if (cm.getMapId() == 108000502) {
                if (!(cm.haveItem(4031856,15))) {
                    cm.sendSimple("你还没把所有的水晶都给我。我期待你的进步，伙计！\r\n#b#L1#我想离开#l");
                } else {
                    status++;
                    cm.sendNext("哇，你给我带来了15个#b#t4031856##k!祝贺你。让我把你弄出来。");
                }
            } else if (cm.getMapId() == 108000501) {
                if (!(cm.haveItem(4031857,15))) {
                    cm.sendSimple("你还没把所有的水晶都给我。我期待你的进步，伙计！\r\n#b#L1#我想离开#l");
                } else {
                    status++;
                    cm.sendNext("哇，你给我带来了15个#b#t4031857##k!祝贺你。让我把你弄出来。");
                }
            } else {
                cm.sendNext("错误。请报告这个问题。");
                cm.dispose();
            }
        } else if (status == 1) {   // thanks Lame for noticing players getting stuck in area in certain scenarios
            cm.removeAll(4031856);
            cm.removeAll(4031857);
            cm.warp(120000101,0);
            cm.dispose();
        } else if (status == 2) {
            cm.warp(120000101,0);
            cm.dispose();
        }
    }
}
