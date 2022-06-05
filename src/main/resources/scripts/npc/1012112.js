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
/**
 * @author BubblesDev
 * @author Ronan
 * @NPC Tory
 */

 var status = 0;
 var em = null;
 
 function start() {
     status = -1;
     action(1, 0, 0);
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
 
         if (cm.getMapId() == 100000200) {
             if (status == 0) {
                 em = cm.getEventManager("HenesysPQ");
                 if (em == null) {
                     cm.sendOk("出错了.");
                     cm.dispose();
                     return;
                 } else if (cm.isUsingOldPqNpcStyle()) {
                     action(1, 0, 0);
                     return;
                 }
 
                 cm.sendSimple("#e#b<组队任务:月妙的年糕>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n我是#p1012112#. 里面有一个长满迎月花的山丘.山丘上有一只老虎, 他看起来像在找食物.你想进去抵抗怪物帮助我们吗?#b\r\n#L0#我想参加组队任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索.\r\n#L2#我想知道更多细节.\r\n#L3#我想要获得年糕帽子.");
             } else if (status == 1) {
                 if (selection == 0) {
                     if (cm.getParty() == null) {
                         cm.sendOk("这里独自一个人无法参加.");
                         cm.dispose();
                     } else if (!cm.isLeader()) {
                         cm.sendOk("如果你想进去,让队长来和我对话.");
                         cm.dispose();
                     } else {
                         var eli = em.getEligibleParty(cm.getParty());
                         if (eli.size() > 0) {
                             if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                 cm.sendOk("已经有人开始了,请等会儿或者去别的频道.");
                             }
                         }
                         else {
                             cm.sendOk("队伍人数不足,或有人不能参加.");
                         }
 
                         cm.dispose();
                     }
                 } else if (selection == 1) {
                     var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                     cm.sendOk("队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.");
                     cm.dispose();
                 } else if (selection == 2) {
                     cm.sendOk("#e#b<组队任务:迎月花山丘>#k#n\r\n收集迎月花种子.把不同颜色的种子放在对应的平台上.当所有话都开出来,月妙就会出现,他会慢慢地制作年糕.在他制作过程中保护他的安全.");
                     cm.dispose();
                 } else {
                     cm.sendYesNo("你想用#b20个#t4001158##k换#b#z1002798##k?");
                 }
             } else {
                 if (cm.hasItem(4001158, 20)) {
                     if (cm.canHold(1002798)) {
                         cm.gainItem(4001158, -20);
                         cm.gainItem(1002798);
                         cm.sendNext("给你吧!");
                     }
                 } else {
                     cm.sendOk("你的#t4001158#不够!");
                 }
                 cm.dispose();
             }
         } else if (cm.getMapId() == 910010100) {
             if (status == 0) {
                 cm.sendYesNo("谢谢你,现在要返回射手村吗?");
             } else if (status == 1) {
                 if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                     cm.warp(100000200);
                 }
                 else {
                     cm.sendOk("看样子你的背包空间不足");
                 }
                 cm.dispose();
             }
         } else if (cm.getMapId() == 910010400) {
             if (status == 0) {
                 cm.sendYesNo("回射手村吗?");
             } else if (status == 1) {
                 if (cm.getEventInstance() == null) {
                     cm.warp(100000200);
                 } else if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                     cm.warp(100000200);
                 } else {
                     cm.sendOk("看样子你的背包空间不足.");
                 }
                 cm.dispose();
             }
         }
     }
 }