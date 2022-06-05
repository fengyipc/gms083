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
 * @npc: Shuang
 * @map: Victoria Road: Excavation Site<Camp> (101030104)
 * @func: Start Guild PQ
*/

var status = 0;
var sel;
var em = null;

function findLobby(guild) {
        for (var iterator = em.getInstances().iterator(); iterator.hasNext();) {
                var lobby = iterator.next();
                
                if(lobby.getIntProperty("guild") == guild) {
                        if(lobby.getIntProperty("canJoin") == 1) return lobby;
                        else return null;
                }
        }
        
        return null;
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
                
                if (status == 0) {
                        em = cm.getEventManager("GuildQuest");
                        if(em == null) {
                                cm.sendOk("家族挑战出错了.");
                                cm.dispose();
                                return;
                        }
                    
                        cm.sendSimple("#e#b<家族任务:遗迹发掘地>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n通往遗迹的路在这里.你想做什么? #b\r\n#L0#把家族登记到家族任务里#l\r\n#L1#参加家族任务#l\r\n#L2#我想知道细节.#l");
                } else if (status == 1) {
                        sel = selection;
                        if (selection == 0) {
                                if(!cm.isGuildLeader()) {
                                        cm.sendOk("你的家族长必须要找我把家族登记到家族任务里.");
                                        cm.dispose();
                                } else {
                                        if(em.isQueueFull()) {
                                                cm.sendOk("这个频道上的队伍已经满了.请耐心等待或者去别的频道看看.");
                                                cm.dispose();
                                        } else {
                                                var qsize = em.getQueueSize();
                                                cm.sendYesNo(((qsize > 0) ? "当前有#r" + qsize + "#k个家族在队列中. " : "") + "你想排队吗?");
                                        }
                                }
                        } else if (selection == 1) {
                                if(cm.getPlayer().getGuildId() > 0) {
                                        var eim = findLobby(cm.getPlayer().getGuildId());
                                        if(eim == null) {
                                                cm.sendOk("现在不是这个频道你们家族挑战的时间.");
                                        } else {
                                                if(cm.isLeader()) {
                                                        em.getEligibleParty(cm.getParty());
                                                        eim.registerParty(cm.getPlayer());
                                                } else {
                                                        eim.registerPlayer(cm.getPlayer());
                                                }
                                        }
                                } else {
                                        cm.sendOk("你不能参加!");
                                }
                                
                                cm.dispose();
                        } else {
                                var reqStr = "";
                                reqStr += "\r\n\r\n    队伍需求:\r\n\r\n";
                                reqStr += "     - 1名队员 #r等级低于或等于30级#k.\r\n";
                                reqStr += "     - 1名队员 #r轻功学满并且会隐身的飞侠#k.\r\n";
                                reqStr += "     - 1名队员 #r学满瞬间移动的法师#k.\r\n";
                                reqStr += "     - 1名队员 #r远程攻击职业,比如弓箭手,刺客或者枪手.\r\n";
                                reqStr += "     - 1名队员 #r拥有很好机动性的职业,比如会二段跳的飞侠,会轻羽鞋的海盗#k.\r\n";
                            
                                cm.sendOk("#e#b<家族任务:遗迹发掘地>#k#n\r\n与你的家族成员合作，从骷髅手中夺回鲁宾，团队合作克服了许多谜团和挑战,等待在遗迹发掘地的坟墓。实例完成后可获得丰厚奖励，并可为您的帮会累积帮会积分。" + reqStr);
                                cm.dispose();
                        }
                } else if (status == 2) {
                        if (sel == 0) {
                                var entry = em.addGuildToQueue(cm.getPlayer().getGuildId(), cm.getPlayer().getId());
                                if(entry > 0) {
                                        cm.sendOk("你的家族成功登记了.我会通知你们家族成员.\r\n\r\n现在,#r敲黑板#k:作为队长, #r你一定已经在这个频道了,#k当你的公会被召唤到的时候. #b此操作的错误提交将使您的公会注册整体无效, 那样就轮到下一个家族挑战了.还必须注意的是，如果你，最为队长，再开始任务后离开，都会使任务中断，你的家族会立即被移出队列。");
                                } else if(entry == 0) {
                                        cm.sendOk("这个频道上的队伍已经满了.请耐心等待或者去别的频道看看.");
                                } else {
                                        cm.sendOk("你的家族已经在一个频道里排队了.请排队.");
                                }
                        }
                        
                        cm.dispose();
                }
        }
}