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
/*Jack
 *
 *@author Alan (SharpAceX)
 *@author Ronan
*/
importPackage(Packages.server.expeditions);
importPackage(Packages.tools);
importPackage(Packages.scripting.event);

var status = 0;
var expedition;
var expedMembers;
var player;
var em;
var cwkpq = MapleExpeditionType.CWKPQ;
var list = "你想做什么?#b\r\n\r\n#L1#查看远征名单#l\r\n#L2#开始战斗(队伍里如果没有全部战士,法师,弓箭手,飞侠,海盗五个职业的三转角色无法通关)!#l\r\n#L3#结束远征队.#l";

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {

    player = cm.getPlayer();
    expedition = cm.getExpedition(cwkpq);
    em = cm.getEventManager("CWKPQ");

    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }

        if (status == 0) {
            if (player.getLevel() < cwkpq.getMinLevel() || player.getLevel() > cwkpq.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                cm.sendOk("你还没资格挑战绯红领地!");
                cm.dispose();
            } else if (expedition == null) { //Start an expedition
                cm.sendSimple("#e#b<组队挑战:绯红领地>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想挑战#r绯红领地#k?\r\n#b#L1#是的!#l\r\n\#L2#我想再等等...#l");
                status = 1;
            } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                if (expedition.isInProgress()) {
                    cm.sendOk("战斗已经开始.");
                    cm.dispose();
                } else {
                    cm.sendSimple(list);
                    status = 2;
                }
            } else if (expedition.isRegistering()) { //If the expedition is registering
                if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                    cm.sendOk("你已经加入了远征队.请等#r" + expedition.getLeader().getName() + "#k开始.");
                    cm.dispose();
                } else { //If you aren't in it, you're going to get added
                    cm.sendOk(expedition.addMember(cm.getPlayer()));
                    cm.dispose();
                }
            } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                if (expedition.contains(player)) { //If you're registered, warp you in
                    em.getInstance("CWKPQ" + player.getClient().getChannel()).registerPlayer(player);
                    cm.dispose();
                } else { //If you're not in by now, tough luck
                    cm.sendOk("有人已经在战斗了.");
                    cm.dispose();
                }
            }
        } else if (status == 1) {
            if (selection == 1) {
                expedition = cm.getExpedition(cwkpq);
                if(expedition != null) {
                    cm.sendOk("有人成立了远征队,加入他们!");
                    cm.dispose();
                    return;
                }
                
                var res = cm.createExpedition(cwkpq);
                if (res == 0) {
                    cm.sendOk("#r绯红领地远征队#k成立了.\r\n\r\n再次与我对话开始战斗!");
                } else if (res > 0) {
                    cm.sendOk("抱歉,你今天的挑战次数已经用完了...");
                } else {
                    cm.sendOk("出错了.");
                }
                
                cm.dispose();
                return;
            } else if (selection == 2) {
                cm.sendOk("不是所有人都有资格挑战绯红领地.");
                cm.dispose();
                return;
            }
        } else if (status == 2) {
            if (selection == 1) {
                if (expedition == null) {
                    cm.sendOk("远征队没有加载成功.");
                    cm.dispose();
                    return;
                }
                expedMembers = expedition.getMemberList();
                var size = expedMembers.size();
                if (size == 1) {
                    cm.sendOk("你是远征队唯一的成员.");
                    cm.dispose();
                    return;
                }
                var text = "远征名单如下 (点击移除):\r\n";
                text += "\r\n\t\t1." + expedition.getLeader().getName();
                for (var i = 1; i < size; i++) {
                    text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                }
                cm.sendSimple(text);
                status = 6;
            } else if (selection == 2) {
                var min = cwkpq.getMinSize();
                var size = expedition.getMemberList().size();
                if (size < min) {
                    cm.sendOk("你需要至少" + min + "名玩家加入远征队.");
                    cm.dispose();
                    return;
                }
                
                cm.sendOk("现在送你进去.");
                status = 4;
            } else if (selection == 3) {
                player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + "结束了远征队."));
                cm.endExpedition(expedition);
                cm.sendOk("远征队结束了,现在赶紧离开这里.");
                cm.dispose();
                return;
            }
        } else if (status == 4) {
            if (em == null) {
                cm.sendOk("事件初始化失败,请联系管理员.");
                cm.dispose();
                return;
            }

            em.setProperty("leader", player.getName());
            em.setProperty("channel", player.getClient().getChannel());
            if(!em.startInstance(expedition)) {
                cm.sendOk("其他人正在挑战.");
                cm.dispose();
                return;
            }
            
            cm.dispose();
            return;
        } else if (status == 6) {
            if (selection > 0) {
                var banned = expedMembers.get(selection - 1);
                expedition.ban(banned);
                cm.sendOk("你把" + banned.getValue() + "移除了远征队.");
                cm.dispose();
            } else {
                cm.sendSimple(list);
                status = 2;
            }
        }
    }
}