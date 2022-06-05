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
	NPC Name: 		Trainer Frod
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/

function start() {
    if (cm.haveItem(4031035))
        cm.sendNext("啊，那是我哥哥的信！可能是因为我认为我不工作而责骂我…嗯？ 啊…你听从了我哥哥的建议，训练了你的宠物，然后爬到这里来了，是吗？ 不错！！既然你努力工作来这里，我会提高你和你的宠物的亲密度。");
    else {
        cm.sendOk("我哥哥告诉我要好好组织宠物障碍训练课程，但是。。。既然我离他那么远……既然他看不见我，不如摸几分钟鱼。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        if (cm.getPlayer().getNoPets() == 0)
            cm.sendNextPrev("嗯。。。你真的带着你的宠物来了吗？这些是为宠物设置的障碍。没有它你在这里干什么？？走开！");
        else {
            cm.gainItem(4031035, -1);
            cm.gainCloseness(2, 0);
            cm.sendNextPrev("怎么样？你不觉得你和你的宠物更亲密了吗？如果你有时间，继续带着你的宠物训练…当然，前提是得到我哥哥的许可。");
        }
        cm.dispose();
    }
}