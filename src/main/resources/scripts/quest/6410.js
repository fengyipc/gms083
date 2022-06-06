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
	Hypnotize skill quest
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
            if (qm.getQuestProgress(6410, 0) == 0) {
                qm.sendOk("你必须拯救#r#p2095000##k!");
                qm.dispose();
            } else {
                qm.sendNext("再次感谢你救了我。我不知道怎么报答你。。。舒林奇和你都是我遇到的最好的人。如果你像对待我一样对待暴徒，他们最终也会成为你的朋友。请不要失去你内心的善良。");
            }
        } else if (status == 1) {
            qm.sendNext("(黑帮的朋友。。。永远不要失去善良。)\r\n\r\n  #s5221009#    #b#q5221009##k");
        } else if (status == 2) {
            qm.gainExp(1200000);
            qm.teachSkill(5221009, 0, 10, -1);
            
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}