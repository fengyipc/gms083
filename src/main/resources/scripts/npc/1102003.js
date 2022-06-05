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
 * @author BubblesDev
 * @author Rich - text
 * @author Ronan - PNPCs
 */

var status = 0;
var spawnPnpc = false;
var spawnPnpcFee = 7000000;
var minJobType = 11;
var maxJobType = 15;

function start() {
    var jobType = parseInt(cm.getJobId() / 100);
    if (jobType >= minJobType && jobType <= maxJobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "你已经修炼了很久，才能达到今天的力量、智慧和勇气，不是吗？你想在#r名人堂里留下你的位置吗#k?你喜欢吗?";
        if(spawnPnpcFee > 0) {
            sendStr += "我可以为你做一塑雕像，需要花费#b " + cm.numberWithCommas(spawnPnpcFee) + "金币.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        cm.sendOk("欢迎来到荣耀大厅.");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("对不起,你没有足够的金币.");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("害了,希望你喜欢.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("对不起,没位置了 ...");
                }
            }
            
            cm.dispose();
            return;
        } else {
            // do nothing
        }
    }
}