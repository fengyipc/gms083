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
/*  Maker Skill
	A Surprise Outcome
	3rd skill level
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
                qm.sendNext("找我有什么事情吗？怎么了？");
            } else if (status == 1) {
                if(qm.haveItem(4031980, 1)) {
                    qm.sendNext("你精心设计了一个#b#t4031980##k?!怎么，你怎么做到的。。。好吧，我想这没用。学生胜过了老师！年轻人对自己的感知能力肯定有奇效。\r\n\r\n现在你已经准备好掌握造物主技能的最后一步，以最好的形式来思考它吧！");
                } else {
                    qm.sendNext("... 请让开，如果我每时每刻都心烦意乱，我就不能完成这项工作。");
                    qm.dispose();
                    return;
                }
            } else if (status == 2) {
                qm.forceCompleteQuest();
                
                qm.gainItem(4031980, -1);
                var skillid = Math.floor(qm.getPlayer().getJob().getId() / 1000) * 10000000 + 1007;
                qm.teachSkill(skillid, 3, 3, -1);
                qm.gainExp(300000);
                
                qm.dispose();
            }
        }
    }