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
/* Maker Skill
	Moren's Second round of teaching
	2nd skill level
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
                qm.sendNext("嗯，所以你想制作#b#t4260003##k吗?好吧，我们来看看。");
            } else if (status == 1) {
                if(qm.haveItem(4260003, 1)) {
                    qm.sendNextPrev("我明白了，你真的做了一块很好的怪物水晶。你通过了！现在，我将教你创造技能的下一步。把怪物水晶也随身带着，这是你的工作。");
                } else {
                    qm.sendNext("嘿，怎么了？我告诉过你做一个怪物水晶来通过我的测试，不是吗？在测试开始前购买一个或手工制作不是交易的一部分。去给我做一个#b#t4260003##k.");
                    qm.dispose();
                    return;
                }
            } else if (status == 2) {
                qm.forceCompleteQuest();
                
                var skillid = Math.floor(qm.getPlayer().getJob().getId() / 1000) * 10000000 + 1007;
                qm.teachSkill(skillid, 2, 3, -1);
                qm.gainExp(230000);
                qm.dispose();
            }
        }
    }