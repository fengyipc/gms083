var status = 0;
var maps = [100000000, 102000000, 101000000, 103000000, 120000000];
var cost = [1000, 1000, 800, 1000, 800];
var selectedMap = -1;
var mesos;

function start() {
	if (cm.hasItem(4032313,1)) {
		cm.sendNext("我看到你有张优惠券可以去射手村。等一下，我马上带你过去！");
	} else {
		cm.sendNext("你好,我是巴士司机.如果你想安全快捷地从一个镇到另一个镇，那就坐我们的出租车吧。我们很乐意以实惠的价格带您去目的地。");
	}
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status >= 2 && mode == 0) {
            cm.sendNext("这个镇上也有很多有趣的东西。当你需要去另一个城镇时，再回来找我们。");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (cm.hasItem(4032313,1)) {
                cm.gainItem(4032313, -1);
                cm.warp(maps[0], 0);
                cm.dispose();
                return;
            }
            
            var selStr = "";
            if (cm.getJobId() == 0)
                selStr += "我们对新手有优惠。";
            selStr += "选择你的目的地，因为费用会因地而异。#b";
            for (var i = 0; i < maps.length; i++)
                selStr += "\r\n#L" + i + "##m" + maps[i] + "# (" + (cm.getJobId() == 0 ? cost[i] / 10 : cost[i]) + "金币)#l";
            cm.sendSimple(selStr);
        } else if (status == 2) {
            cm.sendYesNo("你没别的事要做了吧？你想去#b#m" + maps[selection] + "##k?需要支付#b"+ (cm.getJobId() == 0 ? cost[selection] / 10 : cost[selection]) + "金币#k.");
            selectedMap = selection;
        } else if (status == 3) {
            if (cm.getJobId() == 0) {
            	mesos = cost[selectedMap] / 10;
            } else {
            	mesos = cost[selectedMap];
            }
            
            if (cm.getMeso() < mesos) {
                cm.sendNext("你没有足够的金币。很抱歉这么说，但是没有，你就不能坐出租车了。");
                cm.dispose();
                return;
            }
            
            cm.gainMeso(-mesos);
            cm.warp(maps[selectedMap], 0);
            cm.dispose();
        }
    }
}