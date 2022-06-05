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
/*	
	Author: Traitor, XxOsirisxX, Moogra
*/

/**
 * Dojo Entrance NPC
 */
 var status = -2;
 var readNotice = 0;
 
 function start() {
     cm.sendSimple("#e< 警告 >#n\r\n如果有任何人有勇气挑战武陵道场,放马过来.  - 武公 -\r\n\r\n\r\n#b#L0#挑战武陵道场.#l\r\n#L1#查看警告.#l");
 }
 
 function action(mode, type, selection) {
     status++;
     if(mode == 0 && type == 0)
         status -= 2;
     if (mode >= 0) {
         if (selection == 1 || readNotice == 1) {
             if (status == -1) {
                 readNotice = 1;
                 cm.sendNext("#e< 注意 : 接受挑战! >#n\r\n我是武公, 我建造了武陵塔. 从很久以前，我一直在武陵训练,现在我的技能达到了顶峰. 从今天开始，我将接受任何挑战. 武陵道场将给最强的人奖励。\r\n如果有任何人想找我切磋,随时来挑战就行了!我会让你了解自己的弱点.");
             } else if (status == 0)
                 cm.sendPrev("PS:你可以独自挑战我,但是如果你没有那个勇气,你也可以叫上朋友一起来挑战我.");
             else
                 cm.dispose();
         } else {
             if (status == -1 && mode == 1) {
                 cm.sendYesNo("(当我把手放在布告栏上时，一股神秘的能量开始笼罩着我。)\r\n\r\n想去武陵道场吗?");
             } else if (status == 0) {
                 if (mode == 0) {
                     cm.sendNext("#b(当我把手从布告板上拿开时，覆盖着我的神秘能量也消失了。)");
                 } else {
                     cm.getPlayer().saveLocation("MIRROR");
                     cm.warp(925020000, 4);
                 }
                 cm.dispose();
             }
         }
     } else
         cm.dispose();
 }