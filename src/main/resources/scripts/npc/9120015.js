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

/**
-- Odin JavaScript --------------------------------------------------------------------------------
	Konpei - Showa Town(801000000)
-- By ---------------------------------------------------------------------------------------------
	Information
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Fixed by Moogra
	1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/
var status = 0;
function start() {
    //cm.sendSimple ("我能帮助你些什么呢？\r #L0##b请告诉我一些关于<火狸金融>的信息。#l\r\n#L1#请将我送入<火狸金融>。#l\r\n#L2#谢谢你，没事儿。#l#k");
      cm.sendSimple ("有什么事吗？\r #L0##b听取有关基地的说明。#l\r\n#L1#将我送往基地。#l\r\n#L2#没什么事情耶~#l#k");
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            if (selection == 0) {
                cm.sendNext("我可以带你去据点，但那里到处都是找麻烦的家伙，你最好下定决心再去。在据点大楼，有个大亲分掌管着这附近的头目们。去他的据点倒是很容易，但据点大楼最顶端的房间是个可怕的地方。不宜久留，尽量短时间内就解决他们！那个大亲分也不是一般的人，可是在见到大亲分之前，还有很多实力很强的家伙，真是又够麻烦的啊。");
                cm.dispose();
            } else if (selection == 1)
                cm.sendNext("哦，勇者啊。如果继续放任他们不管，就无法挽回了。在那之前，用你的力量惩罚他们，千万不要大意，大亲分是很多勇者都敌不过的人，但是看着你的眼睛，我确信你一定会成功的。");
            else {
                cm.sendOk("我是一个忙碌的人！离我远一点！");
                cm.dispose();
            }
        } else {
            cm.warp(801040000, "in00");
            cm.dispose();
        }
    }
}