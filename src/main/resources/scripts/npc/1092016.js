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
        Author : XxOsirisxX (BubblesDev)
        NPC Name:               Shiny Stone
*/

function start() {
    if(cm.isQuestStarted(2166)) {
        cm.sendNext("这是一块美丽、闪亮的岩石。我能感觉到它周围的神秘力量。");
        cm.completeQuest(2166);
    } else
        cm.sendNext("我用手触摸那块闪亮的石头，我感觉到一股神秘的力量在流入我的身体。");
    cm.dispose();
}