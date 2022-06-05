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

function start() {
    if(cm.haveItem(4031045)){
        var em = cm.getEventManager("Genie");
        if (em.getProperty("entry") == "true") {
            cm.sendYesNo("路途漫长, 你需要做好充分准备,如果还有什么事没处理先处理了再来.现在就要出发吗?");
        } else {
            cm.sendOk("精灵已经离开了. 抱歉你需要等待他回来.");
            cm.dispose();
        }
    } else {
        cm.sendOk("你好像没有买票.");
        cm.dispose();
    }
}
function action(mode, type, selection) {
    if (mode <= 0) {
	cm.sendOk("好吧, 如果想改变主意了来找我!");
        cm.dispose();
	return;
    }
    
    var em = cm.getEventManager("Genie");
    if (em.getProperty("entry") == "true") {
        cm.warp(260000110);
        cm.gainItem(4031045, -1);
    }
    else {
        cm.sendOk("精灵已经离开了. 抱歉你需要等待他回来.");
    }
    
    cm.dispose();
}