var status = -1;
var exchangeItem = 4000439;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendSimple("我是#p2131001#,我是这一代最厉害的魔法师.#b\r\n#L0#嘿,把这些#z4000439#拿去,你可以利用它们施展魔法.#l");
    } else if (status == 1) {
	if (!cm.haveItem(exchangeItem, 100)) {
	    cm.sendNext("你没有足够的#z4000439#... 我需要至少100个.");
	    cm.dispose();
	} else {
            // thanks yuxaij for noticing a few methods having parameters not matching the expected Math library function parameter types
	    cm.sendGetNumber("哇, 好主意!我用#i4310000#换100个#i" + exchangeItem + "##t" + exchangeItem + "#.你想换多少个? (兑换: " + cm.itemQuantity(exchangeItem) + ")", Math.min(300, cm.itemQuantity(exchangeItem) / 100), 1, Math.min(300, cm.itemQuantity(exchangeItem) / 100));
	}
    } else if (status == 2) { 
	if (selection >= 1 && selection <= cm.itemQuantity(exchangeItem) / 100) {
	    if (!cm.canHold(4310000, selection)) {
		cm.sendOk("其他栏空间不足.");
	    } else {
		cm.gainItem(4310000, selection);
		cm.gainItem(exchangeItem, -(selection * 100));
		cm.sendOk("谢谢!");
	    }
	}
        cm.dispose();
    }
}