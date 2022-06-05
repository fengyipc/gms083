var status = 0;
var section = 0;
importPackage(java.lang);
//questid 29931, infoquest 7662

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		status--;
	}
	if (status == 1) {
		if (cm.getMapId() == 910320001) {
			cm.warp(910320000, 0);
			cm.dispose();
		} else if (cm.getMapId() == 910330001) {
			var itemid = 4001321;
			if (!cm.canHold(itemid)) {
				cm.sendOk("其他栏空间不足。");
			} else {
				cm.gainItem(itemid, 1);
				cm.warp(910320000, 0);
			}
			cm.dispose();
		} else if (cm.getMapId() >= 910320100 && cm.getMapId() <= 910320304) {
			cm.sendYesNo("你想要离开？？");
			status = 99;
		} else {
			cm.sendSimple("您好，我是#p1052115# 有什么可以帮忙的吗？？\r\n#b#e#L1#进去挑战。#l#n\r\n#L2#火车训练 999.#l\r\n#L3#领取勋章 <#z4001321#>.#l#k");
		}
	} else if (status == 2) {
		section = selection;
		if (selection == 1) {
			if (cm.getPlayer().getLevel() < 25 || cm.getPlayer().getLevel() > 30 || !cm.isLeader()) {
				cm.sendOk("你的需要在25-30级之间,并且是队长.");
			} else {
				if (!cm.start_PyramidSubway(-1)) {
					cm.sendOk("里面有人了.");
				}
			}
			//todo
		} else if (selection == 2) {
			if (cm.haveItem(4001321)) {
				if (cm.bonus_PyramidSubway(-1)) {
					cm.gainItem(4001321, -1);
				} else {
					cm.sendOk("999号列车现在满员了");
				}
			} else {
				cm.sendOk("你没有登陆证明.");
			}
		} else if (selection == 3) {
			var record = cm.getQuestRecord(7662);
			var data = record.getCustomData();
			if (data == null) {
				record.setCustomData("0");
				data = record.getCustomData();
			}
			var mons = parseInt(data);
			if (mons < 10000) {
				cm.sendOk("至少击杀10000怪物才可以找我领取勋章. 当前击杀数量 : " + mons);
			} else if (cm.canHold(1142141) && !cm.haveItem(1142141)) {
				cm.gainItem(1142141, 1);
				cm.startQuest(29931);
				cm.completeQuest(29931);
			} else {
				cm.sendOk("背包空间不足.");
			}
		}
		cm.dispose();
	} else if (status == 100) {
		cm.warp(910320000, 0);
		cm.dispose();
	}
}