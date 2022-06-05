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
	Shuri the Tour Guide - Orbis (200000000)
-- By ---------------------------------------------------------------------------------------------
	Information & Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version
---------------------------------------------------------------------------------------------------
**/

var pay = 2000;
var ticket = 4031134;
var msg;
var check;

var status = 0;

function start() {
    cm.sendSimple("你听说过叫#b#m110000000##k的海滩吗,在距离#m"+cm.getPlayer().getMapId()+"#很远的地方?如果你有2000金币或者#z4031134#,我现在就可以带你去.\r\n\r\n#L0##b我付"+pay+"金币.#k#l\r\n#L1##b我又#t"+ticket+"##k#l\r\n#L2##b什么是#t"+ticket+"#?#k#l");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status == 0)) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
            cm.sendNext("You must have some business to take care of here. You must be tired from all that travelling and hunting. Go take some rest, and if you feel like changing your mind, then come talk to me.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            if (selection == 0 || selection == 1) {
                check = selection;
                if (selection == 0)
                    msg = "你想支付#b"+pay+"金币#k去往#m110000000#?";
                else if (selection == 1)
                    msg = "你有#b#t"+ticket+"##k?那么你可以随时去#m110000000#.";
                cm.sendYesNo(msg+"好的!!确认现在出发去#m110000000#吗?");
            } else if (selection == 2) {
                cm.sendNext("你一定对#b#t"+ticket+"##k感兴趣.#t"+ticket+"#是去#m110000000#的免费门票.有了它,可以自免费前往#m110000000#.");
                status = 3;
            }
        } else if (status == 2) {
            if (check == 0) {
                if (cm.getMeso() < pay) {
                    cm.sendOk("我想你缺钱. ");
                    cm.dispose();
                } else {
                    cm.gainMeso(-pay);
                    access = true;
                }
            } else if (check == 1) {
                if (!cm.haveItem(ticket)) {
                    cm.sendOk("#b#t"+ticket+"##k在哪??");
                    cm.dispose();
                } else
                    access = true;
            }
            if (access) {
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
                cm.dispose();
            }
        } else if (status == 3) 
            cm.sendNext("你一定对#b#t"+ticket+"##k感兴趣.#t"+ticket+"#是去#m110000000#的免费门票.有了它,可以自免费前往#m110000000#.");
        else if (status == 4)
            cm.sendPrev("我回来的时候没有带它，没有它感觉很糟糕。希望有人把它捡起来放在安全的地方。不管怎么说，这是我的故事，谁知道呢，你也许能把它捡起来好好利用。如果你有什么问题，尽管问");
        else if (status == 5)
            cm.dispose();
        
    }
}