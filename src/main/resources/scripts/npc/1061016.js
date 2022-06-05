var status = -1;
var itemids = Array(2040728, 2040729, 2040730, 2040731, 2040732, 2040733, 2040734, 2040735, 2040736, 2040737, 2040738, 2040739);

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 0) {
		cm.sendSimple("你好, #h0#.如果你有#e#r#z4001261##k#n,可以找我换#z1072375#的专用卷轴.\r\n\r\n#r#L1#让我看看#l#k");
	} else if (status == 1) {
		var selStr = "好的.一个#z4001261#可以换一个...\r\n\r\n#b";
		for (var i = 0; i < itemids.length; i++) {
			selStr += "#L" + i + "##i" + itemids[i] + "##z" + itemids[i] + "##l\r\n";
		}
		cm.sendSimple(selStr);
	} else if (status == 2) {
		if (!cm.canHold(itemids[selection], 1)) {
			cm.sendOk("背包空间不足");
		} else if (!cm.haveItemWithId(4001261)) {
			cm.sendOk("你没有足够的#z4001261#.");
		} else {
			cm.gainItem(4001261, -1);
			cm.gainItem(itemids[selection], 1);
			cm.sendOk("给你");
		}
		cm.dispose();
	}
}