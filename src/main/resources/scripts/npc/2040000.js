var cost = 6000;
var status = 0;

function start() {
    cm.sendYesNo("你好, 我在这里出售前往天空之城的船票. 去往天空之城的飞船10分钟一趟,费用是#b"+cost+"金币#k. 要购买#b#t4031045##k吗?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 1)
            status++;
        if(mode == 0) {
            cm.sendNext("你在这里还有没做完的事情对吗?");
            cm.dispose();
            return;
        }
        if(status == 1) {
            if(cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
            } else
                cm.sendOk("你的金币不够.");
            cm.dispose();
        }
    }
}
