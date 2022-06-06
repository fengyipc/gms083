/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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
	Ardin - Sand Bandits team challenge
 */

    var status = -1;

    function start(mode, type, selection) {
        if (mode == -1) {
            qm.dispose();
        } else {
            if(mode == 0 && type > 0) {
                qm.dispose();
                return;
            }
            
            if (mode == 1)
                status++;
            else
                status--;
            
            if (status == 0) {
                qm.sendNext("我没想到你会这么坚强。我觉得你有能力成为沙匪的一员。作为一个成员最重要的方面是权力，我认为你有权力。我也。。。想再测试你一次，只是为了确定你是对的。你怎么认为？你能应付吗？");
            } else if (status == 1) {
                qm.sendAcceptDecline("要真正看到你的力量，我必须亲自面对你。别担心，我会召唤我的另一个人来对抗你。你准备好了吗？");
            } else if (status == 2) {
                qm.sendNext("很好，我喜欢你的自信。");
            } else if (status == 3) {
                if(qm.getWarpMap(926000000).getCharacters().size() > 0) {
                    qm.sendOk("地图上有人，请稍后再来。");
                    qm.dispose();
                } else {
                    qm.warp(926000000, "st00");
                    qm.forceStartQuest();
                    qm.dispose();
                }
            }
        }
    }
    