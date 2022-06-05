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
 *@NPC:     4th Job Pirate Advancement NPC
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
                        if(cm.getLevel() < 120 || Math.floor(cm.getJobId() / 100) != 5) {
                                cm.sendOk("请不要现在打扰我，我正在冥想。");
                                cm.dispose();
                        } else if (!cm.isQuestCompleted(6944)) {
                                cm.sendOk("你还没有通过我的考验.");
                                cm.dispose();
                        } else if ( cm.getJobId() % 100 % 10 != 2) {
                                cm.sendYesNo("你通过了我的考试，做得很好。你准备四转了吗？");
                        } else {
                                cm.sendSimple("如果必要的话，我可以教你职业的艺术.\r\n#b#L0#教我技能.#l");
                                //cm.dispose();
                        }
                } else if(status == 1) {
                        if (mode >= 1 && cm.getJobId() % 100 % 10 != 2) {
                                if (cm.canHold(2280003, 1)) {
                                        cm.changeJobById(cm.getJobId() + 1);
                                        if(cm.getJobId() == 512) {
                                                cm.teachSkill(5121001, 0, 10, -1);
                                                cm.teachSkill(5121002, 0, 10, -1);
                                                cm.teachSkill(5121007, 0, 10, -1);
                                                cm.teachSkill(5121009, 0, 10, -1);
                                        } else if(cm.getJobId() == 522) {
                                                cm.teachSkill(5220001, 0, 10, -1);
                                                cm.teachSkill(5220002, 0, 10, -1);
                                                cm.teachSkill(5221004, 0, 10, -1);
                                                cm.teachSkill(5220011, 0, 10, -1);
                                        }
                                        cm.gainItem(2280003, 1);
                                } else {
                                        cm.sendOk("消耗栏留点空间放技能书.");
                                }
                        } else if(mode >= 1 && cm.getJobId() % 100 % 10 == 2) {
                                if(cm.getJobId() == 512) {
                                        if(cm.getPlayer().getSkillLevel(5121003) == 0)
                                                cm.teachSkill(5121003, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(5121004) == 0)
                                                cm.teachSkill(5121004, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(5121005) == 0)
                                                cm.teachSkill(5121005, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(5121010) == 0)
                                                cm.teachSkill(5121010, 0, 10, -1);
                                } else if(cm.getJobId() == 522) {
                                        if(cm.getPlayer().getSkillLevel(5221006) == 0)
                                                cm.teachSkill(5221006, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(5221007) == 0)
                                                cm.teachSkill(5221007, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(5221008) == 0)
                                                cm.teachSkill(5221008, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(5221009) == 0)
                                                cm.teachSkill(5221009, 0, 10, -1);
                                        if(cm.getPlayer().getSkillLevel(5221003) == 0)
                                                cm.teachSkill(5221003, 0, 10, -1);
                                }
                                cm.sendOk("好了.");
                        }
                        
                        cm.dispose();
                }
        }
}
