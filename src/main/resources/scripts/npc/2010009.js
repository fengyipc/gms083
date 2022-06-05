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
var status;
var choice;
var guildName;

var allianceCost = 2000000;
var increaseCost = 1000000;
var allianceLimit = 5;

function start() {
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1)
        status++;
    else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        if(cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
            cm.sendNext("你好!我是#b#p2010009##k.只有家族领袖才可以尝试组建联盟.");
            cm.dispose();
            return;
        }
        
        cm.sendSimple("你好!我是#b#p2010009##k.\r\n#b#L0#告诉我联盟是干嘛的#l\r\n#L1#我应该怎么创建联盟#l\r\n#L2#我要创建联盟#l\r\n#L3#我想允许更多家族进入联盟#l\r\n#L4#我要解散联盟#l");
    }
    else if (status == 1) {
        choice = selection;
        if (selection == 0) {
            cm.sendNext("字面意思.");
            cm.dispose();
        } else if (selection == 1) {
            cm.sendNext("要建立一个公会联盟，两个且只有两个帮会主人需要在一个队伍中，并且两个家族领袖必须在同一个频道并且这个房间里。队长将被指定为联盟的盟主.");
            cm.dispose();
        } else if(selection == 2) {
            if(!cm.isLeader()) {
                cm.sendNext("队长来对话.");
                cm.dispose();
                return;
            }
            if(cm.getPlayer().getGuild().getAllianceId() > 0) {
                cm.sendOk("如果你的家族已经加入了联盟无法操作.");
                cm.dispose();
                return;
            }
            
            cm.sendYesNo("组建联盟的费用是#b" + allianceCost + "金币#k.");
        } else if (selection == 3) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("你没有加入联盟.");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("D你想增加联盟的容量? 费用是#b" + increaseCost + "金币#k.");
            else {
                cm.sendNext("只有盟主可以尽行这项操作.");
                cm.dispose();
            }
        } else if(selection == 4) {
            if(cm.getPlayer().getMGC() == null) {
                cm.sendOk("只有盟主可以尽行这项操作.");
                cm.dispose();
                return;
            }
            
            var rank = cm.getPlayer().getMGC().getAllianceRank();
            if (rank == 1)
                cm.sendYesNo("你真要解散你的联盟吗?");
            else {
                cm.sendNext("只有盟主可以尽行这项操作.");
                cm.dispose();
            }
        }
    } else if(status == 2) {
        if (choice == 2) {
            if(cm.getMeso() < allianceCost) {
                cm.sendOk("你没有足够的金币.");
                cm.dispose();
                return;
            }
            cm.sendGetText("现在,请给你的联盟去的好听的名字吧(最多6个汉字或12个字符)");
        } else if (choice == 3) {
            if(cm.getAllianceCapacity() == allianceLimit) {
                cm.sendOk("不能再扩充了.");
                cm.dispose();
                return;
            }
            if(cm.getMeso() < increaseCost) {
                cm.sendOk("你没有足够的金币.");
                cm.dispose();
                return;
            }
            
            cm.upgradeAlliance();
            cm.gainMeso(-increaseCost);
            cm.sendOk("你的联盟现在可以添加更多家族进来了.");
            cm.dispose();
        } else if (choice == 4) {
            if (cm.getPlayer().getGuild() == null || cm.getPlayer().getGuild().getAllianceId() <= 0) {
                cm.sendNext("你不能解散一个不存在的联盟.");
                cm.dispose();
            } else {
                cm.disbandAlliance(cm.getClient(), cm.getPlayer().getGuild().getAllianceId());
                cm.sendOk("你的联盟被解散了.");
                cm.dispose();
            }
        }
    } else if (status == 3) {
        guildName = cm.getText();
        cm.sendYesNo( guildName + "作为联盟名字好吗?");
    } else if (status == 4) {
        if (!cm.canBeUsedAllianceName(guildName)) {
            cm.sendNext("这个名字不可用,试试别的名字."); //Not real text
            status = 1;
            choice = 2;
        } else {
            if (cm.createAlliance(guildName) == null)
                cm.sendOk("请检查你和你的另一个家族领袖现在是否都在这里，并确保两个家族目前都没有在联盟上注册。在这个过程中，其他公会家族领袖不应该和你一起出席。");
            else {
                cm.gainMeso(-allianceCost);
                cm.sendOk("成功.");
            }
            cm.dispose();
        }
    }
}