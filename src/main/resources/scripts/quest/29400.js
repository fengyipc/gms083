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
	Author : 		kevintjuh93
	Description: 		Quest - Veteran Hunter
	Quest ID : 		29400
*/

var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
			qm.sendNext("准备好了记得回来找我.");
		
		    qm.dispose();
		    return;
	}
		if (status == 0)
			qm.sendAcceptDecline("#v1142004# #e#b#z1142004##k\r\n\r - 限时 30 天\r - 击杀 100,000 只怪物\r #n *只有和你等级相同或者更高的怪物才算.\r\n你想要挑战获取这个勋章吗?");
		else if (status == 1) {
			qm.sendNext("当前排名\r\n1. #bMoople#k : #r538,673#k monsters\r\n2. #bZeroQuanta#k : #r111,421#k monsters\r\n不要忘记了每个月都会重置记录.");//TODO
	        } else if (status == 2) {
			qm.sendNextPrev("我将在接下来30天记录你的打怪数量.当你完成了挑战,记得回来找我. 记住, 你必须在规定时间以内找我才可以. 当然,在进行这项挑战时期是不可以挑战其他勋章的.");
		} else if (status == 3) {
			qm.forceStartQuest();
			qm.dispose();
		}
}


function end(mode, type, selection) {
	java.lang.System.out.println("x")
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0) return;	    
		else{
		    qm.dispose();
			return;
		}		
		if (status == 0) {
			qm.sendOk("Not coded yet.");
			qm.dispose();
		}
	}
}
