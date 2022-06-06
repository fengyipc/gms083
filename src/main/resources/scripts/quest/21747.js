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
            qm.sendAcceptDecline("没想到在数百年的岁月之后，英雄的后裔又重新出现了......也不知道对冒险岛世界师傅还是祸......怎样都无所谓了。好吧......我告诉你有关武陵封印石的事情。");
        } else if (status == 1) {
            qm.sendNext("武陵的封印石所在的地方叫做封印的寺院。那里的入口被隐藏在武陵寺院内。你去仔细观察武陵寺院入口处熊猫提着的灯盏。如果能从中找出#b刻有入口字样的灯盏#k，就可以进入封印的寺院了。暗号是#b道可道非常道。#k");
        } else if (status == 2) {
            qm.sendNext("说不定那个叫影子武士的人已经倒了封印的寺院。不过，他应该还没有把东西偷走。不知道是不是在等我......不过，相比我而言，英雄的后裔去会会影子武士可能更合适呢。");
        } else if (status == 3) {
            qm.sendNext("希望你能竭尽全力阻止影子武士。英雄的后裔啊......继承英雄过去的光辉事业吧。");
        } else if (status == 4) {
            qm.sendNextPrev("#b（他似乎误以为我是英雄后裔了。他说让我继承英雄过去的光辉事业......是什么意思呢？先阻止影子武士，然后再问他好了。）#k", 3);
        } else {
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
            qm.sendNext("成功打败了影子武士吗？表情怎么这么凝重......难道说你失败了......");
        } else if (status == 1) {
            qm.sendNext("原来是这样，武陵的封印石最终还是被抢走了......很遗憾，不过也没办法。我现在也不明白英雄们为什么要把封印石交给武陵。");
        } else if (status == 2) {
            qm.sendNextPrev("你说英雄把封印石交给了武陵？", 3);
        } else if (status == 3) {
            qm.sendNext("是的......你还不知道吗？#b很久很久以前，英雄们把封印石交给了武陵。长老制作了封印的寺院并慎重看管起来。#k");
        } else if (status == 4) {
            qm.sendNextPrev("......英雄......", 3);
        } else if (status == 5) {
            qm.sendNext("这些事情，现在很少有人知道了。事实上，#b封印石没有了对武陵而言到底有没有影响，谁也不知道#k。只不过因为是英雄交给我们保管的东西，所以我们才看的很重。");
        } else if (status == 6) {
            qm.sendNextPrev("#b（英雄把封印石交给了武陵......）#k", 3);
        } else if (status == 7) {
            qm.sendNext("把英雄交给我们的东西给弄丢了，虽说很可惜，但有英雄的后裔在，我们也觉得心里踏实一些。请继续完成英雄未尽的事业。");
        } else if (status == 8) {
            qm.sendNextPrev("#b（武陵封印石也被抢走了......得去特鲁问问。）#k", 3);
        } else if (status == 9) {
            qm.gainExp(16000);
            qm.forceCompleteQuest();
            
            qm.dispose();
        }
    }
}