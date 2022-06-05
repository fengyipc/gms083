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
	Yulete's Office (926110203)
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
                
                if(cm.getMapId() == 926110203) {
                        if(status == 0) {
                                var state = eim.getIntProperty("yuleteTalked");

                                if(state == -1) {
                                        cm.sendOk("嘿，看来你们有伴了。跟他们玩得开心点，我就走了.");

                                } else if (playersTooClose()) {
                                        cm.sendOk("哦，你好。自从你们进入这个区域以来，我一直在监视你们的行动。我赞扬你们所有人，这是一项了不起的成就。现在，现在，看看时间，我现在有个约会，恐怕我需要请假。但别担心，我的种族继承人会处理你们所有人的。如果你允许，我现在就走.");

                                        eim.setIntProperty("yuleteTalked", -1);
                                } else if (eim.getIntProperty("npcShocked") == 0) {
                                        cm.sendOk("呵呵~你不是很狡猾吗？好吧，没关系。自从你们进入这个区域以来，我一直在监视你们的行动。我赞扬你们所有人，这是一项了不起的成就。现在，现在，看看时间，我现在有个约会，恐怕我需要请假。但别担心，我的种族继承人会处理你们所有人的。如果你允许，我现在就走.");

                                        eim.setIntProperty("yuleteTalked", -1);
                                } else {
                                        cm.sendOk("... 哈！什么，你怎么来的？！我想我已经封锁了这里所有的道路！不管怎样，这种情况很快就会解决。伙计们：部署武器！！你！是的，你。你不觉得这事到此为止吗，回头看看你的同伴，他们需要帮助！我现在要撤退了.");

                                        eim.setIntProperty("yuleteTalked", 1);
                                }
                        }
                        
                        cm.dispose();
                } else {
                        if(status == 0) {
                                if(eim.isEventCleared()) {
                                        cm.sendOk("Nooooo... 我被打了？但是怎么做呢？我所做的一切都是为了发展更伟大的炼金术！你不能把我关起来，我做了所有站在像我这样的地方的人都会做的事！但不，他们只是因为科学被认为是危险的，就决定阻碍它的发展？？？哦，来吧!");
                                } else {
                                        var state = eim.getIntProperty("yuletePassed");

                                        if(state == -1) {
                                                cm.sendOk("看到了嘛！马加提亚炼金术研究的顶峰! Hahahahahahaha...");
                                        } else if(state == 0) {
                                                cm.sendOk("你们真的很烦.行吧, 让你们看看最高级炼金术制造出来的究极武器, #r氟化洛伊德#k.");
                                                eim.dropMessage(5, "尤利特: 我把我最新的武器拿出来，是由最好的炼金术带来的，氟化洛伊德!");

                                                var mapobj = eim.getMapInstance(926110401);
                                                var bossobj = MapleLifeFactory.getMonster(9300151);
                                                mapobj.spawnMonsterOnGroundBelow(bossobj, new Packages.java.awt.Point(250, 100));

                                                eim.setIntProperty("statusStg7", 1);
                                                eim.setIntProperty("yuletePassed", -1);
                                        } else {
                                                cm.sendOk("你们真的很烦.行吧, 让你们看看最高级炼金术制造出来的究极武器, #r氟化洛伊德#k!");
                                                eim.dropMessage(5, "尤利特: 我把我最新的武器拿出来，是由最好的炼金术带来的，氟化洛伊德");

                                                var mapobj = eim.getMapInstance(926110401);
                                                var bossobj = MapleLifeFactory.getMonster(9300152);
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