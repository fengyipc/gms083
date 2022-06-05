/*
 ZEVMS冒险岛(079)游戏服务端
 脚本：蜈蚣
 */

 
var 羊毛数量 = 50;
var 羊毛 = 4000194;

function start() {
    status = -1;
    action(1, 0, 0)
}

function action(mode, type, selection) {
    if (status <= 0 && mode <= 0) {
        cm.dispose();
        return
    }
    if (mode == 1) {
        status++
    } else {
        status--
    }

    if (status <= 0) {
        var selStr = "    Hi~#b#h ##k，我需要 50 个 #i"+羊毛+"# 才能让你通过！不过你觉得你有实力挑战里面的怪物吗？\r\n";
        selStr += "#b#L1#进入通道#l\r\n";
        selStr += "#L2#退出黑羊的领地#l";
        cm.sendSimple(selStr)
    } else if (status == 1) {
        switch (selection) {
            case 1:
                if (cm.haveItem(羊毛, 羊毛数量)) {
                    cm.gainItem(羊毛, -羊毛数量);
                    cm.warp(701010322, 0);
                    cm.dispose();
                } else {
                    cm.sendOk("请给我 #b"+羊毛数量+"#k 个 #i"+羊毛+"# 。");
                    cm.dispose();

                }
                break;
            case 2:
				cm.warp(701010320,0);
                cm.dispose();
                break;

        }
    }
}