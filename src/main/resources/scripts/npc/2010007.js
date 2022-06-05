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
/* guild creation npc */
var status = 0;
var sel;

function start() {
    cm.sendSimple("你想做什么?\r\n#b#L0#创建家族#l\r\n#L1#解散家族#l\r\n#L2#增加家族容量#l#k");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            sel = selection;
            if (selection == 0) {
                if (cm.getPlayer().getGuildId() > 0) {
                    cm.sendOk("你现在没法创建家族,请先退出当前所在的家族.");
                    cm.dispose();
                } else
                    cm.sendYesNo("创建家族需要#b1500000金币#k,继续吗?");
            } else if (selection == 1) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("你不是家族长.");
                    cm.dispose();
                } else
                    cm.sendYesNo("你真要解散你的家族吗? 这个操作无法恢复.");
            } else if (selection == 2) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("只有家族长可以操作.");
                    cm.dispose();
                } else {
                    var MapleGuild = Java.type("net.server.guild.MapleGuild");  // thanks Conrad for noticing an issue due to call on a static method here
                    cm.sendYesNo("增加#b5#k家族容量将花费#b " + MapleGuild.getIncreaseGuildCost(cm.getPlayer().getGuild().getCapacity()) +" 金币#k,继续吗?");
                }
            }
        } else if (status == 2) {
            if (sel == 0 && cm.getPlayer().getGuildId() <= 0) {
                cm.getPlayer().genericGuildMessage(1);
                cm.dispose();
            } else if (cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
                if (sel == 1) {
                    cm.getPlayer().disbandGuild();
                    cm.dispose();
                } else if (sel == 2) {
                    cm.getPlayer().increaseGuildCapacity();
                    cm.dispose();
                }
            }
        }
    }
}
