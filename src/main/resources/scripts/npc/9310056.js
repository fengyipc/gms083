var status;
var letter = Array("A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");
function start() {
	status = -1;
	action(1, 0, 0);
}
function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		if (status == 0) {
			cm.dispose();
		}
		status--;
	}
	if (status == 0) {
		cm.sendSimple("#b#L0#回答问题。#l\r\n#L1#离开地图。#l");
	} else if (status == 1) {
		if (selection == 0) {
			if (!cm.isLeader() || cm.getPlayer().getEventInstance() == null) {
				cm.sendOk("请找队长来找我谈话。");
			} else {
				//calculate letters needed
				var letters = cm.getPlayer().getEventInstance().getProperty("answer");
				var needed = Array(letters.length);
				var done = 0;
				for (var i = 0; i < letters.length(); i++) {
					for (var x = 0; x < letter.length; x++) {
						if (letters.substring(i, i + 1).equals(letter[x])) {
							needed[i] = 3994059 + x;
							break;
						}
					}
				}
				var inv = cm.getPlayer().getInventory(3);
				for (var i = 1; i < 97; i++) {
					if (inv.getItem(i) != null && inv.getItem(i).getItemId() >= 3994059 && inv.getItem(i).getItemId() <= 3994084) {
						done++;
					}
				}
				var correctCount = 0;
				var numCount = 0;
				for (var i = 0; i < needed.length; i++) {
					if (inv.getItem(i + 1) != null && inv.getItem(i + 1).getItemId() == needed[i])
						correctCount++;
					var num = 0;
					for (var x = 0; x < needed.length; x++) {
						if (needed[x] == needed[i]) {
							num++;
						}
					}
					if (cm.getPlayer().haveItem(needed[i], num)) {
						numCount++;
					}
				}
				if (done != needed.length) {
					cm.sendOk("收集到字母的数量不对");
				} else if (correctCount < needed.length) {
					cm.sendNext("#e错误的答案！#n有" + (needed.length - correctCount) + "个字母放错了位置,还差" + (needed.length - numCount) + "个正确的字母");
				} else { //correct
					for (var i = 3994059; i < 3994085; i++) {
						cm.removePartyItems(i);
					}
					switch (cm.getPlayer().getEventInstance().getIntProperty("mode")) {
						case 0: cm.givePartyItems(2101000, 1, cm.getPlayer().getPartyMembersOnSameMap());
							break;
						case 1: cm.givePartyItems(2101003, 1, cm.getPlayer().getPartyMembersOnSameMap());
							break;
						case 2: cm.givePartyItems(2101001, 1, cm.getPlayer().getPartyMembersOnSameMap());
							break;
					}
					cm.givePartyItems(4001137, 1, cm.getPlayer().getPartyMembersOnSameMap());
					cm.warpParty(702090400, 0);
					cm.showEffect(true, "englishSchool/correct");
				}
			}
		} else if (selection == 1) {
			for (var i = 3994059; i < 3994085; i++) {
				cm.removeAll(i);
			}
			cm.warp(702090400, 0);
		}
		cm.dispose();
	}
}