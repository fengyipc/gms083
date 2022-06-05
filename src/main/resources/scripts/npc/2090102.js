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

/* Romi
	Orbis Skin Change.
*/
var status = 0;
var price = 1000000;
var skin = Array(0, 1, 2, 3, 4);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("好吧，你好！欢迎来到武陵护肤中心！你想拥有像我一样结实、紧致、健康的皮肤吗？如果你有#b#t5153006##k,就可以更换你想要的皮肤了!\r\n#L2#使用: #i5153006##t5153006##l");
        } else if (status == 1) {
            if (selection == 2) {
                cm.sendStyle("你可以预先观看护肤后的效果。你想做什么样的皮肤护理？选择你喜欢的风格!", skin);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5153006)){
                cm.gainItem(5153006, -1);
                cm.setSkin(skin[selection]);
                cm.sendOk("好了!");
            } else {
                cm.sendOk("抱歉，你没有我们的会员卡，我们无法对你的肤色进行更换");
            }
        }
    }
}
