/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Muhammad
	Map(s): 		Ariant:The Town of Ariant(260000200)
	Description: 	Jewel Refiner
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode <= 0 && status == 0) {
		cm.sendNext("如果你不着急的话，请稍后再来。如你所见，现在有很多工作要做，我不可能按时交给你。");
		cm.dispose();
		return;
	}
	if (mode <= 0 && status >= 1) {
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;

	if (status == 0)
		cm.sendYesNo("你是来炼制矿石还是珠宝？不管你有多少矿石，如果你没有像我这样的大师炼制，他们就看不到光明。你觉得呢，你现在想改进一下吗？");
	if (status == 1 && mode == 1) {
		var selStr = "我喜欢你的态度!我们直接开始我们的事情吧.你想让我帮你锻造什么样的矿石? #b";
		var options = new Array("冶炼金属矿石", "冶炼珠宝", "冶炼水晶", "升级珠宝");
		for (var i = 0; i < options.length; i++) {
			selStr += "\r\n#L" + i + "# " + options[i] + "#l";
		}
		cm.sendSimple(selStr);
	}
	else if (status == 2 && mode == 1) {
		selectedType = selection;

		if (selectedType == 0) { //mineral refine
			var selStr = "要冶炼什么矿石?#b";
			var itemSet = new Array(4011000, 4011001, 4011002, 4011003, 4011004, 4011005, 4011006, 4011008);
			//var minerals = new Array ("Bronze Plate","Steel Plate","Mithril Plate","Adamantium Plate","Silver Plate","Orihalcon Plate","Gold Plate","Lithium");
			for (var i = 0; i < itemSet.length; i++) {
				selStr += "\r\n#L" + i + "##z" + itemSet[i] + "##l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
		else if (selectedType == 1) { //jewel refine
			var selStr = "要制作什么宝石?#b";
			var itemSet = new Array(4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008);
			//var jewels = new Array ("Garnet","Amethyst","Aquamarine","Emerald","Opal","Sapphire","Topaz","Diamond","Black Crystal");
			for (var i = 0; i < itemSet.length; i++) {
				selStr += "\r\n#L" + i + "##z" + itemSet[i] + "##l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
		else if (selectedType == 2) { //Crystal refine
			var selStr = "水晶? 那是贵重物品.别担心, 我一样能胜任.想要锻造什么水晶? #b";
			//var crystals = new Array("Power Crystal","Wisdom Crystal","DEX Crystal","LUK Crystal");
			var itemSet = new Array(4005000, 4005001, 4005002, 4005003);
			for (var i = 0; i < itemSet.length; i++) {
				selStr += "\r\n#L" + i + "##z" + itemSet[i] + "##l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
		else if (selectedType == 3) {//锻造珠宝
			var selStr = "需要高级珠宝啊? 我可以帮你,如果你有更高级锻造技能的话可能会锻造出更高级的珠宝哟\r\n看看你要用什么原材料吧\r\n";
			var itemSet = new Array(4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008, 4005000, 4005001, 4005002, 4005003,4005004);
			for (var i = 0; i < itemSet.length; i++) {
				selStr += "#L" + itemSet[i] + "##v" + itemSet[i] + "##l";
			}
			cm.sendSimple(selStr);
			equip = false;
		}
	}
	else if (status == 3 && mode == 1) {
		selectedItem = selection;

		if (selectedType == 0) { //mineral refine
			var itemSet = new Array(4011000, 4011001, 4011002, 4011003, 4011004, 4011005, 4011006, 4011008);
			var matSet = new Array(4010000, 4010001, 4010002, 4010003, 4010004, 4010005, 4010006, 4010007);
			var matQtySet = new Array(10, 10, 10, 10, 10, 10, 10, 10);
			var costSet = new Array(270, 270, 270, 450, 450, 450, 720, 270);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 1) { //jewel refine
			var itemSet = new Array(4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008);
			var matSet = new Array(4020000, 4020001, 4020002, 4020003, 4020004, 4020005, 4020006, 4020007, 4020008);
			var matQtySet = new Array(10, 10, 10, 10, 10, 10, 10, 10, 10);
			var costSet = new Array(450, 450, 450, 450, 450, 450, 450, 900, 2700);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		}
		else if (selectedType == 2) { //Crystal refine
			var itemSet = new Array(4005000, 4005001, 4005002, 4005003);
			var matSet = new Array(4004000, 4004001, 4004002, 4004003);
			var matQtySet = new Array(10, 10, 10, 10);
			var costSet = new Array(4500, 4500, 4500, 4500);
			item = itemSet[selectedItem];
			mats = matSet[selectedItem];
			matQty = matQtySet[selectedItem];
			cost = costSet[selectedItem];
		} else if (selectedType == 3) {//锻造珠宝
			var a = cm.getPlayer().getSkillLevel(10001007);
			var b = cm.getPlayer().getSkillLevel(20001007);
			var c = cm.getPlayer().getSkillLevel(1007);
			var 锻造等级 = Math.max(a,Math.max(b,c));
			var text = "要使用#z" + selection + "#进行升级?你当前锻造等级为#r" + 锻造等级 + "#k,"
			if (锻造等级 == 3) {
				text += "\r\n升级将会有#r5%#k机会获得高级珠宝,#r25%#k机会获得中级珠宝,#r70%#k几率获得下级珠宝";
			} else if (锻造等级 == 2) {
				text += "\r\n升级将会有#r15%#k机会获得中级珠宝,#r85%#k几率获得下级珠宝";
			} else {
				text += "\r\n升级将会获得下级珠宝";
			}
			text += "\r\n每消耗一个材料我要收取10万金币手续费,要升级多少个?";
			cm.sendGetNumber(text, 1, 1, 100);
			return;
		}
		var prompt = "那么,你是想制作#t" + item + "#?要做多少呢?";
		cm.sendGetNumber(prompt, 1, 1, 100)
	}

	else if (status == 4 && mode == 1) {
		if (selectedType == 3) {
			var itemSet = new Array(4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008, 4005000, 4005001, 4005002, 4005003,4005004);
			var gainSet = new Array(4250200, 4250400, 4250500, 4250700, 4250300, 4250100, 4250600, 4250000, 4251300, 4250800, 4250900, 4251100, 4251000,4251400);
			var index = -1;
			for (var i = 0; i < itemSet.length; i++) {
				if (selectedItem == itemSet[i]) {
					index = i;
					break;
				}
			}
			var a = cm.getPlayer().getSkillLevel(10001007);
			var b = cm.getPlayer().getSkillLevel(20001007);
			var c = cm.getPlayer().getSkillLevel(1007);
			var 锻造等级 = Math.max(a,Math.max(b,c));
			var allGain = new Array(0, 0, 0);
			if (cm.haveItem(selectedItem, selection)) {
				if (cm.getPlayer().getMeso() >= 100000 * selection) {
					if (cm.getPlayer().getInventory(4).isFull(3)) {
						cm.sendOk("请确保其他栏有三格以上的空间");
						cm.dispose();
					} else {
						for (var i = 0; i < selection; i++) {
							cm.gainItem(selectedItem, -1);
							var gain;
							if (锻造等级 == 3) {
								var ran = Math.random();
								if (ran < 0.05)
									gain = gainSet[index] + 2;
								else if (ran < 0.3)
									gain = gainSet[index] + 1;
								else
									gain = gainSet[index];
							} else if (锻造等级 == 2) {
								var ran = Math.random();
								if (ran < 0.15)
									gain = gainSet[index] + 1;
								else
									gain = gainSet[index];
							} else {
								gain = gainSet[index];
							}
							cm.gainItem(gain, 1);
							cm.gainMeso(-100000);
							allGain[gain - gainSet[index]]++;
						}
						var text = "这次使用" + selection + "个#z" + selectedItem + "#升级获得了:\r\n"
						if (allGain[0] > 0)
							text += allGain[0] + "个#z" + gainSet[index] + "#\r\n";
						if (allGain[1] > 0)
							text += allGain[1] + "个#z" + (gainSet[index] + 1) + "#\r\n";
						if (allGain[2] > 0)
							text += allGain[2] + "个#z" + (gainSet[index] + 2) + "#\r\n";
						cm.sendOk(text);
						cm.dispose();
					}
				} else {
					cm.sendOk("你没有足够的金币");
					cm.dispose();
				}
			} else {
				cm.sendOk("你没有那么多#z" + selectedItem + "#");
				cm.dispose();
			}
			return;
		}
		if (equip) {
			selectedItem = selection;
			qty = 1;
		}
		else
			qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);

		var prompt = "你想制作";
		if (qty == 1)
			prompt += "一个#t" + item + "#?";
		else
			prompt += qty + "个#t" + item + "#?";

		prompt += "给我提供这些材料,记得整理一下背包,确保有足够的空间存放你要的东西#b";

		if (mats instanceof Array) {
			for (var i = 0; i < mats.length; i++) {
				prompt += "\r\n#i" + mats[i] + "# " + matQty[i] * qty + " #t" + mats[i] + "#";
			}
		}
		else {
			prompt += "\r\n#i" + mats + "# " + matQty * qty + " #t" + mats + "#";
		}

		if (cost > 0)
			prompt += "\r\n#i4031138# " + cost * qty + "金币";

		cm.sendYesNo(prompt);
	}
	else if (status == 5 && mode == 1) {
		var complete = true;
		var recvItem = item, recvQty;

		if (item >= 2060000 && item <= 2060002) //bow arrows
			recvQty = 1000 - (item - 2060000) * 100;
		else if (item >= 2061000 && item <= 2061002) //xbow arrows
			recvQty = 1000 - (item - 2061000) * 100;
		else if (item == 4003000)//screws
			recvQty = 15 * qty;
		else
			recvQty = qty;

		if (!cm.canHold(recvItem, recvQty)) {
			cm.sendOk("我想你背包放不下更多这种东西了.");
		}
		else if (cm.getMeso() < cost * qty) {
			cm.sendOk("我想你的金币不够支付我的劳动.");
		}
		else {
			if (mats instanceof Array) {
				for (var i = 0; complete && i < mats.length; i++) {
					if (matQty[i] * qty == 1) {
						if (!cm.haveItem(mats[i])) {
							complete = false;
						}
					}
					else {

						if (cm.haveItem(mats[i], matQty[i] * qty)) complete = false;
					}
				}
			}
			else {
				if (!cm.haveItem(mats, matQty * qty)) complete = false;
			}

			if (!complete)
				cm.sendOk("检查下其他栏是不是没有空间了.");
			else {
				if (mats instanceof Array) {
					for (var i = 0; i < mats.length; i++) {
						cm.gainItem(mats[i], -matQty[i] * qty);
					}
				}
				else
					cm.gainItem(mats, -matQty * qty);

				if (cost > 0)
					cm.gainMeso(-cost * qty);

				cm.gainItem(recvItem, recvQty);
				cm.sendOk("做好了,给你. 你觉得怎么样,是不是充满艺术感? 好啦,如果你还有什么需要,你知道在哪里可以找到我.");
			}
		}

		cm.dispose();
	}
}