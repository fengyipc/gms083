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
 *2013002.js - Minerva the Goddess
 *@author Ronan
 */
 var status = 0;

 var 积分 = 5;
 var PQtype = "女神塔完成";
 function start() {
     status = -1;
     action(1, 0, 0);
 }
 
 function action(mode, type, selection) {
     if (mode < 1)
         cm.dispose();
     else {
         status++;
         if (cm.getPlayer().getMapId() == 920010100) { //Center tower
             if (status == 0)
                 cm.sendYesNo("我已经解除了阻止进入塔楼监狱仓库的咒语。你可能会在下面找到一些好吃的东西。。。或者，你可能想现在就离开。你准备好离开了吗？");
             else if (status == 1) {
                 cm.warp(920011300, 0);
                 cm.dispose();
             }
 
         } else if (cm.getPlayer().getMapId() == 920011100) {
             if (status == 0)
                 cm.sendYesNo("So, are you ready to exit?");
             else if (status == 1) {
                 cm.warp(920011300, 0);
                 cm.dispose();
             }
 
         } else if (cm.getPlayer().getMapId() == 920011300) {
             if (status == 0)
                 cm.sendNext("感谢你不仅修复了雕像，还把我救了出来，米涅瓦。愿女神的祝福与你同在直到最后。。。为了表示感谢，请收下这张纪念你勇敢的纪念物。");
             else if (status == 1) {
                 if (cm.getPlayer().getBossLog(0, PQtype) == 0) {
                     cm.getPlayer().setBossLog(0, PQtype);
                     cm.getPlayer().setBossLog(-1, "组队挑战积分", 积分);
                 }
                 if (cm.getEventInstance().giveEventReward(cm.getPlayer())) {
                     cm.warp(200080101, 0);
                     cm.dispose();
                 }
                 else {
                     cm.sendOk("背包空间不足.");
                     cm.dispose();
                 }
             }
         }
     }
 }