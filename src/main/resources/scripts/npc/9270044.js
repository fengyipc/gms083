/**
 *9270044 - Professor Foxwit
 *@author Ronan
 */
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

        if (status == 0) {
            if (cm.getPlayer().getMap().getId() == 540020100) {
                cm.sendYesNo("要进入废墟吗?");
            } else {
                cm.sendOk("新叶城的巡逻队随时准备好。没有生物能闯入这座城市。");
                cm.dispose();
            }
        }else{
            cm.warp(541020000,5);
            cm.dispose();
        }
    }
}