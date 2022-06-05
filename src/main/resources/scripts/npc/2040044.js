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
@	Author : Twdtwd
@       Author : Ronan
@
@	NPC = Violet Balloon
@	Map = Hidden-Street <Crack on the Wall>
@	NPC MapId = 922010900
@	Function = LPQ - Last Stage
@
@	Description: Used after the boss is killed to trigger the bonus stage.
*/

var status = 0;
var curMap, stage;

function start() {
    curMap = cm.getMapId();
    stage = Math.floor((curMap - 922010100) / 100) + 1;
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
            if (mode == -1) {
            cm.dispose();
        } else if (mode == 0){
            cm.dispose();
        } else {
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                var eim = cm.getPlayer().getEventInstance();
                
                if(eim.getProperty(stage.toString() + "stageclear") != null) {
                        cm.sendNext("赶快,传送门打开了,去下一关吧!");
                }
                else {
                        if (eim.isEventLeader(cm.getPlayer())) {
                                var state = eim.getIntProperty("statusStg" + stage);

                                if(state == -1) {           // preamble
                                        cm.sendOk("欢迎来到#bBOSS关卡#k.杀了那个平台上的拉茨，揭露出艾莉莎，打败他!");
                                        eim.setProperty("statusStg" + stage, 0);
                                }
                                else {                      // check stage completion
                                        if (cm.haveItem(4001023, 1)) {
                                                cm.gainItem(4001023, -1);
                                                eim.setProperty("statusStg" + stage, 1);
                                                
                                                var list = eim.getClearStageBonus(stage);     // will give bonus exp & mesos to everyone in the event
                                                eim.giveEventPlayersExp(list.get(0));
                                                eim.giveEventPlayersMeso(list.get(1));
                                                
                                                eim.setProperty(stage + "stageclear", "true");
                                                eim.showClearEffect(true);
                                                
                                                eim.clearPQ();
                                        } else {
                                                cm.sendNext("请打败它带来#b#t4001023#.#k");
                                        }
                                }
                        } else {
                                cm.sendNext("让队长来.");
                        }
                }
                
                cm.dispose();
        }
}
