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
 *9201003.js - Mom and Dad
 *@author Jvlaple
 *@author Ronan
 */
 var numberOfLoves = 0;
 var status = -1;
 var state = 0;
 
 function hasProofOfLoves(player) {
     var count = 0;
     
     for(var i = 4031367; i <= 4031372; i++) {
         if(player.haveItem(i)) {
             count++;
         }
     }
     
     return count >= 4;
 }
 
 function start() {
     status = -1;
     action(1, 0, 0);
 }
 
 function action(mode, type, selection) {
     if (mode == -1) {
         cm.dispose();
     } else {
         if (mode == 0 && type > 0) {
             cm.dispose();
             return;
         }
         if (mode == 1)
             status++;
         else
             status--;
 
         if (status == 0) {
             if (!cm.isQuestStarted(100400)) {
                 cm.sendOk("...");
                 cm.dispose();
             } else {
                 if (cm.getQuestProgressInt(100400, 1) == 0) {
                     cm.sendNext("我需要你们的同意... 我想知道更多关于你一直走的路，爱和关心我所爱的人的路.", 2);
                 } else {
                     if(!hasProofOfLoves(cm.getPlayer())) {
                         cm.sendOk("亲爱的，我们需要确保你真的准备好爱上任何你选择做你的伴侣的人, 请带来#b4个#z4031367##k.");
                         cm.dispose();
                     } else {
                         cm.sendNext("#b#h0##k,你是我们的荣耀.你现在获得了#r我们的祝福#k,然后可以选择你的伴侣了.现在去找#p9201000#~~");
                         state = 1;
                     }
                 }
             }
         } else if (status == 1) {
             if (state == 0) {
                 cm.sendNextPrev("亲爱的!你请我们帮忙真聪明.我们会帮你!");
             } else {
                 cm.sendOk("非常感谢你们的大力支持!!!", 2);
                 
                 cm.completeQuest(100400);
                 cm.gainExp(20000 * cm.getPlayer().getExpRate());
                 for(var i = 4031367; i <= 4031372; i++) {
                     cm.removeAll(i);
                 }
                 
                 cm.dispose();
             }
         } else if (status == 2) {
             cm.sendNextPrev("你一定接触过#r#p9201001#,爱情妖精#k.收集#b4个#t4031367##k带过来...");
         } else if (status == 3) {
             cm.setQuestProgress(100400, 1, 1);
             cm.dispose();
         }
     }
 }