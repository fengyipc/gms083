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
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if (status == 0) {
                        if (!cm.isEventLeader()) {
                                cm.sendNext("请让队长与我交谈进入下一关.");
                                cm.dispose();
                                return;
                        }

                        var eim = cm.getEventInstance();
                        if (eim.getIntProperty("statusStg1") == 1) {
                                cm.sendNext("进入这个通道挑战BOSS.");
                        } else {
                                if (cm.haveItem(4032118, 15)) {
                                        cm.gainItem(4032118, -15);

                                        eim.setIntProperty("statusStg1", 1);
                                        eim.showClearEffect();
                                        eim.giveEventPlayersStageReward(1);

                                        cm.sendNext("你的队伍已收集了要求的#r 15 #z4032118##k。现在，你可以通过这个通道移至第二个关卡。祝你幸运。");
                                } else {
                                        cm.sendNext("噢，亲爱的！接着，请带给我#r 15 封#z4032118##k。我想你可以在石堆中找到的...");
                                }
                        }

                        cm.dispose();
                }
        }
}