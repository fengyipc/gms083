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
        Author : Generic (http://cronusemu.net)
        NPC Name:               Dalair
        Map(s):                 Every town
        Description:            Quest - Title Challenge - Celebrity!
        Quest ID :              29002
*/
var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.sendNext("准备好了就回来找我吧.");
        qm.dispose();
    } else {
        if (mode > 0)
            status++;
        else
            status--;
        if (status == 0) {// Picture of Celebrity Medal(+blue text "Celebrity Medal"
            qm.sendAcceptDecline("#v1142003# #e#b#z1142003##k \r\n- 限时 30 天 \r\n- 需要: 人气提升1000 \r\n#n想要挑战这个头衔吗?");
        } else if (status == 1) {
            qm.sendNext("我会给你30天时间来完成目标.当你完成了回来找我.");
            qm.forceStartQuest();
        }

    }
        
}
function end(){
	qm.gainItem(1142003);
	qm.sendNext("不可思议!你居然完成了!收好勋章,这是你实力的证明!");
	qm.forceCompleteQuest();
	qm.dispose();
}