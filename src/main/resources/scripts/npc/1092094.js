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
status = -1;

function start() {
    if(cm.haveItem(4031847))
        cm.sendNext("饥饿的牛犊正在喝所有的牛奶！瓶子空了。。。");
    else if(cm.haveItem(4031848) || cm.haveItem(4031849) || cm.haveItem(4031850)){
        cm.sendNext("饥饿的牛犊正在喝所有的牛奶！瓶子空了。。。");
        if(cm.haveItem(4031848))
            cm.gainItem(4031848,-1);
        else if(cm.haveItem(4031849))
            cm.gainItem(4031849, -1);
        else
            cm.gainItem(4031850, -1);
        cm.gainItem(4031847, 1);
        cm.dispose();
    }
}

function action(mode, type, selection){
    if(mode == -1)
        cm.dispose();
    else if(mode == 0){
        status--;
        start();
    }else
        status++;
    if(status == 0)
        cm.sendPrev("牛犊对空瓶子不感兴趣.");
    else if(status == 1)
        cm.dispose();
}