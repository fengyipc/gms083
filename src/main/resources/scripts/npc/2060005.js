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
        @Author Ronan

        2060005 - Kenta
	Enter 3rd job mount event
**/

function start() {
    if(cm.isQuestCompleted(6002)) {
        cm.sendOk("谢谢你拯救了小香猪.");
    }
    else if(cm.isQuestStarted(6002)) {
        if (cm.haveItem(4031507, 5) && cm.haveItem(4031508,5)) {
            cm.sendOk("谢谢你拯救了小香猪.");
        } else {
            var em = cm.getEventManager("3rdJob_mount");
            if (em == null)
                cm.sendOk("抱歉,但是三转坐骑功能目前没有开放.");
            else {
                if (em.startInstance(cm.getPlayer())) {
                    cm.removeAll(4031507);
                    cm.removeAll(4031508);
                } else {
                    cm.sendOk("里面有人了,等会再来吧.");
                }
            }
        }
    }
    else {
        cm.sendOk("只有几个被选中冒险家有资格保护小香猪");
    }
    
    cm.dispose();
}