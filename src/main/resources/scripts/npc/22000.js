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
/* Author: Xterminator
	NPC Name: 		Shanks
	Map(s): 		Maple Road : Southperry (60000)
	Description: 		Brings you to Victoria Island
*/
var status = 0;

function start() {
    cm.sendYesNo("如果你想离开这里，你需要支付#b150金币#k，我会带你去#b明珠港#k。但关键的是，你一旦离开，就再也不能回到这里来了。你是不是想要去#b明珠港#k？");
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        if(mode == 0 && type != 1)
            status -= 2;
        else if(type == 1 || (mode == -1 && type != 1)){
            if(mode == 0)
                cm.sendOk("嗯……我猜你还有什么别的事情要在这里做吧？");
            cm.dispose();
            return;
        }
    }
    if (status == 1) {
        if (cm.haveItem(4031801))
            cm.sendNext("好，现在给我#b150金币#k……嗯，那是什么？是路卡斯的#b推荐信#k？嘿，你应该告诉我。伟大的冒险家，我似乎已经看到你的未来！");
        else
            cm.sendNext("确定要离开吗？那么……先付我#b150金币#k吧……");
    } else if (status == 2) {
        if (cm.haveItem(4031801))
            cm.sendNextPrev("既然你有#b推荐信#k，我也不会向你收取任何费用的。好了，我们现在就向#b明珠港#k出发。船可能会有点晃，坐好了……");
        else
        if (cm.getLevel() > 6) {
            if (cm.getMeso() < 150) {
                cm.sendOk("什么？你想去#b明珠港#k但你没有钱？想得美……");
                cm.dispose();
            } else
                cm.sendNext("很好！#b150金币#k！那么，我们现在就向#b明珠港#k出发吧！");
        } else {
            cm.sendOk("让我看看，我认为你还没有足够的资格去#b明珠港#k。你的等级应该至少在7级或者7级以上。");
            cm.dispose();
        }
    } else if (status == 3) {
        if (cm.haveItem(4031801)) {
            cm.gainItem(4031801, -1);
        } else {
            cm.gainMeso(-150);
        }
        cm.warp(104000000, 0);
        cm.dispose();
    }
}
