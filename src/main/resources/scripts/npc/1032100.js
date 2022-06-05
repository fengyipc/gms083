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
/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Arwen the Fairy - Victoria Road : Ellinia (101000000)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

var status = 0;
var item;
var selected;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (status == 1 && mode == 0) {
            cm.dispose();
            return;
        } else if (status == 2 && mode == 0) {
            cm.sendNext("制作" + item + "不简单.请准备好全部材料.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getLevel() >= 40) {
                cm.sendNext("我可以制作一些特殊的物品,但是需要的材料不好找.");
            } else {
                cm.sendOk("你40级以后再来找我吧.");
                cm.dispose();
            }
        } else if (status == 1) {
            cm.sendSimple("要做什么?#b\r\n#L0##z4011007##l\r\n#L1##z4021009##l\r\n#L2##z4031042##l");
        } else if (status == 2) {
            selected = selection;
            if (selection == 0) {
                item = "#z4011007#";
                var text = "要制作一个#z4011007#?你需要:\r\n";
                for(var i = 4011000; i<4011007; i++) {
                   text +="#i"+i+"#";
                }
                text +="各一个\r\n另外我需要收取10000金币的手续费."
                cm.sendYesNo(text);
            } else if (selection == 1) {
                item = "#z4011009#";
                var text = "要制作一个#z4011009#?你需要:\r\n";
                for(var i = 4021000; i<4021009; i++) {
                   text +="#i"+i+"#";
                }
                text +="各一个\r\n另外我需要收取15000金币的手续费."
                cm.sendYesNo(text);
            } else if (selection == 2) {
                item = "#z4031042#";
                var text = "要制作一个#z4031042#?你需要:\r\n";
                for(var k = 4001006; k<4021009; k+=10001) {
                    text +="#i"+k+"#";
                }
                text +="各一个\r\n另外我需要收取30000金币的手续费."
                cm.sendYesNo(text);
            }
        } else if (status == 3) {
            if (selected == 0) {
                if (cm.haveItem(4011000) && cm.haveItem(4011001) && cm.haveItem(4011002) && cm.haveItem(4011003) && cm.haveItem(4011004) && cm.haveItem(4011005) && cm.haveItem(4011006) && cm.getMeso() >= 10000) {
                    cm.gainMeso(-10000);
                    for(var i = 4011000; i<4011007; i++) {
                        cm.gainItem(i,-1);
                    }
                    cm.gainItem(4011007, 1);
                    cm.sendNext("好了,这是给你的" + item + ".");
                } else {
                    cm.sendNext("你的金币不够了吧? 还是材料不齐全?");
                }
            } else if (selected == 1) {
                if (cm.haveItem(4021000) && cm.haveItem(4021001) && cm.haveItem(4021002) && cm.haveItem(4021003) && cm.haveItem(4021004) && cm.haveItem(4021005) && cm.haveItem(4021006) && cm.haveItem(4021007) && cm.haveItem(4021008) && cm.getMeso() >= 15000) {
                    cm.gainMeso(-15000);
                    for(var j = 4021000; j<4021009; j++) {
                        cm.gainItem(j,-1);
                    }
                    cm.gainItem(4021009, 1);
                    cm.sendNext("好了,这是给你的" + item + ".");
                } else {
                    cm.sendNext("你的金币不够了吧? 还是材料不齐全?");
                }
            } else if (selected == 2) {
                if (cm.haveItem(4001006) && cm.haveItem(4011007) && cm.haveItem(4021008) && cm.getMeso() >= 30000) {
                    cm.gainMeso(-30000);
                    for(var k = 4001006; k<4021009; k+=10001) {
                        cm.gainItem(k,-1);
                    }
                    cm.gainItem(4031042, 1);
                    cm.sendNext("好了,这是给你的" + item + ".");
                } else {
                    cm.sendNext("你的金币不够了吧? 还是材料不齐全?");
                }
            }
            cm.dispose();
        }
    }
}