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
//@Author Moogra, Ronan
//Fixed grammar, javascript syntax

importPackage(Packages.client);

var status = 0;
var price = 500000;

function isTransformed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210003;
}

function start() {
    if(!(isTransformed(cm.getPlayer()) || cm.haveItem(4001086))) {
        cm.sendOk("这是黑暗龙王居住的洞穴, 米纳尔森林最强的生物.只有有能力的人才可以进入, #b外来人#k不让进去.走吧!");
        cm.dispose();
        return;
    }
    
    cm.sendSimple("欢迎来到生命洞穴入口!你想进去挑战#r黑暗龙王#k吗?如果你想去挑战他,我想你一定会需要#b#v2000005##k,这可以砸你战斗时救你一命.\r\n#L1#我要花500000金币购买10个#v2000005#!#l\r\n\#L2#不用了谢谢,我想直接进去!#l");
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else if (selection == 1) {
        if(cm.getMeso() >= price) {
            if(!cm.canHold(2000005)) {
                cm.sendOk("背包空间不足!");
            } else {
                cm.gainMeso(-price);
                cm.gainItem(2000005, 10);
                cm.sendOk("给你药!");
            }
        } else {
            cm.sendOk("你的金币不够!");
        }
        cm.dispose();
    } else if (selection == 2) {
        if (cm.getLevel() > 99)
            cm.warp(240050000, 0);
        else
            cm.sendOk("你必须到100级才有资格进去.");
        cm.dispose();
    }
}