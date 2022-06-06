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
/* Steal queen's silk
 */

importPackage(Packages.client);

function isTigunMorphed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210005;
}

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
            if(!isTigunMorphed(qm.getPlayer())) {
                qm.sendNext("这是什么？我不能简单地把女王的丝绸给任何人，声称他们会马上把它交给女王。离开我的视线。");
                status = 1;
                return;
            }

            qm.sendNext("提甘，你在这里干什么？");
        } else if (status == 1) {
            if(!isTigunMorphed(qm.getPlayer())) {
                qm.sendNext("这是什么？我不能简单地把女王的丝绸给任何人，声称他们会马上把它交给女王。离开我的视线。");
                return;
            }

            qm.sendNext("女王现在想要她的丝绸？好吧，我把它们放在这里了。等一下。");
            qm.forceStartQuest();
        } else if (status == 2) {
            qm.dispose();
        }
    }
}

function end(mode, type, selection) {
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
            if(!isTigunMorphed(qm.getPlayer())) {
                qm.sendNext("这是什么？我不能简单地把女王的丝绸给任何人，声称他们会马上把它交给女王。离开我的视线。");
                qm.dispose();
                return;
            }

            if(qm.canHold(4031571, 1)) {
                qm.gainItem(4031571);
                
                qm.sendNext("给你。提甘，请你尽快给女王送去，如果事情耽搁了，她会很生气的。");
                qm.forceCompleteQuest();
            } else {
                qm.sendNext("嘿，你没地方放这个，伙计。当你整理背包的时候我会留下来。。。");
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}