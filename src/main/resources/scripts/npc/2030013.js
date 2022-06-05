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
/*Adobis
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
 var exped = MapleExpeditionType.ZAKUM;
 var expedName = "扎昆";
 var expedBoss = "扎昆";
 var expedMap = "扎昆的祭台";
 var expedItem = 4001017;
 
 var list = "想做什么?#b\r\n\r\n#L1#查看远征队成员#l\r\n#L2#开始战斗!#l\r\n#L3#取消挑战.#l";
 
 function start() {
     action(1, 0, 0);
 }
 
 function action(mode, type, selection) {
 
     player = cm.getPlayer();
     expedition = cm.getExpedition(exped);
     em = cm.getEventManager("ZakumBattle");
 
     if (mode == -1) {
         cm.dispose();
     } else {
         if (mode == 0) {
             cm.dispose();
             return;
         }
 
         if (status == 0) {
             if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                 cm.sendOk("你不满足挑战" + expedBoss + "的要求!");
                 cm.dispose();
             } else if (expedition == null) { //Start an expedition
                 cm.sendSimple("#e#b<远征队: " + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想要组建挑战#r" + expedBoss + "#k的远征队吗?\r\n#b#L1#让我们开始吧!#l\r\n\#L2#不,再等等...#l");
                 status = 1;
             } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                 if (expedition.isInProgress()) {    // thanks Conrad for noticing exped leaders being able to still manage in-progress expeds
                     cm.sendOk("你们的远征已经在进行中，为了那些仍在战斗的人们，让我们为那些勇敢的灵魂祈祷吧。");
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
                     var eim = em.getInstance(expedName + player.getClient().getChannel());
                     if (eim.getIntProperty("canJoin") == 1) {
                         eim.registerPlayer(player);
                     } else {
                         cm.sendOk(expedBoss + "远征队已经开始战斗了.为它们祈祷.");
                     }
 
                     cm.dispose();
                 } else { //If you're not in by now, tough luck
                     cm.sendOk("其他远征队已经开始了与" + expedBoss + "的战斗,愿他们平安.");
                     cm.dispose();
                 }
             }
         } else if (status == 1) {
             if (selection == 1) {
                 if (!cm.haveItem(expedItem)) {
                     cm.sendOk("作为远征队长,你的背包里要有#b#t" + expedItem + "##k才可以召唤" + expedBoss + "!");
                     cm.dispose();
                     return;
                 }
 
                 expedition = cm.getExpedition(exped);
                 if (expedition != null) {
                     cm.sendOk("有人已经开启了远征队,试着加入他们吧!");
                     cm.dispose();
                     return;
                 }
 
                 var res = cm.createExpedition(exped);
                 if (res == 0) {
                     cm.sendOk("#r" + expedBoss + "远征队#k成立了.\r\n\r\n再次和我对话开始战斗或岔开远征队成员!");
                 } else if (res > 0) {
                     cm.sendOk("对不起,你今天剩余战斗次数不足...");
                 } else {
                     cm.sendOk("出了未知错误.");
                 }
 
                 cm.dispose();
                 return;
             } else if (selection == 2) {
                 cm.sendOk("不是所有人都可以挑战" + expedBoss + ".");
                 cm.dispose();
                 return;
             }
         } else if (status == 2) {
             if (selection == 1) {
                 if (expedition == null) {
                     cm.sendOk("远征队加载失败.");
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
                 var text = "以下是其他队员(点击踢出远征队):\r\n";
                 text += "\r\n\t\t1." + expedition.getLeader().getName();
                 for (var i = 1; i < size; i++) {
                     text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                 }
                 cm.sendSimple(text);
                 status = 6;
             } else if (selection == 2) {
                 var min = exped.getMinSize();
 
                 var size = expedition.getMemberList().size();
                 if (size < min) {
                     cm.sendOk("至少需要" + min + "玩家.");
                     cm.dispose();
                     return;
                 }
                 cm.sendOk("远征即将开始,你将会倍传送到#b" + expedMap + "#k.");
                 status = 4;
             } else if (selection == 3) {
                 player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + "结束了远征队."));
                 cm.endExpedition(expedition);
                 cm.sendOk("远征队结束了.");
                 cm.dispose();
                 return;
             }
         } else if (status == 4) {
             if (em == null) {
                 cm.sendOk("事件初始化失败.");
                 cm.dispose();
                 return;
             }
             var map = cm.getMap();
             em.setProperty("leader", player.getName());
             em.setProperty("channel", player.getClient().getChannel());
             if (!em.startInstance(expedition)) {
                 cm.sendOk("其他队伍正在挑战" + expedBoss + ".");
                 cm.dispose();
                 return;
             }
             map.setTimeTotal(0);
             map.setTimeIn(-1);
             map.broadcastMessage(Java.type("tools.MaplePacketCreator").removeClock());
             cm.dispose();
             return;
         } else if (status == 6) {
             if (selection > 0) {
                 var banned = expedMembers.get(selection - 1);
                 expedition.ban(banned);
                 cm.sendOk("踢出了" + banned.getValue());    // getValue, thanks MedicOP (MicroWilly69) for finding this issue
                 cm.dispose();
             } else {
                 cm.sendSimple(list);
                 status = 2;
             }
         }
     }
 }
 