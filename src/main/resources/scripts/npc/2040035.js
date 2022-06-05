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
/* @author: Ronan
 * 
 * Arturo
	Abandoned Tower <Determine to Adventure> (922011100)
	Gives LudiPQ Reward.
 */
 
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode < 0)
                cm.dispose();
        else {
                if (mode == 1)
                        status++;
                else
                        status--;
                if (status == 0 && mode == 1) {
                        cm.sendNext("你们关闭了时间裂隙!为了表示感谢,请收下我的礼物.");
                } else if(status == 1) {
                        var eim = cm.getEventInstance();
                    
                        if(!eim.giveEventReward(cm.getPlayer())) {
                                cm.sendNext("你的背包空间不足,清理以后再找我");
                        } else {
                                cm.warp(221024500);
                        }

                        cm.dispose();
                }
        }
}