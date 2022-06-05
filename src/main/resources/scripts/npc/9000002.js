/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }else if (mode == 0){
        cm.dispose();
    }else{
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            cm.sendNext("呯 呯 呯 呯!!你在活动的游戏中获得了胜利.恭喜你!");
        } else if (status == 1) {
            cm.sendNext("你将获得#b神秘卷轴#k.这个卷轴上用古老的字符写这神秘的信息.");
        } else if (status == 2) {
            cm.sendNext("你可以去找玩具城的#rChun Ji#k或者\r\n#rGeanie#k鉴定卷轴.");
        } else if (status == 3) {
        if (cm.canHold(4031019)) {
            cm.gainItem(4031019);
            cm.warp(cm.getPlayer().getSavedLocation("EVENT"));
            cm.dispose();
        } else {
            cm.sendNext("你其他栏满了");
        }
        } else if (status == 4) {
            cm.dispose();
        }
    }
}  
