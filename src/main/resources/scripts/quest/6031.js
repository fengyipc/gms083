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
	Quest: Hughes the Fuse's Basic of Theory of Science
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
                qm.sendNext("我要教你科学理论的基础知识。");
            } else if (status == 1) {
                qm.sendNextPrev("炼金术不符合要求的科学阶段。所有项目都有分子组成。它们的排列结构和物质的每一个内在单位，定义了一个物品将具有的许多属性。");
            } else if (status == 2) {
                qm.sendNextPrev("一个人必须能够研究构成项目的每个组成部分的痕迹，以便能够判断实验是否最终会失败。");
            } else if (status == 3) {
                qm.sendNextPrev("记住这一点：科学的主要观点是，使其流动最强劲的一个引擎，不管它是什么情况，#b理解过程#k这会产生结果，而不仅仅是随意丢弃尝试。");
            } else if (status == 4) {
                qm.sendNextPrev("已经说清楚了，对吧？很好，那么下课了。解散。");
            } else if (status == 5) {
                qm.gainMeso(-10000);
                
                qm.forceCompleteQuest();
                qm.dispose();
            }
        }
    }