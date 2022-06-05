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

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        var mapobj = cm.getMap();

        if (mode == 0 && type > 0) {
            cm.getPlayer().dropMessage(5, "#p1104002#: 女皇祝福都没有了还敢挑战我们?!!!");

            mapobj.spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeFactory.getMonster(9001010), new Packages.java.awt.Point(850, 0));
            mapobj.destroyNPC(1104002);

            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            if (!cm.isQuestStarted(20407)) {
                cm.sendOk("... 骑士, 你还是#b不愿面对战斗#k,对吗? 去跟那只笨手笨脚的大鸟好好谈谈再来吧.");
                cm.dispose();
                return;
            }

            cm.sendAcceptDecline("哈哈哈哈哈!这里的女皇已经被我控制住了,这将是#b黑色之翼#k倾覆冒险岛世界的一大进展... 你还想恨我们作对吗? 还是说你想为我们效力?#r你够资格加入我们吗");
        } else if (status == 1) {
            cm.sendOk("呵呵,#r黑魔法师#k的队伍里面才不需要无能的废物,滚!");
            cm.dispose();
        }
    }
}
