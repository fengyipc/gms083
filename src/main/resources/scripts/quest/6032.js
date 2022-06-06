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
	Quest: Meren's Class on the Actual Practice
 */

    var status = -1;

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
                qm.sendNext("你是来参加我的课的吧？好的，我会尽快的。");
            } else if (status == 1) {
                qm.sendNextPrev("我将教你如何实际运用#b炼金术#k。你所需要做的就是准备一件东西，从收据上收集所有的成分，然后用科学的炼金方法把它们混合起来。很简单，不是吗？");
            } else if (status == 2) {
                qm.sendNextPrev("让我们拿制作#b重耳环#k举个例子.有一个相当具体的#r延性理论#k要生成它，正如任何其他“唯一”项所具有的那样，在#r主要体力#k对我们正在做的事情采取行动：在那个案子上#b重力延性理论#k(因为这是个“加重耳环”，明白吗？).");
            } else if (status == 3) {
                qm.sendNextPrev("好吧，为了这个信息现在你得给我一笔费用，一共10,000金币。所收取的费用将用于获取所需的材料，以供您学习#b炼金术#k。");
            } else if (status == 4) {
                qm.gainMeso(-10000);
                
                qm.forceCompleteQuest();
                qm.dispose();
            }
        }
    }