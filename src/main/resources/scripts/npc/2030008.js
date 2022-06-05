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
/* Adobis
 * 
 * El Nath - The Door to Zakum (211042300)
 * 
 * Vs Zakum Recruiter NPC
 * 
 * Custom Quest 100200 = Whether you can start Zakum PQ
 * Custom Quest 100201 = Whether you have done the trials
*/

var status;
var em;
var selectedType;
var gotAllDocs;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1)
        cm.dispose();
    else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        
        if(cm.haveItem(4001109, 1)) {
            cm.warp(921100000, "out00");
            cm.dispose();
            return;
        }
        
        if(!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) {   // thanks Vcoc for finding out a need of reapproval from the masters for Zakum expeditions
            if (cm.getPlayer().getLevel() >= 50) {  // thanks Z1peR for noticing not-so-clear unmet requirements message here.
                cm.sendOk("当心，古老的力量并没有被遗忘...如果你想在某一天打败扎昆，那就先去#b长老公馆#k获得准许后再进行挑战,只有这样你才有资格战斗。");
            } else {
                cm.sendOk("当心，古老的力量并没有被遗忘...");
            }
            
            cm.dispose();
            return;
        }
        
        em = cm.getEventManager("ZakumPQ");
        if(em == null) {
            cm.sendOk("扎昆脚本出现错误");
            cm.dispose();
            return;
        }
        
        if (status == 0) {
            cm.sendSimple("很好...你看起来具备了条件.你想挑战哪一个阶段？#e#b\r\n#L0#出发去调查废矿洞穴.（第一阶段）#l\r\n#L1#探查扎昆训练场.（第二阶段）#l\r\n#L2#合成火焰的眼.（第三阶段）#l");
        }
        else if (status == 1) {
            if (selection == 0) {
                if (cm.getParty() == null) {
                    cm.sendOk("只有在组队中，你才能参与组队任务。");
                    cm.dispose();
                } else if(!cm.isLeader()) {
                    cm.sendOk("请让队长与我交谈");
                    cm.dispose();
                } else {
                    var eli = em.getEligibleParty(cm.getParty());
                    if(eli.size() > 0) {
                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                            cm.sendOk("已经有人进入了此频道.请重新更换频道再尝试");
                        }
                    }
                    else {
                        cm.sendOk("不能开始因为你的队伍人数不足或者有人等级不满足要求.试试使用队伍搜索");
                    }

                    cm.dispose();
                }
            } else if(selection == 1) {
                if (cm.haveItem(4031061) && !cm.haveItem(4031062))
                    cm.sendYesNo("想要#b火山的呼吸#k?我会把你们送进一个满是陷阱的地方,你们很可能会在里面死亡.");
                else {
                    if (cm.haveItem(4031062)) cm.sendNext("你已经有了#b火山的呼吸#k, 不需要再做这个阶段任务了.");
                    else cm.sendNext("请先完成之前的挑战.");
                    
                    cm.dispose();
                }
            } else {
                if(cm.haveItem(4031061) && cm.haveItem(4031062)) {
                    if(!cm.haveItem(4000082, 30)) {
                        cm.sendOk("你完成了试炼,然而还需要#b30个#t4000082##k来制作5个 #t4001017#.");
                    } else {
                        cm.completeQuest(100201);
                        cm.gainItem(4031061, -1);
                        cm.gainItem(4031062, -1);
                        cm.gainItem(4000082, -30);
                        cm.gainItem(4001017, 5);
                        cm.sendOk("你#完成了试炼#k,我允许你挑战扎昆.");
                        cm.dispose();
                    }
                }else if(cm.getQuestStatus(100201) == 2){//已完成过第三阶段任务
                    if(!cm.haveItem(4000082, 30)) {
                        cm.sendOk("你完成了试炼,然而还需要#b30个#t4000082##k来制作 #t4001017#.");
                        cm.dispose();
                    }else if(cm.canHold(4001017,1)){
                        cm.gainItem(4000082, -30);
                        cm.gainItem(4001017, 1);
                        cm.sendOk("你#完成了试炼#k,我允许你挑战扎昆.");
                        cm.dispose();
                    }else{
                        cm.sendOk("你没有空间获取#t4001017#");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("我要的东西你都拿来了吗?检查一下背包");
                    cm.dispose();
                }
            }
        }
        else if (status == 2) {
            cm.warp(280020000, 0);
            cm.dispose();
        }
    }
}
