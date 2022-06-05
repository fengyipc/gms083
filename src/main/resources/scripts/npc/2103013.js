/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var status = 0;
var selected = -1;
var party = 0;

/*function start() {
        cm.sendOk("功能不可用.");
        cm.dispose();
}*/

function start() {
	status = -1;
	var text = "你在错误的地图.";
	if (cm.getMapId() == 926020001)
		text = "站住!你成功抵挡了奈特的怒火.奈特允许你进入企鹅长老的墓.现在想进去吗?\r\n\r\n#b#L0#好.#l\r\n#L1#等会儿.#l";
	else if (cm.getMapId() == 926010000)
		text = "我是#p2103013#.\r\n\r\n#b#L0#这里是干嘛的.#l\r\n#e#L1# 我要进入金字塔.#l#n\r\n\r\n#L2#寻找组队.#l\r\n\r\n#L3#进入企鹅长老墓穴.#l\r\n#L4# 奖励是什么.#l\r\n#L5#领取<法老保护者>勋章.#l";
	else 
		text = "你想放弃挑战离开吗?\r\n\r\n#b#L0#离开#l";
		
	cm.sendSimple(text);
}


function action(mode, type, selection) {
	if (mode == 0 && type == 0) {
		status--;
	} else if (mode < 0 || (type == 4 && mode == 0)) {
		cm.dispose();
		return;
	} else status++;
	
	if (cm.getMapId() == 926010000) {
		if (status == 0) {
			if (selection > -1) selected = selection;
			if (selection == 0 || selected == 0) {
				cm.sendNext("这是奈特的金字塔,混沌与复仇之神. 长久以来, 它都被掩埋在黄沙里, 但是奈特让它显现了出来. 如果你不害怕混沌的亡灵, 你可以进去挑战里面的怪物.");
			} else if (selection == 1) {
				cm.sendSimple("不害怕奈特怒火的蠢蛋, 决定你个命运吧!\r\n\r\n#b#L0#独自进入.#l\r\n#L1#组队进入.#l");
			} else if (selection == 2) {
				cm.openUI(0x16);
				cm.showInfoText("使用组队搜索找一个队伍!");
				cm.dispose();
			} else if (selection == 3) {
				cm.sendSimple("你带了什么宝石过来?\r\n\r\n#L0##i4001322# #t4001322##l\r\n#L1##i4001323# #t4001323##l\r\n#L2##i4001324# #t4001324##l\r\n#L3##i4001325# #t4001325##l");
			} else if (selection == 4) {
				cm.sendNext("在企鹅长老墓里,作为你击败#b企鹅长老#k的奖励,你将获得一个#e#b#t2022613##k#n.里面有特殊的奖励.#e#b#t1132012##k#n.\r\n#i1132012:# #t1132012#\r\n\r\n 如果你能挺过地狱模式,你还将得到 #e#b#t1132013##k#n.\r\n\r\n#i1132013:# #t1132013#\r\n\r\n 当然,奈特可不会让这种事情发生的.");
			} else if (selection == 5) {
				var progress = cm.getQuestProgressInt(29932);
				if (progress >= 50000)
					cm.dispose();
				else
					cm.sendNext("");
					
			}
		} else if (status == 1) {
			if (selected == 0) {
				cm.sendNextPrev("当你进入金字塔,你将面对奈特的怒火.既然你看起来不怎么聪明,那我简单给你讲一下规则.记好了小笨蛋.#b\r\n\r\n1. 关注你的#e#r行动值#b#n.保持行动值的唯一方式就是不断击杀怪物.\r\n2.那些没有能力的人将付出代价. 不要#rMiss#b.\r\n3.提防有#v04032424#标志的企鹅长老.如果你不小心攻击了他,你会后悔的.\r\n4.灵活的运用杀戮技能");
			} else if (selected == 1) {
				party = selection;
				cm.sendSimple("不怕死的人,做决定吧!\r\n#L0##i3994115##l#L1##i3994116##l#L2##i3994117##l#L3##i3994118##l");
			} else if (selected == 3) {
				if (selection == 0) {
					if (cm.haveItem(4001322)) {
						return;
					}
				} else if (selection == 1) {
				    if (cm.haveItem(4001323)) {
						return;
					}
				} else if (selection == 2) {
					if (cm.haveItem(4001324)) {
						return;
					}
				} else if (selection == 3) {
					if (cm.haveItem(4001325)) {
						return;
					}
				}
				cm.sendOk("你需要一个#v4001322#,#v4001323#,#v4001324#或#v4001325#才可以进入墓穴.你确定你有吗?");
				cm.dispose();
			} else if (selected == 5) {
			} else {
				cm.dispose();
			}
		} else if (status == 2) {
			if (selected == 0) {
				cm.sendNextPrev("凡能抵挡奈特怒火的，必得尊荣；失败的，必遭毁灭。 这是我给你的警告,你自己决定.");
			} else if (selected == 1) {
				var mode = "EASY";
				//Finish this
				var pqparty = cm.getPlayer().getParty();
				if (party == 1) {
					if (pqparty == null) {
						cm.sendOk("组队,沙雕.");//BE NICE
						cm.dispose();
						return;		
					} else {
						/*if (pqparty.getMembers().size() < 2) {
							cm.sendOk("一个人组什么队...");
							cm.dispose();
							return;								
						} else {*/
							var i = 0;
							for (var a = 0; a < pqparty.getMembers().size(); a++) {
								var pqchar = pqparty.getMembers().get(a);
								if (i > 1) break;
								if (pqchar != null && pqchar.getMapId() == 926010000) i++;
							}
							/*if (i < 2) {
								cm.sendOk("人都来没来?别浪费时间.");
								cm.dispose();
								return;								
							}
						/*}*/
					}					
				}
				
				if (cm.getPlayer().getLevel() < 40) {
					cm.sendOk("你40级以后才可以参加.");
					cm.dispose();
					return;
				}
				if (selection < 3 && cm.getPlayer().getLevel() > 60) {
					cm.sendOk("60级以上玩家只能参加地狱模式.");
					cm.dispose();
					return;
				} 
				if (selection == 1) mode = "NORMAL";
				else if (selection == 2) mode = "HARD";
				else if (selection == 3) mode = "HELL";
	
				if (!cm.createPyramid(mode, party == 1)) {
					cm.sendOk("里面有人正在挑战,等他们出来或者换个频道看看");
				}
				cm.dispose();
			}
		} else if (status == 3) {
			cm.dispose();
		}
	} else if (cm.getMapId() == 926020001) {
		if (status == 0) {
			if (selection == 0) 
				cm.dispose();//:(
			else if (selection == 1) 
				cm.sendNext("我会给你企鹅长老的宝石. 这样你就可以进入金字塔.检查其他栏空间.");
			
		} else if (status == 1) {
			var itemid = 4001325;
			if (cm.getPlayer().getLevel() >= 60) itemid = 4001325;
			if (cm.canHold(itemid)) {
				cm.gainItem(itemid);
				cm.warp(926010000);
			} else 
				cm.showInfoText("其他栏已经满了.");
			
			cm.dispose();
		}
	} else {
			cm.warp(926010000);
			cm.getPlayer().setPartyQuest(null);
			cm.dispose();
	}
}/*Do you want to forfeit the challenge and leave?

Your allotted time has passed. Do you want to leave now?



*/