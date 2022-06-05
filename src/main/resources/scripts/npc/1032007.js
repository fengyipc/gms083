var status = 0;
var cost = 5000;

function start() {
    cm.sendYesNo("你好,我是魔法密林-天空之城飞船售票员.去天空之城的航班15分钟一趟,船票是#b"+cost+"金币#k.要购买#b#t4031045##k吗?");
}

function action(mode, type, selection) {
    if(mode == -1)
        cm.dispose();
    else {
        if(mode == 0) {
            cm.sendNext("在这里还有没完成的事情对吗?");
            cm.dispose();
            return;
        }
        status++;
        if(status == 1) {
            if (cm.getMeso() >= cost && cm.canHold(4031045)) {
                cm.gainItem(4031045,1);
                cm.gainMeso(-cost);
                cm.dispose();
            } else {
                cm.sendOk("确定你有#b"+cost+"金币#k?如果有的话你的其他栏空间应该满了.");
                cm.dispose();
            }
        }
    }
}
