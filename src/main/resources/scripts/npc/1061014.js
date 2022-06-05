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
/*
 *
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
 var exped = MapleExpeditionType.BALROG_NORMAL;
 var expedName = "蝙蝠怪";
 var expedBoss = "蝙蝠怪";
 var expedMap = "蝙蝠怪的墓地";
 
 var list = "你想做什么？#b\r\n\r\n#L1#查看当前远征队成员#l\r\n#L2#开始战斗！#l\r\n#L3#停止远征#l";
 
 function start() {
     action(1, 0, 0);
 }
 
 function action(mode, type, selection) {
 
     player = cm.getPlayer();
     expedition = cm.getExpedition(exped);
     em = cm.getEventManager("BalrogBattle");
 
     if (mode == -1) {
         cm.dispose();
     } else {
         if (mode == 0) {
             cm.dispose();
             return;
         }
 
         if (status == 0) {
             if (player.getLevel() < exped.getMinLevel() || player.getLevel() > exped.getMaxLevel()) { //Don't fit requirement, thanks Conrad
                 cm.sendOk("你不符合挑战" + expedBoss + "的要求!");
                 cm.dispose();
             } else if (expedition == null) { //Start an expedition
                 cm.sendSimple("#e#b<远征队:" + expedName + ">\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你想组建一支队伍击败#r" + expedBoss + "#k吗?\r\n#b#L1#让我们开始吧！#l\r\n\#L2#不，我想我会等一会儿。#l\r\n\#L3#我想看看关于这次远征队的信息。#l");
                 status = 1;
             } else if (expedition.isLeader(player)) { //If you're the leader, manage the exped
                 if (expedition.isInProgress()) {
                     cm.sendOk("你们的远征已经在进行中了，为了那些仍在战斗的人们，让我们为那些勇敢的灵魂祈祷吧。");
                     cm.dispose();
                 } else {
                     cm.sendSimple(list);
                     status = 2;
                 }
             } else if (expedition.isRegistering()) { //If the expedition is registering
                 if (expedition.contains(player)) { //If you're in it but it hasn't started, be patient
                     cm.sendOk("你已经登记参加远征队了。请等待#r" + expedition.getLeader().getName() + "#k开始.");
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
                         cm.sendOk("你的远征队已经开始与" + expedBoss + "的战斗.让我们为那些勇敢的灵魂祈祷.");
                     }
                     
                     cm.dispose();
                 } else { //If you're not in by now, tough luck
                     cm.sendOk("另一支远征队已经开始挑战" + expedBoss + ".");
                     cm.dispose();
                 }
             }
         } else if (status == 1) {
             if (selection == 1) {
                 expedition = cm.getExpedition(exped);
                 if(expedition != null) {
                     cm.sendOk("已经有人申请了远征队的队长。试着加入他们！");
                     cm.dispose();
                     return;
                 }
                 
                 var res = cm.createExpedition(exped);
                 if (res == 0) {
                     cm.sendOk("#r" + expedBoss + "远征队#k申请成功。\r\n\r\n与我交谈并开始战斗吧！");
                 } else if (res > 0) {
                     cm.sendOk("对不起，你已经达到远征的上限！改天再试。。。");
                 } else {
                     cm.sendOk("开始远征时发生意外错误，请稍后再试。");
                 }
                 
                 cm.dispose();
                 return;
             } else if (selection == 2) {
                 cm.sendOk("当然，不是每个人都能挑战" + expedBoss + ".");
                 cm.dispose();
                 return;
             } else {
                 cm.sendSimple("你好。我是#b#n无影#n#k，寺庙的看守人。这座寺庙目前正被蝙蝠怪包围。我们目前不知道是谁下的命令。" +
                 "几个星期以来#e#b特利斯坦#n#k一直派遣雇佣军阻止蝙蝠怪复活，但每次都被蝙蝠怪消灭了。" +
                 "所以，冒险者，你想试试你的运气来战胜这无法形容的恐怖吗？\r\n  #L1#什么是#e特利斯坦?");
                     
                 status = 10;
             }
         } else if (status == 2) {
             if (selection == 1) {
                 if (expedition == null) {
                     cm.sendOk("远征队无法加载。");
                     cm.dispose();
                     return;
                 }
                 expedMembers = expedition.getMemberList();
                 var size = expedMembers.size();
                 if (size == 1) {
                     cm.sendOk("你是远征队的唯一成员。");
                     cm.dispose();
                     return;
                 }
                 var text = "你的远征队有如下这些成员(点击并移除成员):\r\n";
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
                     cm.sendOk("你至少需要" + min + "名远征队成员.");
                     cm.dispose();
                     return;
                 }
                 
                 cm.sendOk("远征队即将开始，你将被传送到#b" + expedMap + "#k.");
                 status = 4;
             } else if (selection == 3) {
                 player.getMap().broadcastMessage(MaplePacketCreator.serverNotice(6, expedition.getLeader().getName() + " has ended the expedition."));
                 cm.endExpedition(expedition);
                 cm.sendOk("远征队现在已经结束了。");
                 cm.dispose();
                 return;
             }
         } else if (status == 4) {
             if (em == null) {
                 cm.sendOk("无法初始化事件，请报告错误。");
                 cm.dispose();
                 return;
             }
 
             em.setProperty("leader", player.getName());
             em.setProperty("channel", player.getClient().getChannel());
             if(!em.startInstance(expedition)) {
                 cm.sendOk("已经有远征队在挑战" + expedBoss + ".");
                 cm.dispose();
                 return;
             }
             
             cm.dispose();
             return;
         } else if (status == 6) {
             if (selection > 0) {
                 var banned = expedMembers.get(selection - 1);
                 expedition.ban(banned);
                 cm.sendOk("移除了" + banned.getValue() + ".");
                 cm.dispose();
             } else {
                 cm.sendSimple(list);
                 status = 2;
             }
         } else if (status == 10) {
             cm.sendOk("特利斯坦负责监督世界经济和作战行动。它成立于40年前，就在黑魔法师被击败后。");
             cm.dispose();
         }
     }
 }
 