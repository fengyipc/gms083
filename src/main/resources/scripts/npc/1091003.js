/*
	Serryl (1091003)
	Location: The Nautilus
*/

/**
	Author: xQuasar
*/

function start() {
	cm.getPlayer().setCS(true);
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
		status++;
	else
		cm.dispose();
	if (status == 0 && mode == 1) {
		var selStr = "什么?你想要自己制作武器和手套? 认真的说... 对于完全没有经验的你来说这基本不可能... 但我会帮你的. 我已经做了20年海盗, 这期间我做了许多.对我来说很简单.";
		var options = new Array("制作拳甲","制作短枪","制作手套");
		for (var i = 0; i < options.length; i++){
			selStr += "\r\n#b#L" + i + "# " + options[i] + "#l#k";
		}
			
		cm.sendSimple(selStr);
	}
	else if (status == 1 && mode == 1) {
		selectedType = selection;
		if (selectedType == 0){ //Making a Knuckler
			var selStr = "你只要带来我需要的材料,我就可以给你制作一个拳甲,要试试吗?";
			//1482001, 1482002, 1482003, 1482004, 1482005, 1482006, 1482007
			var knucklers = new Array("#z1482001# Lv.15", "#z1482002# Lv.20", "#z1482003# Lv.25", "#z1482004# Lv.30", "#z1482005# Lv.35", "#z1482006# Lv.40", "#z1482007# Lv.50");
			for (var i = 0; i < knucklers.length; i++){
				selStr += "\r\n#b#L" + i + "# " + knucklers[i] + "#l#k";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		else if (selectedType == 1){ //Making a Gun
			var selStr = "你只要带来我需要的材料,我就可以给你制作一个短枪,要试试吗?";
			var guns = new Array("#z1492001# Lv.15", "#z1492002# Lv.20", "#z1492003# Lv.25", "#z1492004# Lv.30", "#z1492005# Lv.35", "#z1492006# Lv.40", "#z1492007# Lv.50");
			for (var i = 0; i < guns.length; i++){
				selStr += "\r\n#b#L" + i + "# " + guns[i] + "#l#k";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		else if (selectedType == 2){ //Making a pair of pirate gloves
			var selStr = "你只要带来我需要的材料,我就可以给你制作一双手套,要试试吗?";
			//"#z1082180#", "#z1082183#", "#z1082186#", "#z1082189#", "#z1082192#", "#z1082195#", "#z1082198#", "#z1082201"
			var gloves = new Array ("#z1082180#", "#z1082183#", "#z1082186#", "#z1082189#", "#z1082192#", "#z1082195#", "#z1082198#", "#z1082201#");
			for (var i = 0; i < gloves.length; i++){
				selStr += "\r\n#b#L" + i + "# " + gloves[i] + "#l#k";
			}
			equip = true;
			cm.sendSimple(selStr);
		}
		if (equip)
			status++;
	}
	else if (status == 3 && mode == 1) {
		if (equip)
		{
			selectedItem = selection;
			qty = 1;
		}
		else
			qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);

		if (selectedType == 0){ //Making a Knuckler
			var itemSet = new Array(1482001, 1482002, 1482003, 1482004, 1482005, 1482006, 1482007);
			var matSet = new Array(4000021, new Array(4011001,4011000,4000021,4003000), new Array(4011000,4011001,4003000), new Array(4011000,4011001,4000021,4003000), new Array(4011000,4011001,4000021,4003000), new Array(4011000,4011001,4021000,4000021,4003000), new Array(4000039,4011000,4011001,4000030,4000021,4003000));
			var matQtySet = new Array(20, new Array(1,1,10,5), new Array(2,1,10), new Array(1,1,30,10), new Array(2,2,30,20), new Array(1,1,2,50,20), new Array(150,1,2,20,20,20));
			var costSet = new Array(1000,2000,5000,15000,30000,50000,100000);
			var levelLimitSet = new Array(15,20,25,30,35,40,50);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
			levelLimit = levelLimitSet[selectedItem];
		}
		else if (selectedType == 1){ //Making a Gun
			var itemSet = new Array(1492001, 1492002, 1492003, 1492004, 1492005, 1492006, 1492007);
			var matSet = new Array(new Array(4011000,4003000,4003001), new Array(4011000,4003000,4003001,4000021), new Array(4011000,4003000), new Array(4011001,4000021,4003000), new Array(4011006,4011001,4000021,4003000), new Array(4011004,4011001,4000021,4003000), new Array(4011006,4011004,4011001,4000030,4003000));
			var matQtySet = new Array(new Array(1,5,1), new Array(1,10,5,10), new Array(2,10), new Array(2,10,10), new Array(10,2,5,10), new Array(1,2,10,20), new Array(1,2,4,30,30));
			var costSet = new Array (1000,2000,5000,15000,30000,50000,100000);
			var levelLimitSet = new Array(15,20,25,30,35,40,50);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
			levelLimit = levelLimitSet[selectedItem];
		}
		else if (selectedType == 2){ //Making a pair of pirate gloves
			var itemSet = new Array(1082180, 1082183, 1082186, 1082189, 1082192, 1082195, 1082198, 1082201);
			var matSet = new Array(new Array(4000021,4021003),4000021,new Array(4011000,4000021),new Array(4021006,4000021,4003000),new Array(4011000,4000021,4003000),new Array(4000021,4011000,4011001,4003000),new Array(4011000,4000021,4000030,4003000),new Array(4011007,4021008,4021007,4000030,4003000));
			var matQtySet = new Array(new Array(15,1),35,new Array(2,20),new Array(2,50,10),new Array(3,60,15),new Array(80,3,3,25),new Array(3,20,40,30),new Array(1,1,1,50,50));
			var costSet = new Array(1000,8000,15000,25000,30000,40000,50000,70000);
			var levelLimitSet = new Array(15,20,25,30,35,40,50,60);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
			levelLimit = levelLimitSet[selectedItem];
		}
			
		prompt = "制作一个#t" + item + "#需要以下道具:\r\n";
		
		if (mats instanceof Array){
			for(var i = 0; i < mats.length; i++){
				prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
			}
		}
		else {
			prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
		}
		
		if (cost > 0)
			prompt += "\r\n#i4031138# " + cost * qty + "金币";
		
		cm.sendYesNo(prompt);
	}
	else if (status == 4 && mode == 1) {
		var pass = true;

                if(!cm.canHold(item)) {
                    cm.sendOk("检查你背包是不是满了.");
                    cm.dispose();
                    return;
                }
		else if (cm.getMeso() < cost * qty)
			{
				cm.sendNext("检查你有全部的材料,金币够不够.同时看看装备栏是不是满了.");
                                cm.dispose();
                                return;
			}
		else
			{
                            if (mats instanceof Array) {
                                for(var i = 0; pass && i < mats.length; i++)
                                    if (!cm.haveItem(mats[i], matQty[i] * qty))
                                        pass = false;
                            }
                            else if (!cm.haveItem(mats, matQty * qty))
                                pass = false;
				/*if (mats instanceof Array) {
					for(var i = 0; pass && i < mats.length; i++)
					{
						if (matQty[i] * qty == 1)	{
							if (!cm.haveItem(mats[i]))
							{
								pass = false;
							}
						}
						else {
							var count = 0;
							var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats[i]).iterator();
							while (iter.hasNext()) {
								count += iter.next().getQuantity();
							}
							if (count < matQty[i] * qty)
								pass = false;
						}					
					}
				}
				else {
					var count = 0;
					var iter = cm.getChar().getInventory(MapleInventoryType.ETC).listById(mats).iterator();
					while (iter.hasNext()) {
						count += iter.next().getQuantity();
					}
					if (count < matQty * qty)
						pass = false;
				}
                                */
			}
			
			if (pass == false) 
				cm.sendNext("检查你有全部的材料,金币够不够.同时看看装备栏是不是满了.");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++){
						cm.gainItem(mats[i], -matQty[i] * qty);
					}
				}
				else
					cm.gainItem(mats, -matQty * qty);
					
				if (cost > 0)
					cm.gainMeso(-cost * qty);
				
				if (item == 4003000)//screws
					cm.gainItem(4003000, 15 * qty);
				else
					cm.gainItem(item, qty);
				cm.sendOk("做好了.");
			}
		cm.dispose();
	}
}