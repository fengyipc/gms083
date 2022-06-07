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

/* @author RonanLana */

function enter(pi) {
    if (!((pi.isQuestStarted(6361) && pi.haveItem(4031870, 1)) || (pi.isQuestCompleted(6361) && !pi.isQuestCompleted(6363)))) {
        var em = pi.getEventManager("PapulatusBattle");

        if (pi.getParty() == null) {
            pi.playerMessage(5, "你当前不队伍中，创建一个来尝试。");
            return false;
        } else if (!pi.isLeader()) {
            pi.playerMessage(5, "你的队长必须进入传送门才能开始战斗。");
            return false;
        } else {
            var me = Java.type("server.expeditions.MapleExpeditionBossLog");
            var canGo = true;
            var channel = pi.getPlayer().getClient().getChannel();
            var name;
            for (var i = 0; i < pi.getParty().getPartyMembers().size(); i++) {
                if (!me.attemptBoss(pi.getParty().getPartyMembers().get(i).getId(), channel, "PAPULATUS", false)) {
                    name = pi.getParty().getPartyMembers().get(i).getName();
                    canGo = false;
                    break;
                }
            }
            if (!canGo) {
                pi.playerMessage(5, "队伍中'" + name + "'玩家剩余挑战次数不足。");
                return false;
            }
            var eli = em.getEligibleParty(pi.getParty());
            if (eli.size() > 0) {
                if (!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                    pi.playerMessage(5, "战斗已经开始，所以你还不能进入这个地方。");
                    return false;
                }
            } else {  //this should never appear
                pi.playerMessage(5, "你还不能开始这场战斗，因为你的队伍不在范围内，你的一些队员没有资格参加战斗，或者他们不这个地图。如果找不到成员，请尝试“群搜索”。");
                return false;
            }
            for (var i = 0; i < pi.getParty().getPartyMembers().size(); i++) {
                me.attemptBoss(pi.getParty().getPartyMembers().get(i).getId(), channel, "PAPULATUS", true);
            }
            pi.playPortalSound();
            return true;
        }
    } else {
        pi.playPortalSound();
        pi.warp(922020300, 0);
        return true;
    }
}