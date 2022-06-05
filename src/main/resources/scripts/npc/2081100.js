/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

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
 *@Author:  Moogra
 *@NPC:     4th Job Warrior Advancement NPC
 *@Purpose: Handles 4th job.
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
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if(status == 0) {
                        if(cm.getLevel() < 120 || Math.floor(cm.getJobId() / 100) != 1) {
                                cm.sendOk("请不要现在打扰我，我正在冥想。");
                                cm.dispose();
                        } else if (!cm.isQuestCompleted(6904)) {
                                cm.sendOk("你还没有通过我的考验");
                                cm.dispose();
                        } else if ( cm.getJobId() % 100 % 10 != 2) {
                                cm.sendYesNo("你通过了我的考试，做得很好。你准备四转了吗？");
                        } else {
                                cm.sendSimple("如果必要的话，我可以教你职业的艺术.\r\n#b#L0#教我技能.#l");
                        }
                } else if(status == 1) {
                        if (mode >= 1 && cm.getJobId() % 100 % 10 != 2) {
                                if (cm.canHold(2280003, 1)) {
                                        cm.changeJobById(cm.getJobId() + 1);
                                        if(cm.getJobId() == 112) {
                                                cm.teachSkill(1121001, 0, 10, -1);
                                                cm.teachSkill(1120004, 0, 10, -1);
                                                cm.teachSkill(1121008, 0, 10, -1);
                                        } else if(cm.getJobId() == 122) {
                                                cm.teachSkill(1221001, 0, 10, -1);
                                                cm.teachSkill(1220005, 0, 10, -1);
                                                cm.teachSkill(1221009, 0, 10, -1);
                                        } else if(cm.getJobId() == 132) {
                                                cm.teachSkill(1321001, 0, 10, -1);
                                                cm.teachSkill(1320005, 0, 10, -1);
                                                cm.teachSkill(1321007, 0, 10, -1);
                                        }
                                        cm.gainItem(2280003, 1);
                                } else {
                                        cm.sendOk("消耗栏留点空间放技能书.");
                                }
                        } else if(mode >= 0 && cm.getJobId() % 100 % 10 == 2) {
                                // TEMP until I can get the quest fixed...
                                if(cm.getJobId() == 112) {
                                        if(cm.getPlayer().getSkillLevel(1121010) == 0)
                                                cm.teachSkill(1121010 , 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(1120005) == 0)
                                                cm.teachSkill(1120005 , 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(1121002) == 0)
                                                cm.teachSkill(1121002 , 0, 10, -1);
                                }  else if(cm.getJobId() == 122) {
                                        if(cm.getPlayer().getSkillLevel(1221002) == 0)
                                                cm.teachSkill(1221002, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(1221003) == 0)
                                                cm.teachSkill(1221003, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(1221004) == 0)
                                                cm.teachSkill(1221004, 0, 10, -1);
                                } else if(cm.getJobId() == 132) {
                                        if(cm.getPlayer().getSkillLevel(1321002) == 0)
                                                cm.teachSkill(1321002, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(1320008) == 0)
                                                cm.teachSkill(1320008, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(1320009) == 0)
                                                cm.teachSkill(1320009, 0, 10, -1);
                                }
                                cm.sendOk("好了.");
                        }
                        
                        cm.dispose();
                }
        }
}