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
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
    See the GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/*
	NPC NAME: Cesar (1)
	NPC ID: 2101018
	Author: Vcoc
	Function: AriantPQ
*/

status = -1;
function start() {
    if((cm.getPlayer().getLevel() < 19 || cm.getPlayer().getLevel() > 30) && !cm.getPlayer().isGM()){
        cm.sendNext("你等级不在20-30之间,不能参加比赛.");
        cm.dispose();
        return;
    }
    action(1,0,0);
}

function action(mode, type, selection){
    status++;
    if (status == 4){
        cm.getPlayer().saveLocation("MIRROR");
        cm.warp(980010000, 3);
        cm.dispose();
    }
    if(mode != 1){
        if(mode == 0 && type == 0)
            status -= 2;
        else{
            cm.dispose();
            return;
        }
    }
    if (status == 0)
        cm.sendNext("我在阿里安特为冒险岛最伟大的冒险家们准备了一个盛大的庆典.暂且称作#b阿里安特竞技赛#k.");
    else if (status == 1)
        cm.sendNextPrev("阿里安特竞技赛是怪物之间的技能竞赛. 在这里,你的任务不是打败怪物; 你需要#b降低怪物的血量,然后将怪物的灵魂封印到一块石头里面#k. #b最后获得最多灵魂石的玩家获得胜利.#k");
    else if (status == 2)
        cm.sendSimple("如果你是来自#b勇士部落#k的强大勇士,接受过武术教练的训练, 你应该会很感兴趣参加我们的比赛吧?!\r\n#b#L0#我想参加比赛.#l");
    else if (status == 3)
        cm.sendNext("好的,我现在把你送进竞技场. 我希望你能赢得比赛!");
}