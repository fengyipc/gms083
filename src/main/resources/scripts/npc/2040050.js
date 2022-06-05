/*
	This file is part of the OdinMS Maple Story Server
	Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
					   Matthias Butz <matze@odinms.de>
					   Jan Christian Meyer <vimes@odinms.de>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License version 3
	as published by the Free Software Foundation. You may not use, modify
	or distribute this program under any other version of the
	GNU Affero General Public License.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Eurek the Alchemist - Multiple Place
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var menu = "";
var set;
var makeitem;
var access = true;
var reqitem = new Array();
var cost = 4000;
var toTurn = -1;
var makeditem = new Array(4006000, 4006001);
var reqset = new Array([[[4000046, 20], [4000027, 20], [4021001, 1]],
[[4000025, 20], [4000049, 20], [4021006, 1]],
[[4000129, 15], [4000130, 15], [4021002, 1]],
[[4000074, 15], [4000057, 15], [4021005, 1]],
[[4000054, 7], [4000053, 7], [4021003, 1]]],

	[[[4000046, 20], [4000027, 20], [4011001, 1]],
	[[4000014, 20], [4000049, 20], [4011003, 1]],
	[[4000132, 15], [4000128, 15], [4011005, 1]],
	[[4000074, 15], [4000069, 15], [4011002, 1]],
	[[4000080, 7], [4000079, 7], [4011004, 1]]]);

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1 || (mode == 0 && (status == 1 || status == 2))) {
		cm.dispose();
		return;
	}
	if (mode == 0) {
		cm.sendNext("还没得到需要的材料吧? 但以后随时有材料就给我吧。打猎,购买等等，得到道具的办法有多种。");
		cm.dispose();
	}
	if (mode == 1) {
		status++;
	}
	if (status == 0) {
		cm.sendNext("好吧，把青蛙的舌头和松鼠的牙齿混合起来。。。哦，是的！忘了放些亮晶晶的白色粉末！！伙计，那可能真的很糟糕。。。哇哦！！你在那儿站了多久了？我可能对我的工作有点忘乎所以。。。呵呵。");
	} else if (status == 1) {
		cm.sendSimple("如你所见，我只是一个旅行的炼金术士。我可能在训练，但我仍然可以做一些你可能需要的东西。你想看看吗？\r\n\r\n#L0##b制作魔法石#k#l\r\n#L1##b制作召回石#k#l\r\n#L2##b炼金术#k#l");
	} else if (status == 2) {
		set = selection;
		if (set < 2) {
			makeitem = makeditem[set];
			for (i = 0; i < reqset[set].length; i++) {
				menu += "\r\n#L" + i + "##b使用#t" + reqset[set][i][0][0] + "#和#t" + reqset[set][i][1][0] + "##k制作#l";
			}
			cm.sendSimple("哈哈... #b#t" + makeitem + "##k是只有我能制作的神秘的石头. 很多冒险家在使用非常强的技能时好像需要用到。有五种方法制作#t" + makeitem + "#.你想怎么制作?" + menu);
		} else {
			var text = "#b物质转换器可以进行同类别物品之间的转换,原材料将会变成随机的其他同类型材料,也有可能不发生任何变化,支持锻造用的促进剂,矿石,宝石,魔法粉末,当然,这种炼金术#e#r会损耗一部分材料#n#b,就算这样还要进行操作吗?\r\n#r请选择你想用来转换的材料:\r\n"
			var 可转 = false;
			var inv = cm.getPlayer().getInventory(4);
			for (var i = 1; i < 97; i++) {
				var item = inv.getItem(i);
				if (item != null && item.getQuantity() > 1) {
					var id = item.getItemId();
					if ((id >= 4130000 && id < 4130023) || (id >= 4007000 && id < 4007008) || (id >= 4010000 && id < 4010008) || (id >= 4020000 && id < 4020009)) {//促进剂
						text += "#L" + item.getItemId() + "##i" + item.getItemId() + "#";
						可转 = true;
					}
				}
			}
			if (可转) {
				cm.sendSimple(text);
			} else {
				cm.sendOk("你身上没有可以用来转化的道具,道具至少需要两个");
				cm.dispose();
			}
		}
	} else if (status == 3) {
		if (set < 2) {
			set = reqset[set][selection];
			reqitem[0] = new Array(set[0][0], set[0][1]);
			reqitem[1] = new Array(set[1][0], set[1][1]);
			reqitem[2] = new Array(set[2][0], set[2][1]);
			menu = "";
			for (i = 0; i < reqitem.length; i++) {
				menu += "\r\n#v" + reqitem[i][0] + "# #b" + reqitem[i][1] + " #t" + reqitem[i][0] + "##k";
			}
			menu += "\r\n#i4031138# #b" + cost + "金币#k";
			cm.sendYesNo("制作#b5个#t" + makeitem + "##k, 我需要一下材料.大部分都可以在怪物身上获取,收集这些东西并不会太困难. 想要吗?\r\n" + menu);
		} else {
			toTurn = selection;
			var text = "要用#i" + toTurn + "#进行物质转换?要投入多少个材料?";
			cm.sendGetNumber(text, 2, 2, cm.getPlayer().getItemQuantity(toTurn,false));
		}
	} else if (status == 4) {
		if (toTurn > 0) {
			var turnTo;
			cm.gainItem(toTurn, -selection);
			if (toTurn >= 4020000 && toTurn <= 4020008)
				turnTo = Math.floor(Math.random() * 9) + 4020000;
			else if (toTurn >= 4010000 && toTurn <= 4010007)
				turnTo = Math.floor(Math.random() * 7) + 4010000;
			else if (toTurn >= 4007000 && toTurn <= 4007007)
				turnTo = Math.floor(Math.random() * 7) + 4007000;
			else if (toTurn >= 4130000 && toTurn <= 4130022)
				turnTo = Math.floor(Math.random() * 22) + 4130000;
			var get = Math.floor((Math.random() * 0.3 + 0.4) * selection);
			if (cm.getPlayer().canHold(turnTo, get)) {
				cm.gainItem(turnTo, get);
				if (turnTo == toTurn) {
					cm.sendOk("抱歉,这次连击没有发生任何变化," + (selection - get) + "个#z" + toTurn + "#消失了.");
				} else {
					cm.sendOk(selection+"个#z"+toTurn+"#一共炼出了"+get+"个#z"+turnTo+"#");
				}
			}else{
				cm.sendOk("背包空间不足");
			}
			cm.dispose();
			return;
		}
		for (i = 0; i < reqitem.length; i++) {
			if (!cm.haveItem(reqitem[i][0], reqitem[i][1]))
				access = false;
		}
		if (access == false || !cm.canHold(makeitem) || cm.getMeso() < cost) {
			cm.sendNext("检查你的材料是否齐全");
		} else {
			cm.sendOk("给,这是五个#b#t" + makeitem + "##k!");
			cm.gainItem(reqitem[0][0], -reqitem[0][1]);
			cm.gainItem(reqitem[1][0], -reqitem[1][1]);
			cm.gainItem(reqitem[2][0], -reqitem[2][1]);
			cm.gainMeso(-cost);
			cm.gainItem(makeitem, 5);
		}
		cm.dispose();
	}
}
