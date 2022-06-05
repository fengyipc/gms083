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
/* Yulete
	Yulete's Office (926100203)
	Magatia NPC
 */

var status;

importPackage(Packages.server.life);
        
function start() {
        status = -1;
        action(1, 0, 0);
}

function playersTooClose() {
        var npcpos = cm.getMap().getMapObject(cm.getNpcObjectId()).getPosition();
        var listchr = cm.getMap().getPlayers();
        
        for (var iterator = listchr.iterator(); iterator.hasNext();) {
                var chr = iterator.next();
                
                var chrpos = chr.getPosition();
                if(Math.sqrt( Math.pow((npcpos.getX() - chrpos.getX()), 2) + Math.pow((npcpos.getY() - chrpos.getY()), 2) ) < 310) return true;
        }
        
        return false;
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
                
                if(cm.getMapId() == 926100203) {
                        if(status == 0) {
                                var state = eim.getIntProperty("yuleteTalked");

                                if(state == -1) {
                                        cm.sendOk("呵呵, 看样子你们有同伴了.和他们玩的开心,我就离开了.");

                                } else if (playersTooClose()) {
                                        cm.sendOk("噢,你好.我在你们进来就一直在#b监视你们的行动#k.祝贺你们来到这里.现在,我有别的事情需要处理,得离开了.但别担心,我的#r助手#k会照顾你们.那么我就离开了.");

                                        eim.setIntProperty("yuleteTalked", -1);
                                } else if (eim.getIntProperty("npcShocked") == 0) {
                                        cm.sendOk("哈~你们不是很狡猾吗?好吧,这没关系.我在你们进来就一直在#b监视你们的行动#k.现在,我有别的事情需要处理,得离开了.但别担心,我的#r助手#k会照顾你们.那么我就离开了.");

                                        eim.setIntProperty("yuleteTalked", -1);
                                } else {
                                        cm.sendOk("... 哈哈!什么, 你怎么来到这里的?!我把这里的入口全关闭了!不管怎样，这种情况很快就会解决的.你们:戴上#r主武器#k!!你!对,就是你.你不觉得这就到此为止了，回头看看你的同伴，他们需要帮助！我现在要撤退了。");

                                        eim.setIntProperty("yuleteTalked", 1);
                                }
                        }
                        
                        cm.dispose();
                } else {
                        if(status == 0) {
                                if(eim.isEventCleared()) {
                                        cm.sendOk("不... 我被打败了? 那又怎么样? 我所做的一切都是为了发展一种更伟大的炼金术! 你不能把我关起来，我做了每个人站在我这样的地方都会做的事！但不，他们只是因为科学被认为是危险的而决定阻碍科学的发展？？？噢,来吧!");
                                } else {
                                        var state = eim.getIntProperty("yuletePassed");

                                        if(state == -1) {
                                                cm.sendOk("注意!这是马加提亚炼金术的巅峰! 哈哈哈哈哈...");
                                        } else if(state == 0) {
                                                cm.sendOk("你们真讨厌. 行吧,我会给你们展示最强炼金术打造的武器,#r氟化洛伊德#k.");
                                                eim.dropMessage(5, "Yulete: I present you my newest weapon, brought by the finest alchemy, Frankenroid!");

                                                var mapobj = eim.getMapInstance(926100401);
                                                var bossobj = MapleLifeFactory.getMonster(9300139);
                                                
                                                //mapobj.spawnMonsterWithEffect(bossobj, 13, new Packages.java.awt.Point(250, 100));
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 1);
                                                eim.setIntProperty("yuletePassed", -1);
                                        } else {
                                                cm.sendOk("You guys are such a pain, geez. Very well, I present you my newest weapon, brought by the finest combined alchemy of Alcadno's and Zenumist's, those that the boring people of Magatia societies have banned to bring along, the #rmighty Frankenroid#k!");
                                                eim.dropMessage(5, "Yulete: I present you my newest weapon, brought by the finest combined alchemy of Alcadno's and Zenumist's, those that the boring people of Magatia societies have banned to bring along, the mighty Frankenroid!!");

                                                var mapobj = eim.getMapInstance(926100401);
                                                var bossobj = MapleLifeFactory.getMonster(9300140);
                                                
                                                //mapobj.spawnMonsterWithEffect(bossobj, 14, new Packages.java.awt.Point(250, 100));
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 2);
                                                eim.setIntProperty("yuletePassed", -1);
                                        }
                                }
                        }
                        
                        cm.dispose();
                }
        }
}