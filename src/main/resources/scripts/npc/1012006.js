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
/* Author: Xterminator, Moogra
	NPC Name: 		Trainer Bartos
	Map(s): 		Victoria Road : Pet-Walking Road (100000202)
	Description: 		Pet Trainer
*/
var status = 0;

function start() {
    cm.sendSimple("找我有什么事吗?\r\n#L0##b请告诉我这里的情况.#l\r\n#L1#我是#p1032102#介绍来的...#k#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else if (mode == 0) {
        cm.sendNext("现在太忙了，不能做吗？如果你想做的话，回来找我。");
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                if (cm.haveItem(4031035)) {
                    cm.sendNext("拿到那封信，和你的宠物一起跳过障碍，然后把那封信带给我的兄弟#p1012007#。把信给他，你的宠物就会有好事发生。");
                    cm.dispose();
                } else
                    cm.sendYesNo("这是一条你可以和你的宠物一起散步的路。你可以带着它四处走动，也可以训练你的宠物通过这里的障碍物。如果你还没有和你的宠物太近，这可能会带来一个问题，他不会听从你的命令太多。。。你觉得呢？想训练你的宠物吗？");
            } else {
                cm.sendOk("嘿，你确定你见过#b#p1032102##k？如果你以前从未见过她，就别骗我，因为这很明显。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.gainItem(4031035, 1);
            cm.sendNext("好的，这是信。如果你直接去的话，他不会知道我派你去的，所以带着你的宠物穿过障碍，走到最上面，然后和#p1012007#谈谈，把信给他。如果你在穿越障碍的时候注意你的宠物，这并不难。祝你好运！");
            cm.dispose();
        }
    }
}