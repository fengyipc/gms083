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
            cm.sendNext("#b#p1104002##k... 黑魔女...把我困在这里... 没多少时间了, 她已经开始#r入侵圣地#k了!");
        } else if (status == 1) {
            cm.sendYesNo("尊敬的骑士,你现在必须赶去#r圣地#k, #r女皇有危险#k!! 我会用我的魔法将你传送过去.你准备好了就告诉我. #b要去圣地面对黑魔女了吗?#k");
        } else if (status == 2) {
            if (cm.getWarpMap(913030000).countPlayers() == 0) {
                cm.warp(913030000, 0);
            } else {
                cm.sendOk("有人正在挑战她,请等一会.");
            }

            cm.dispose();
        }
    }
}