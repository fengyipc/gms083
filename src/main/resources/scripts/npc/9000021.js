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
/* 9000021 - Gaga
    BossRushPQ recruiter
    @author Ronan
 */

var status;
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            cm.sendNext("嘿，旅行者！我是#p9000021#，我的工作是招募像你这样每天都渴望新挑战的旅行者。现在，我的小队正在举办一场彻底考验你这样的冒险者的身心能力的比赛。");
	} else if(status == 1) {
            cm.sendNext("这些比赛涉及#b连续的Boss战#k，在某些关卡之间有一些休息点。这些休息点将提供时间进行策略调整和补充手头的补给，因为它们不是常见的战斗。");
        } else if(status == 2) {
            cm.sendAcceptDecline("如果你觉得自己足够强大，你可以像和你一样的其他人一样加入比赛。 ... 那么，你怎么决定？你要现在去举行比赛的地方吗？");
        } else if(status == 3) {
            cm.sendOk("很好。请记住，您可以在那里组建队伍或独自参加战斗，这取决于您。祝你好运！");
        } else if(status == 4) {
            cm.getPlayer().saveLocation("BOSSPQ");
            cm.warp(970030000, "out00");
            cm.dispose();
        }
    }
}