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
/*Mark of the Squad
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
 var exped = MapleExpeditionType.HORNTAIL;
 var expedName = "黑暗龙王";
 var expedBoss = "强大的黑暗龙王";
 
 var list = "想做什么?#b\r\n\r\n#L1#查看远征队名单#l\r\n#L2#开始战斗!#l\r\n#L3#结束远征队.#l";
 
 function start() {
     action(1, 0, 0);
 }
 
 function action(mode, type, selection) {
 
     player = cm.getPlayer();
     expedition = cm.getExpedition(exped);
     em = cm.getEventManager("HorntailBattle");
 
     if (mode == -1) {
         cm.dispose();
     } else {
         if (mode == 0) {
             cm.dispose();
             return;
         }
 
         if (status == 0) {
             if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                 cm.sendOk("你没有挑战" + expedBoss + "的资格!");
                 cm.dispose();
             } else if (expedition == null) { //Start an expedition
                 cm.sendSimple("#e#b<远征队: " + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想组建一支挑战#r" + expedBoss + "#k的远征队吗?\r\n#b#L1#让我们进去!#l\r\n\#L2#不,我们要准备一下...#l");
                 status = 1;
             } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                 if (expedition.isInProgress()) {
                     cm.sendOk("战斗已经开始了,祈祷他们可以安全出来.");
                     cm.dispose();
                 } else {
                     cm.sendSimple(list);
                     status = 2;
                 }
             } else if (expedition.isRegistering()) { //If the expedition is registering
                 if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                     cm.sendOk("你已经登记了远征队.请等#r" + expedition.getLeader().getName() + "#k开始.");
                     cm.dispose();
                 } else { //If you aren't in it, you're going to get added
                     cm.sendOk(expedition.addMember(cm.getPlayer()));
                     cm.dispose();
                 }
             } else if (expedition.isInProgress()) { //Only if the expedition is in progress
                 if (expedition.contains(player)) { //If you're registered, warp you in
                     var eim = em.getInstance(expedName + player.getClient().getChannel());
                     if(eim.getIntProperty("canJoin") == 1) {
                         eim.registerPlayer(player);
                     } else {
                         cm.sendOk("已经开始了与 " + expedBoss + "的战斗.祈祷他们能安全出来.");
                     }
                     
                     cm.dispose();
                 } else { //If you're not in by now, tough luck
                     cm.sendOk("其他远征队已经开始了与" + expedBoss + "的战斗,祈祷他们能安全出来.");
                     cm.dispose();
                 }
             }
         } else if (status == 1) {
             if (selection == 1) {
                 expedition = cm.getExpedition(exped);
                 if(expedition != null) {
                     cm.sendOk("已经有人申请了远征队.试试加入他们!");
                     cm.dispose();
                     return;
                 }
                 
                 var res = cm.createExpedition(exped);
                 if (res == 0) {
                     cm.sendOk("#r" + expedBoss + "远征队#k已经建立.\r\n\r\n与我对话开始战斗,或者查看远征队名单!");
                 } else if (res > 0) {
                     cm.sendOk("抱歉,今天的挑战次数已经用完了!明天再来吧...");
                 } else {
                     cm.sendOk("出现了BUG,请等待管理员修复.");
                 }
                 
                 cm.dispose();
                 return;
             } else if (selection == 2) {
                 cm.sendOk("当然,不是所有人都有资格挑战" + expedBoss + ".");
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
                 var text = "以下是所有远征队成员(点击踢出队伍):\r\n";
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
                     cm.sendOk("你需要至少" + min + "玩家在你的远征队.");
                     cm.dispose();
                     return;
                 }
                 
                 cm.sendOk("祝你们好运!神木村的希望就寄托在你们身上了.");
                 status = 4;
             } else if (selection == 3) {
                 player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + "结束了远征."));
                 cm.endExpedition(expedition);
                 cm.sendOk("远征结束了.最好快点离开这里.");
                 cm.dispose();
                 return;
             }
         } else if (status == 4) {
             if (em == null) {
                 cm.sendOk("事件加载失败,请向管理员汇报.");
                 cm.dispose();
                 return;
             }
 
             em.setProperty("leader", player.getName());
             em.setProperty("channel", player.getClient().getChannel());
             if(!em.startInstance(expedition)) {
                 cm.sendOk("其他队伍正在挑战" + expedBoss + ",祝他们好运.");
                 cm.dispose();
                 return;
             }
             
             cm.dispose();
             return;
         } else if (status == 6) {
             if (selection > 0) {
                 var banned = expedMembers.get(selection - 1);
                 expedition.ban(banned);
                 cm.sendOk("你把" + banned.getValue() + "移出了远征队.");
                 cm.dispose();
             } else {
                 cm.sendSimple(list);
                 status = 2;
             }
         }
     }
 }