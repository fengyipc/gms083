/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
 * @npc: Mark of the Squad
 * @map: Cave of Life - Cave Entrance (240050000)
 * @func: Horntail PQ
*/

var status = 0;
var price = 100000;
var em = null;
var hasPass;

function isRecruitingMap(mapid) {
        return mapid == 240050000;
}

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
                
                if(isRecruitingMap(cm.getMapId())) {
                        if (status == 0) {
                                em = cm.getEventManager("HorntailPQ");
                                if(em == null) {
                                        cm.sendOk("黑龙组队任务出现了错误.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务:黑暗龙王的审判>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n这是去往黑暗龙王巢穴的通道.如果你想挑战它,你的团队必须接受测试.#b\r\n#L0#让我们进行挑战.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "队伍搜索.\r\n#L2#我想知道细节.");
                        } else if (status == 1) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("必须组队参加.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("你的队长才可以开始任务.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("其他队伍正在挑战了,请等他们出来或去其他频道看看.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("你的队伍人数不足或者有人等级不满足条件!");
                                                }

                                                cm.dispose();
                                        }
                                } else if(selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你当前队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k. ");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务:黑暗龙王的审判>#k#n\r\n作为黑暗龙王的看门人,我只会允许#b得到他允许#k的人进入.即便是对有资格的人来说,里面的通道也是充满岔路,挑战.然鹅,#r擅长战斗#k有更好的机会.");
                                        cm.dispose();
                                }
                        }
                } else {
                        if(!cm.isEventLeader()) {
                                cm.sendOk("只有队长才可以互动.");
                        } else if(cm.getMapId() == 240050100) {
                                if(cm.haveItem(4001087) && cm.haveItem(4001088) && cm.haveItem(4001089) && cm.haveItem(4001090) && cm.haveItem(4001091)) {
                                        cm.gainItem(4001087, -1);
                                        cm.gainItem(4001088, -1);
                                        cm.gainItem(4001089, -1);
                                        cm.gainItem(4001090, -1);
                                        cm.gainItem(4001091, -1);
                                        
                                        cm.getEventInstance().warpEventTeam(240050200);
                                } else {
                                        cm.sendOk("你还没有拿到所有的钥匙.");
                                }
                        } else if(cm.getMapId() == 240050300) {
                                if(cm.haveItem(4001092, 1) && cm.haveItem(4001093, 6)) {
                                        cm.gainItem(4001092, -1);
                                        cm.gainItem(4001093, -6);
                                        cm.getEventInstance().clearPQ();
                                } else {
                                        cm.sendOk("检查你是不是有所有的6把红钥匙和一把蓝钥匙.");
                                }
                        } else if(cm.getMapId() == 240050310) {
                                if(cm.haveItem(4001092, 1) && cm.haveItem(4001093, 6)) {
                                        cm.gainItem(4001092, -1);
                                        cm.gainItem(4001093, -6);
                                        cm.getEventInstance().clearPQ();
                                } else {
                                        cm.sendOk("检查你是不是有所有的6把红钥匙和一把蓝钥匙.");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}