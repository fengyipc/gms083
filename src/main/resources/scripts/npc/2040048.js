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
var pay = 1800;
var ticket = 4031134;
var msg;
var check;
var access = false;
var status = 0;

function start() {
    cm.sendSimple("听说过#b#m110000000##k吗,距离#m" + cm.getPlayer().getMapId() + "#很远的地方?如果你有#t" + ticket + "#或者愿意支付" + pay + "金币,我可以带你过去.\r\n\r\n#L0##b我要支付 " + pay + "金币.#k#l\r\n#L1##b我有#t" + ticket + "##k#l\r\n#L2##b什么是#t" + ticket + "#?#k#l");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 0 && status == 1) {
            cm.sendNext("你一定有什么事要处理。你一定是旅行和打猎累了。去休息一下，如果你想改变主意，就来找我。");
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
                    msg = "你将会支付#b" + pay + "金币#k去#m110000000#?";
                else if (selection == 1)
                    msg = "你有#b#t" + ticket + "##k?你可以随时去#m110000000#.";
                cm.sendYesNo(msg + " 好的!!请注意，你可能会在那里遇到一些怪物,一定做好准备. 现在就要出发去#m110000000#吗?");
            } else if (selection == 2) {
                cm.sendNext("对#b#t" + ticket + "##k好奇?#t" + ticket + "#一旦拥有,就可以去#m110000000#.");
                status = 3;
            }
        } else if (status == 2) {
            if (check == 0) {
                if (cm.getPlayer().getMeso() < pay) {
                    cm.sendOk("我想你的金币不够了.");
                    cm.dispose();
                } else {
                    cm.gainMeso(-pay);
                    access = true;
                }
            } else if (check == 1) {
                if (!cm.haveItem(ticket)) {
                    cm.sendOk("#b#t" + ticket + "##k在哪儿呢???");
                    cm.dispose();
                } else
                    access = true;
            }
            if (access == true) {
                cm.getPlayer().saveLocation("FLORINA");
                cm.warp(110000000, "st00");
                cm.dispose();
            }
        } else if (status == 3)
            cm.dispose();
    }
}
