/*
        @author RMZero213 (RaGEZONE)
	Just keep this header here and don't claim that you made it.
*/

/*
	1032102.js
	Mar the Fairy
	Dragon Evolver
*/

importPackage(Packages.client.inventory);
importPackage(Packages.client.inventory.manipulator);
importPackage(Packages.server);

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
			cm.sendOk("好的,下次见.");
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
                    
		if (status == 0) {
			cm.sendYesNo("我是#p1032102#.如果你有15级以上的进化宠物,我可以帮助你进化.如果运气好的话,可能会得到一只黑龙,要试试吗?");
		} else if (status == 1) {
			if (cm.haveItem(5000028, 1)) {
				cm.gainItem(5000028, -1);
				cm.gainItem(5000029, 1);
				cm.sendOk("我不知道你是怎么得到那只宠物蛋的，但它显然已经孵化了!");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0) == null) {
				cm.sendOk("确定你的宠物装备在第一格.");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0).getItemId() < 5000029 || cm.getPlayer().getPet(0).getItemId() > 5000033 || !cm.haveItem(5380000,1)) {
				cm.sendOk("你不满足要求.你需要#i5380000##t5380000#,以及#d#i5000029##t5000029##k, #g#i5000030##t5000030##k, #r#i5000031##t5000031##k, #b#i5000032##t5000032##k,或者 #e#i5000033##t5000033##n装备到第一格.");
				cm.dispose();
			} else if (cm.getPlayer().getPet(0).getLevel() < 15) {
				cm.sendOk("你的宠物要在15级以上才可以进化");
				cm.dispose();
			} else if (cm.haveItem(5000029,2) || cm.haveItem(5000030,2) || cm.haveItem(5000031,2) || cm.haveItem(5000032,2) || cm.haveItem(5000033,2)) {
				cm.sendSimple("#r#L0#清空现金栏第一格.#l#k\r\n#b#L1#清理背包的第一个宠物.#l#k\r\n#g#L2#不用了,谢谢.#l#k");
			} else {
                                var i;
                            
                                for(i = 0; i < 3; i++) {
                                    if(cm.getPlayer().getPet(i) != null && cm.getPlayer().getPet(i).getItemId() == 5000029) {
                                        pet = cm.getPlayer().getPet(i);
                                        break;
                                    }
                                }
                                if(i == 3) {
                                    cm.sendOk("没有可以进化的宠物或者缺少#b#t5380000##k.");
                                    cm.dispose();
                                    return;
                                }
                            
				var id = cm.getPlayer().getPet(i).getItemId();
				//var name = cm.getPlayer().getPet(i).getName();
				//var level = cm.getPlayer().getPet(i).getLevel();
				//var closeness = cm.getPlayer().getPet(i).getCloseness();
				//var fullness = cm.getPlayer().getPet(i).getFullness();
				//MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
				if (id < 5000029 || id > 5000033) {
					cm.sendOk("出错了.");
					cm.dispose();
				}
				var rand = 1 + Math.floor(Math.random() * 10);
				var after = 0;
				if (rand >= 1 && rand <= 3) {
					after = 5000030;
				} else if (rand >= 4 && rand <= 6) {
					after = 5000031;
				} else if (rand >= 7 && rand <= 9) {
					after = 5000032;
				} else if (rand == 10) {
					after = 5000033;
				} else {
					cm.sendOk("出错了.");
					cm.dispose();
				}
				
                                /*if (name.equals(MapleItemInformationProvider.getInstance().getName(id))) {
				 	name = MapleItemInformationProvider.getInstance().getName(after);
				}*/
                
				cm.gainItem(5380000, -1);
				cm.evolvePet(i, after);
                                
				cm.sendOk("你的宠物进化了!!曾经的#i" + id + "# #t" + id + "#变成了#i" + after + "# #t" + after + "#!");
				cm.dispose();
			}
		} else if (status == 2) {
			if (selection == 0) {
				MapleInventoryManipulator.removeFromSlot(cm.getClient(), MapleInventoryType.CASH, 1, 1, true);
				cm.sendOk("现金栏第一格已被清空.");
			} else if (selection == 1) {
				if (cm.haveItem(5000029, 2)) {
					cm.gainItem(5000029, -1);
				} else if (cm.haveItem(5000030, 2)) {
					cm.gainItem(5000030, -1);
				} else if (cm.haveItem(5000031, 2)) {
					cm.gainItem(5000031, -1);
				} else if (cm.haveItem(5000032, 2)) {
					cm.gainItem(5000032, -1);
				} else if (cm.haveItem(5000033, 2)) {
					cm.gainItem(5000033, -1);
				}
				cm.sendOk("背包第一格宠物被清空了.");
			} else if (selection == 2) {
				cm.sendOk("好的，下次再来~");
			}
			cm.dispose();
		}
	}
}