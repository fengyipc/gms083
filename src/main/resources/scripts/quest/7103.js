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
/* Papulatus - 7103
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.sendOk("哦，真的。你需要更多的时间吗？我完全相信你会在时间范围形成之前帮助我。");
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.sendOk("哦，真的。你需要更多的时间吗？我完全相信你会在时间范围形成之前帮助我。");
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            qm.sendYesNo("我们现在唯一要做的就是让#o8500002#永远消失。。。你准备好了吗？");
        } else if (status == 1) {
            qm.sendNext("从现在开始我会向你解释你需要做什么。\r\n要进入时间塔的本源，你需要通过#b时间消失之路#k或者#b扭曲的时间#k进入.一旦你击败守卫通道的怪物，你就可以获得#b#t4031172:##k,这是进入时间塔的本源必须物品。");
        } else if (status == 2) {
            qm.sendNextPrev("然后通过中间的门进入房间。会比你想象的安静得多。时间球应该隐藏在我们无法察觉的状态中。。。但如果你把裂缝封起来，#o8500002#会因为它的出口路线被封锁而惊慌失措，将使它出现在那里。");
        } else if (status == 3) {
            if (!qm.haveItem(4031179, 1)) {
                if (!qm.canHold(4031179, 1)) {
                    qm.sendOk("请确认你其他栏有足够的空间来接收物品。");
                    qm.dispose();
                    return;
                }
                
                qm.gainItem(4031179, 1);
            }
            
            qm.sendAcceptDecline("Drop the #b#t4031179:##k that I returned to you to seal up whatever crack you see that #o8500002# may have used to enter this dimension in the first place. Then it'll come out of the Time Sphere and show everyone its true appearance. Please, please kill it and then come back. \r\n\r\nCollect #r1 #t4031172:##k\r\nEliminate #r#o8500001##k");
        } else if (status == 4) {
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}
