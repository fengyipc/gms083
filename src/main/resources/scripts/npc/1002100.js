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
// Jane the Alchemist
var status = -1;
var amount = -1;
var items = [[2000002,310],[2022003,1060],[2022000,1600],[2001000,3120]];
var item;

function start() {
    if (cm.isQuestCompleted(2013))
        cm.sendNext("是你。。。多亏了你，我才得以做很多事。现在我做了很多东西。如果你需要什么，请告诉我。");
    else {
        if (cm.isQuestCompleted(2010))
            cm.sendNext("你看起来不够强壮，买不到我的药剂。。。");
        else
            cm.sendOk("我的梦想是到处旅行，就像你一样。然而，我父亲不允许我这样做，因为他认为这很危险。不过，如果我证明我不是他认为的那种软弱的女孩，他可能会答应的。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type == 1)
            cm.sendNext("我还有不少你以前给我的材料。所有的东西都在那里，所以慢慢挑选吧。");
        cm.dispose();
        return;
    }
    if (status == 0){
        var selStr = "你想买哪种商品?#b";
        for (var i = 0; i < items.length; i++)
            selStr += "\r\n#L" + i + "##i" + items[i][0] + "# (价格 : " + items[i][1] + " 金币)#l";
        cm.sendSimple(selStr);
    } else if (status == 1) {
        item = items[selection];
        var recHpMp = ["300 HP.","1000 HP.","800 MP","1000 HP and MP."];
        cm.sendGetNumber("你想要 #b#t" + item[0] + "##k? #t" + item[0] + "# 可以让你回复 " + recHpMp[selection] + " 想要买多少个?", 1, 1, 100);
    } else if (status == 2) {
        cm.sendYesNo("你要买#r" + selection + "#k个 #b#t" + item[0] + "##k? #t" + item[0] + "# 费用: " + item[1] + " 金币一个, 总价是 #r" + (item[1] * selection) + "#k 金币.");
        amount = selection;
    } else if (status == 3) {
        if (cm.getMeso() < item[1] * amount)
            cm.sendNext("你是不是缺金币？请检查一下您的其他栏是否有空位.你至少需要#r" + (item[1] * selectedItem) + "#k金币.");
        else {
            if (cm.canHold(item[0])) {
                cm.gainMeso(-item[1] * amount);
                cm.gainItem(item[0], amount);
                cm.sendNext("欢迎光临.这里的东西总是可以做的，所以如果你需要什么，请再来。");
            } else
                cm.sendNext("请检查一下，看看您的其他栏是否有空间。");
        }
        cm.dispose();
    }
}