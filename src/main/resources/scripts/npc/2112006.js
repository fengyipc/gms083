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

/**
 * @author: Ronan
 * @npc: Romeo
 * @func: MagatiaPQ area NPC
*/

var status;
 
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
                    
                var eim = cm.getEventInstance();
                
                if(!eim.isEventCleared()) {
                        if(status == 0) {
                                if(eim.getIntProperty("npcShocked") == 0 && cm.haveItem(4001131, 1)) {
                                        cm.gainItem(4001131, -1);
                                        eim.setIntProperty("npcShocked", 1);
                                        
                                        cm.sendNext("哦？你有我的信吗？在这样的时刻，应该是什么。。。喘气！有大事发生了，伙计们。振作起来，从现在开始事情会比以前更困难!");
                                        eim.dropMessage(6, "罗密欧读了朱丽叶的信后，似乎非常震惊.");
                                        
                                        cm.dispose();
                                        return;
                                } else if (eim.getIntProperty("statusStg4") == 1) {
                                        var door = cm.getMap().getReactorByName("rnj3_out3");
                                    
                                        if (eim.getIntProperty("complete") == 0) {
                                                cm.sendNext("让我帮你开门.");
                                                eim.setIntProperty("complete", 1);
                                                // cm.getPlayer().getMap().getReactorByName("jnr3_out3").setStat(1);
                                                //door.hitReactor(cm.getClient());
                                        } else {
                                                cm.sendNext("请快点，罗密欧有麻烦了.");
                                        }
                                        
                                        cm.dispose();
                                        return;
                                } else if (cm.haveItem(4001134, 1) && cm.haveItem(4001135, 1)) {
                                        if (cm.isEventLeader()) {
                                                cm.gainItem(4001134, -1);
                                                cm.gainItem(4001135, -1);
                                                cm.sendNext("太好了!卡帕莱特和蒙特鸠的实验资料都被你弄到手了.我们可以继续了.");

                                                eim.showClearEffect();
                                                eim.giveEventPlayersStageReward(4);
                                                eim.setIntProperty("statusStg4", 1);
                                                
                                                cm.getMap().killAllMonsters();
                                                cm.getMap().getReactorByName("rnj3_out3").hitReactor(cm.getClient());
                                        } else {
                                                cm.sendOk("请让你的队长把资料交给我.");
                                        }

                                        cm.dispose();
                                        return;
                                } else {
                                        cm.sendYesNo("我们必须继续战斗来拯救朱丽叶，请保持你的步伐。如果你不想继续下去，你的同伴和我会理解。。。所以，你要撤退吗?");
                                }
                        } else {
                                cm.warp(926100700, 0);
                                cm.dispose();
                        }
                } else {
                        if(status == 0) {
                                if(eim.getIntProperty("escortFail") == 0) {
                                        cm.sendNext("最后，朱丽叶安全了！多亏你的努力，我们才能把她从尤利特的手中解救出来，尤利特现在将因反叛马加蒂而受到审判。从现在起，他将开始康复，我们将继续关注他的努力，确保他不会再给未来带来麻烦.");
                                }
                                else {
                                        cm.sendNext("朱丽叶现在安全了，虽然战斗给她带来了损失。。。多亏你的努力，我们才能把她从尤利特的手中解救出来，尤利特现在将因反叛马加蒂而受到审判。谢谢你.");
                                        status = 2;
                                }
                        } else if(status == 1) {
                                cm.sendNext("现在，请接受这件礼物作为我们的感谢.");
                        } else if(status == 2) {
                                if(cm.canHold(4001159)) {
                                        cm.gainItem(4001159, 1);
                                        
                                        if(eim.getIntProperty("normalClear") == 1) cm.warp(926100600, 0);
                                        else cm.warp(926100500, 0);
                                } else {
                                        cm.sendOk("其他栏空间不足.");
                                }
                                
                                cm.dispose();
                        } else {
                                cm.warp(926100600, 0);
                                cm.dispose();
                        }
                }
        }
}