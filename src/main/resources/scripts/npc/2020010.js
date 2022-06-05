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

//** Archer 3rd Job Instructor Rene

status = -1;
var job;
var sel;
actionx = {"Mental" : false, "Physical" : false};

function start() {
    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 3;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)){
        if(cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
            status++;
            action(1, 0, 1);
            return;
        }
        
        cm.sendNext("你好.");
        cm.dispose();
        return;
    }
    if (cm.haveItem(4031058))
	    actionx["Mental"] = true;
	else if (cm.haveItem(4031057))
	    actionx["Physical"] = true;
    cm.sendSimple("你能帮帮我吗?#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#我想进行第三次转职.#l" : "") + "\r\n#L1#我想进行扎昆任务.#l");
}

function action(mode, type, selection){
    status++;
	if (mode == 0 && type == 0) {
	    status -= 2;
	} else if(mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3){
	    if (mode == 0 && type == 1)
		    cm.sendNext("下定决心.");
	    cm.dispose();
		return;
	}
	if (actionx["Mental"]){
	    if (status == 0)
		    cm.sendNext("很好的完成了测试的心理部分。你明智地回答了所有的问题。我必须说，你在那里表现出的智慧水平给我留下了深刻的印象。请先把项链递给我，然后我们再开始下一步.");
		else if (status == 1)
			cm.sendYesNo("可以！现在，你将通过我变成一个更强大的弓箭手。不过，在这之前，请确保您的技能点已被彻底使用，您将需要使用至少所有技能点获得的，直到70级。哦，既然你已经选择了第二职业道路，你就不必再为第三职业选择了。你想现在就做吗？");
		else if (status == 2) {
		    /*if (cm.getPlayer().getRemainingSp() > 0)
			    if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
				    cm.sendNext("请在继续之前使用完所有的技能点。");
					cm.dispose();
					return;
				}*/
		    if (cm.getJobId() % 10 == 0) {
		        cm.gainItem(4031058, -1);
		        cm.changeJobById(cm.getJobId() + 1);
				cm.getPlayer().removePartyQuestItem("JBQ");
			}
                        
			if(Math.floor(cm.getJobId() / 10) == 31) cm.sendNext("恭喜你，你现在是#b射手#k了. 你真正需要掌握的技能之一是#b贯穿箭#k它允许射手近距离射箭。#b烈火箭#k允许游侠暂时对怪物进行基于火力的攻击，而技能就像#b替身术#k(召唤稻草人吸引怪物的注意力)和#b银鹰召唤#k(召唤一只攻击怪物的银鹰)增加弓箭手的远程攻击等级。");
                        else cm.sendNext("恭喜你，你现在是#b游侠#k了.你真正需要掌握的技能之一是#b贯穿箭#k它允许游侠近距离射箭。#b寒冰箭#k允许游侠暂时对怪物进行冰属性攻击，而技能如#b替身术t#k(召唤稻草人吸引怪物的注意力)和#b金鹰召唤#k(召唤一只攻击怪物的金鹰)增加弓箭手的远程攻击等级。");
		} else if (status == 3) {
		    cm.sendNextPrev("我也给了你一些技能点和能力值，这将帮助你开始。你现在真的成了一个强大的战士。不过，请记住，现实世界将等待你的到来，还有更艰难的障碍要克服。一旦你觉得你不能训练自己去更高的地方，那么，只有这样，来见我。我会在这里等你。");
		}
	}else if (actionx["Physical"]){
	    if (status == 0)
	        cm.sendNext("很好的完成了测试的物理部分。我就知道你能做到。既然你已经通过了上半部分的考试，下面是下半部分。请先把项链给我。");
		else if (status == 1){
		    if (cm.haveItem(4031057)){
		        cm.gainItem(4031057, -1);
				cm.getPlayer().setPartyQuestItemObtained("JBQ");
			}
			cm.sendNextPrev("这是考试的后半部分。这项测试将决定你是否足够聪明，能够迈出迈向成功的下一步。在冰封雪域的雪原上有一个被雪覆盖的黑暗区域，叫做圣地，连怪物都无法到达。在这个区域的中心有一块巨大的石头，叫做圣石。你需要提供一个特殊的项目作为祭品，然后圣石将测试你的智慧。");
		} else if (status == 2)
		    cm.sendNextPrev("你需要诚实而坚定地回答每一个问题。如果你正确回答了所有的问题，那么圣石会正式接受你并把你交给你#b#t4031058##k.把项链拿回来，我会帮你走到下一步。祝你好运.");
	} else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0){
	    cm.sendNext("去跟#b#p1012100##k对话，并把#b#t4031057##k带回来给我.");
		cm.dispose();
	} else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0){
	    cm.sendNext("跟#b#p2030006##k对话，并把#b#t4031058##k带回来给我.");
		cm.dispose();
	} else {
	    if (sel == undefined)
		    sel = selection;
	    if (sel == 0){
	        if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0) {
	            if (status == 0)
	                cm.sendYesNo("欢迎你，我是#b#p2020010##k,弓箭手的教官,愿意与那些愿意倾听的人分享我低头的知识和艰苦的生活。你似乎已经准备好变得更强了，准备迎接第三次升职的挑战。太多的弓箭手来去匆匆，无法达到第三次转职的标准。你呢？你准备好接受考验并获得第三次转职了吗？");
	            else if (status == 1){
		            cm.getPlayer().setPartyQuestItemObtained("JB3");
	                cm.sendNext("很好。你将受到两个重要方面的考验：力量和智慧。我现在给你解释一下测试的物理部分。你还记得射手村的#b#p1012100##k吗?去见他，他会告诉你考试前半部分的细节。请完成任务，然后从#p1012100#k把#b#t4031057##k带回来给我.");
	            } else if (status == 2)
	                cm.sendNextPrev("只有你通过了身体部分的测试，心理部分的测试才能开始。#b#t4031057##k将证明你确实通过了考试。我会让#b#p1012100##k对你进行测试，请做好准备。这不容易，但我对你有极大的信心。祝你好运。");
			}
            } else {
            	if (cm.getPlayer().getLevel() >= 50){
            		cm.sendOk("长老会让你挑战扎昆，祝你一切顺利。");
                	if(!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) cm.startQuest(100200);
                        if(Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) cm.completeQuest(100201);
            	}else
                	cm.sendOk("你太虚弱了，无法挑战#r扎昆#k. 至少达到#b50级#k以后，再与我交谈。");
            	cm.dispose();
            }
	}
}