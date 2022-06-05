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
	Alcaster - El Nath Market (211000100)
-- By ---------------------------------------------------------------------------------------------
	Unknown & Information & xQuasar
-- Version Info -----------------------------------------------------------------------------------
	1.3 - Fixed up completely [xQuasar]
	1.2 - Add a missing text part [Information]
	1.1 - Recoded to official [Information]
	1.0 - First Version by Unknown
---------------------------------------------------------------------------------------------------
**/

var selected;
var amount;
var totalcost;
var item = new Array(2050003,2050004,4006000,4006001);
var cost = new Array(300,400,5000,5000);
var msg = new Array("治愈被封印和诅咒的状态","解除全部异常状态","高级魔法","高级技能所需");
var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (!cm.isQuestCompleted(3035)) {
        cm.sendNext("如果你决定帮我，作为回报，我会把这件商品出售。");
        cm.dispose();
        return;
    }
    if(mode == 0 && status == 2) {
        cm.sendNext("我懂了。我这里有很多不同的东西。看看周围。我只是把这些东西卖给你，所以我不会以任何形式或形式把你撕碎。");
        cm.dispose();
        return;
    }
    if (mode < 1) {
        cm.dispose();
        return;
    }
    
    status++;
    if (status == 0) {
        var selStr = "";
        for (var i = 0; i < item.length; i++){
            selStr += "\r\n#L" + i + "# #b#t" + item[i] + "# (Price: "+cost[i]+" mesos)#k#l";
        }
        cm.sendSimple("你的#b#t4031056##k安全的封印起来了. 我用尽了800年来存储的能量.哦，顺便说一句。。。你在找稀有的东西吗？为了感谢你的辛勤工作，我将把我的一些东西卖给你，而且只卖给你。挑一个你想要的!"+selStr);
    }
    else if (status == 1) {
        selected = selection;
        cm.sendGetNumber("#b#t"+item[selected]+"##k就是你需要的东西吗?这是"+msg[selected]+". 这可能不是最容易得到的东西，但我会给你.每个将会花费你 #b"+cost[selected]+"金币#k.你想要多少?", 0, 1, 100);
    }
    else if (status == 2) {
        amount = selection;
        totalcost = cost[selected] * amount;
        if (amount == 0) {
            cm.sendOk("你没什么需要的.");
            cm.dispose();
        }
        cm.sendYesNo("想买#r"+amount+"个#t"+item[selected]+"##k? 费用是"+cost[selected]+"金币#t"+item[selected]+"#/个,总共是#r"+totalcost+"金币#k.");
    } else if(status == 3) {
        if(cm.getMeso() < totalcost || !cm.canHold(item[selected])) {
            cm.sendNext("你的金币不够");
            cm.dispose();
        }
        cm.sendNext("谢谢你");
        cm.gainMeso(-totalcost);
        cm.gainItem(item[selected], amount);
        cm.dispose();
    }
}