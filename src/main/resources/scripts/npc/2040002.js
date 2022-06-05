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
/* Olson the Toy Soldier
	2040002

map: 922000010
quest: 3230
escape: 2040028
*/

var status = 0;
var em;

function start() {
    if (cm.isQuestStarted(3230)) {
        em = cm.getEventManager("DollHouse");

        if (em.getProperty("noEntry") == "false") {
            cm.sendNext("闹钟藏在玩具屋里,它看着与众不同.");
        }
        else {
            cm.sendOk("其他人正在搜寻这里.请等里面没人了再去");
            cm.dispose();
        }
    }
    else {
        cm.sendOk("我不允许没事人的人通过这里.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1)
        cm.dispose();
    else {
        status++;
        if (status == 1) 
            cm.sendYesNo("要进去吗?");
        else if (status == 2) {
            var em = cm.getEventManager("DollHouse");
            if (!em.startInstance(cm.getPlayer())) {
                cm.sendOk("里面有人了.");
            }
            
            cm.dispose();
        }
    }
}