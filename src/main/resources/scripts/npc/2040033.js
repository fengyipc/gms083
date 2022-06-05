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
        Neru - Ludibrium : Ludibrium Pet Walkway (220000006)
-- By ---------------------------------------------------------------------------------------------
        Xterminator
-- Version Info -----------------------------------------------------------------------------------
        1.1 - Second Version by Moogra
        1.0 - First Version by Xterminator
---------------------------------------------------------------------------------------------------
**/

function start() {
    if (cm.haveItem(4031128)) {
        cm.sendNext("哦呀...那不是我哥的信件嘛！这次是不是唠叨我不干活、偷懒的内容啊...啊？啊哈~你是听我哥的话，一边训练宠物，一边来到这里的吗？好耶！来得不容易，我就给你提高和宠物的亲密度吧！");
    } else {
        cm.sendOk("尽管哥哥在管理宠物障碍设备...但是由于和哥哥离得太远，所以总是想偷懒...呵呵...看样子呵呵看不见所以还可以再玩一会~");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    if (mode < 1) {
    } else if (cm.getPlayer().getNoPets() == 0)
        cm.sendNextPrev("哦...你不是和宠物一起来的呀？这是为了宠物设置的障碍物。连宠物都没有，你来这里干什么，赶紧回去吧~！");
    else {
        cm.gainItem(4031128, -1);
        cm.gainCloseness(4);
        cm.sendNextPrev("你怎么认为？你不觉得你和你的宠物关系更亲密了吗？如果你有时间，在这条障碍道上再训练你的宠物……当然，要得到我哥哥的允许。");
    }
    cm.dispose();
}