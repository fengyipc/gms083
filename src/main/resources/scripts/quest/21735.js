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
            qm.sendNext("金银岛封印石我已经找到了。你看，呵呵呵。");
       } else if (status == 1) {
	qm.sendNextPrev("！！你怎么找到的？！", 2);
       } else if(status ==  2) {
            qm.sendNext("上次被人偶师攻击后，我动员了所有的情报网搜遍了整个金银岛。我怎么可能坐以待毙？一定抢在他们前面找到他们想要的东西......也算是报了上次一箭之仇。");
       } else if(status ==  3) {
            qm.sendNext("不过，黑色之翼的家伙们已经认识我了，我再拿着这个恐怕不太安全。英雄大人拿着它走来走去，弄丢了也不好......要不还是交给#r#p1201000##k保管吧。");
       } else if(status ==  4) {
            qm.sendNext("里恩岛上一直都只有里恩一族生活。为了不让其他人类接近，他们在岛上设置了各种咒术。黑色之翼要想找到他们恐怕没那么容易。请把这个交给利琳。");
       } else if(status ==  5) {
            qm.sendNext("我打算以后不再让你去做收集情报的工作了，你现在已经对冒险岛有了一定的了解，现在也是时候自己去积累经验了吧？");
       } else if(status ==  6) {
            qm.sendNext("不过我打算集中全力，去收集与黑色之翼相关事件的情报，更何况，关于那个封印石也有必要继续打听，如果有什么消息，我会联系你的。日后再见，英雄。");
       } else if (status == 7) {
            if(!qm.canHold(4032323, 1)) {
                qm.sendNext("在收到物品之前，请在您的背包库存上腾出一个空位。");
                qm.dispose();
                return;
            }
            
            if(!qm.haveItem(4032323, 1)) qm.gainItem(4032323, 1);
            qm.forceStartQuest();
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
                if(qm.haveItem(4032323, 1)) {
                qm.sendNext("黑色之翼的动向，我已经从真相叔叔那里听说了。听说前不久还被他们袭击了一次......你还好吧？咦？这个......这就是金银岛封印石吗？没想到真相叔叔果然比那些家伙们早一步找到金银岛封印石。不知道这颗宝石到底有什么用......只知道这个东西肯定和黑魔法师有关。");
       } else if(status ==  1) {
            qm.sendNext("既然那些家伙们在找这个东西，我们一定要保护好这个东西。看来不论发生什么，你都要不断地变得更强，才行。");
       } else if(status ==  2) {
            qm.sendNext("黑色之翼......他们的阴谋还没有结束。特鲁大叔拜托你继续调查黑色之翼。也请你继续你的修炼吧。");
            } else {
                qm.dispose();
            }
        } else if (status == 1) {
            qm.gainItem(4032323, -1);
            qm.gainExp(6037);
            qm.forceCompleteQuest();
            
            qm.dispose();
        }
    }
}