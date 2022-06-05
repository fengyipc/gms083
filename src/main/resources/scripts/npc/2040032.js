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
	Weaver - Ludibrium : Ludibrium Pet Walkway (220000006)
-- By ---------------------------------------------------------------------------------------------
	Xterminator
-- Version Info -----------------------------------------------------------------------------------
	1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
    cm.sendYesNo("这里是，可以与宠物一同散步的散步路。只是散步，再回去也可以，但是也可以进行穿越过各个地方障碍物的训练。尽管如果还没有和宠物熟悉起来，可能不大听使唤。怎么样？想不想给宠物进行训练啊？");
}

function action(mode, type, selection) {
    if (mode == -1){
    } else if (mode == 0) {
        cm.sendNext("哦...现在没有空的样子啊？但是只要改变心意的话，请随时可以来找我~！");
    } else if (mode == 1) {
        if (cm.haveItem(4031128))
            cm.sendNext("把那封信件与宠物一起，穿越过障碍物上去，交给我弟弟奈勒。只要转达信件，肯定会有对宠物好的事情。");
        else {
            cm.gainItem(4031128, 1);
            cm.sendOk("来，请收下这封信件吧！因为直接过去的话，没有人会知道是我叫你去的...和宠物一起穿越过障碍物，攀升到定点之后，找我弟弟#b奈勒#k说话，并把信件交给他。跟宠物一同旅行，不会有什么问题的。那加油哦！");
        }
    }
    cm.dispose();
}