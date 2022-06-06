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
	Author : Ronan Lana
*/

var status = -1;

function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            qm.dispose();
            return;
        }

        if (mode == 1)
            status++;
        else
            status--;
        
        
        if(qm.getQuestProgress(3927) == 0) {    // didn't find the wall yet, eh?
            qm.sendOk("你找到那堵墙了吗？仔细看，这堵墙比你想象的要近！");
            qm.dispose();
            return;
        }

        if (status == 0) {
            qm.sendSimple("你找到那堵墙了吗？\r\n#L0##b是的，但是。。。我不知道它在说什么。#l");
        } else if (status == 1) {
            qm.sendSimple("上面写了什么？\r\n#L0##b'如果我有铁锤和匕首，弓和箭……'#l\r\n#L1#'拜伦S2西琳'#l\r\n#L2#'啊，我忘了。'");
        } else if (status == 2) {
            if(selection == 0) {
                qm.sendOk("如果我有铁锤和匕首。。。弓和箭。。。那是什么意思？你想让我告诉你吗？我不认识我自己。这是你应该考虑的事情。如果你需要线索。。。它会像。。。武器只是一件物品。。。直到有人用它。。。？");
            } else if(selection == 1) {
                qm.sendOk("伙计，吉尤又在墙上写了！啊！！");
                qm.dispose();
                return;
            } else {
                qm.sendOk("什么？你忘了？你还记得它是在哪里写的吗？");
                qm.dispose();
                return;
            }
        } else if (status == 3) {
            qm.gainExp(1000);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}