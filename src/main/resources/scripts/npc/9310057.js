var rewards = Array(2000005, 1140001, 1141001, 2100005, 2100006, 2100007, 2100008, 2101000, 2101001);//物品代码
var expires = Array(-1, 10, 30, 30, 30, 30, 30, 60, 60);//时间
var quantity = Array(5, 1, 1, 1, 1, 1, 1, 1, 1);//数量
var needed = Array(30, 60, 60, 25, 30, 35, 40, 45, 50, 55);//需要物品的数量
var gender = Array(2, 0, 1, 2, 2, 2, 2, 2, 2);//性别
var timeLimit = 5;
var status;
var map;

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
	/*if (status == 0) {
		for (var i = 1442070; i < 1442088; i++) {
		cm.removeAll(i);
	}*/
	switch (cm.getPlayer().getMapId()) {
		case 100000000:
		case 101000000:
		case 102000000:
		case 103000000:
		case 104000000:
		case 120000000:
		case 211000000:
		case 250000000:
		case 220000000:
		case 200000000:
		case 261000000:
		case 500000000:
		case 600000000:
		case 680000000:
		case 701000100:
		case 702000000:
		case 740000000:
		case 741000000:
		case 742000000:
		case 800000000:
			if (status == 0) {
				cm.sendSimple("你好，我是英语村的#b蘑菇博士 !\r\n\r\n#L0#我要前往英语村#l\r\n#L1#我想兑换物品#l\r\n#L2#什么是英语村?#l");
			} else if (status == 1) {
				if (selection == 0) {
					cm.getPlayer().saveLocation("ENGLISH");
					cm.warp(702090400, 0);
					cm.dispose();
				} else if (selection == 1) {
					var selStr = "\r\n\r\n#b";
					for (var i = 0; i < rewards.length; i++) {
						if (rewards[i] == 1141001 && cm.getPlayer().isMale())
							continue;
						if (rewards[i] == 1140001 && !cm.getPlayer().isMale())
							continue;
						selStr += "#L" + i + "#兑换#v" + rewards[i] + "##t" + rewards[i] + "# x " + quantity[i] + " #r(" + needed[i] + " 优秀印章)#b#l\r\n";
					}
					cm.sendSimple(selStr);
				} else if (selection == 2) {
					cm.sendNext("#b[英语村]#k \r\n初级，中级和高级3个难度供大家选择。其中初级组长去交答案的时候那英语老师会奖励蘑菇王召唤包，中级奖励白雪人和孤单企鹅王召唤包，高级则奖励蝙蝠魔召唤包!\r\n\r\n#r#e注意:#n\r\n英语村副本每天可以进入" + timeLimit + "次,不区分难度");
					cm.dispose();
				}
			} else if (status == 2) {
				if (!cm.haveItem(4001137, needed[selection])) {
					cm.sendNext("您没有#b#t4001137##k");
				} else if (!cm.canHold(rewards[selection], 1)) {
					cm.sendNext("请空出一些空间。");
				} else {
					cm.gainItem(4001137, -needed[selection]);
					cm.gainItem(rewards[selection], quantity[selection]);

				}
				cm.dispose();
			}
			break;
		case 702090400:
			if (status == 0) {
				cm.sendSimple("你好，我是蘑菇博士，欢迎来到#b英语村!\r\n\r\n#L0#前往英语村 - 简单#l\r\n#L1#前往英语村 - 中级#l\r\n#L2#前往英语村 - 困难#l\r\n#L3#我要回去了。#l");
			} else if (status == 1) {
				if (selection == 0 || selection == 1 || selection == 2) {
					if (cm.getPlayer().getParty() == null || !cm.isLeader()) {
						cm.sendOk("队长必须在这里。");
					} else {
						var party = cm.getPlayer().getParty().getMembers();
						var mapId = cm.getPlayer().getMapId();
						var next = true;
						var size = 0;
						var it = party.iterator();
						while (it.hasNext()) {
							var cPlayer = it.next();
							var ccPlayer = cm.getPlayer().getMap().getCharacterById(cPlayer.getId());
							if (ccPlayer == null) {
								next = false;
								break;
							}
							size++;
						}
						var em = cm.getEventManager("English" + selection);
						if (em == null) {
							cm.sendOk("请再尝试一次。");
							cm.dispose();
							return;
						}
						if (next && size >= 1) {
							if (em.getInstance("English" + selection) == null) {
								var 次数满足 = true;
								var players = cm.getPlayer().getPartyMembersOnSameMap();
								var cause;
								for (var i = 0; i < players.size(); i++) {
									if (players.get(i).getBossLog(0, "英语村") >= timeLimit) {
										次数满足 = false;
										cause = players.get(i).getName() + "今天剩余挑战次数不足,无法进入"
										break;
									}
								}
								if (!次数满足) {
									cm.sendOk(cause);
									cm.dispose();
									return;
								}
								var eli = em.getEligibleParty(cm.getParty());
								if (eli.size() > 0) {
									if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
										cm.sendOk("另一方已经进入了 #r组队任务#k 在这个频道。请尝试另一个频道，或等待当前的节目结束。");
									} else {
										for (var i = 3994059; i < 3994085; i++) {
											cm.removePartyItems(i);
										}
										for (var i = 0; i < players.size(); i++) {
											players.get(i).setBossLog(0, "英语村");
										}
									}
								} else {
									cm.sendOk("队伍中有玩家不满足入场条件。");
								}
							} else {
								cm.sendOk("已经有另外一个队伍正在挑战了。");
							}
						} else {
							cm.sendOk("队伍成员必须全部在这里。");
						}
					}
				} else if (selection == 3) {
					var map = cm.getPlayer().getSavedLocation("ENGLISH");
					if (map == undefined)
						map = 100000000;
					cm.warp(map, parseInt(Math.random() * 5));
					cm.clearSavedLocation("ENGLISH");
					cm.dispose();
				}
				cm.dispose();
			}
			break;
	}

}