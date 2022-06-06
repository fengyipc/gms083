/* ===========================================================
			Resonance
	NPC Name: 		Maple Administrator
	Description: 	Quest -  Kingdom of Mushroom in Danger
=============================================================
Version 1.0 - Script Done.(17/7/2010)
Version 2.0 - Script Reworked by Ronan.(16/11/2018)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            if (status != 3) {
                qm.sendOk("真的吗？我有一件急事，如果你有时间，请见见我。");
                qm.dispose();
            } else {
                if (qm.canHold(4032375, 1)) {
                    qm.sendNext("可以。那样的话，我就给你介绍去蘑菇王国的路线。#b在射手村西边的传送门附近，#k你会发现#b空房子#k.进入这个房子, 然后从左边进入#b<主题地图:蘑菇城堡>#k.那是蘑菇城堡的入口。时间不多了！");
                } else {
                    qm.sendOk("请在其他栏中留至少一个位置");
                    qm.dispose();
                }
            }
            
            status++;
        } else {
            if (mode == 1)
                status++;
            else
                status--;

            if (status == 0) {
                qm.sendAcceptDecline("既然你已经取得了工作进展，你看起来已经准备好了。我有件事想请你帮忙。你愿意听吗?");
            } else if (status == 1) {
                qm.sendNext("#b蘑菇王国#k目前处于混乱状态.蘑菇王国位于射手村附近,聪明的国王以爱好和平为特色. 最近，他开始感到不舒服，所以他决定任命他唯一的女儿#b碧欧蕾塔#k. 从那以后一定发生了什么事情，王国才处于目前的状态。");
            } else if (status == 2) {
                qm.sendNext("我不知道确切的细节，但很明显发生了可怕的事情，所以我认为最好你自己去确认一下。像你这样的冒险家似乎能拯救蘑菇王国。我刚给你写了封#b推荐信#k,所以我建议你马上去蘑菇王国找#b警卫队长#k.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v4032375# #t4032375#");
            } else if (status == 3) {
                qm.sendYesNo("顺便问一下，你知道蘑菇王国在哪里吗？如果你能找到去那儿的路就可以了，但如果你不介意的话，我可以直接带你到入口。");
            } else if (status == 4) {
                if (qm.canHold(4032375, 1)) {
                    if (!qm.haveItem(4032375, 1)) {
                        qm.gainItem(4032375, 1);
                    }
                    
                    qm.warp(106020000, 0);
                    qm.forceStartQuest();
                } else {
                    qm.sendOk("请在其他栏中留至少一个位置");
                }
                
                qm.dispose();
                return;
            } else if (status == 5) {
                if (!qm.haveItem(4032375, 1)) {
                    qm.gainItem(4032375, 1);
                }
                
                qm.forceStartQuest();
                qm.dispose();
                return;
            }
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
            if (!qm.haveItem(4032375, 1)) {
                qm.sendNext("你想做什么?");
                qm.dispose();
                return;
            }
            
            qm.sendNext("嗯?那是#b转职官的推荐书#k吗?你是来拯救我们蘑菇王国的人吗?");
        } else if (status == 1) {
            qm.sendNextPrev("嗯...好吧.既然这封信是转职教官写的，我想你就是那个人。我很抱歉没有早点做自我介绍。我是负责保护蘑菇王国的#b警卫队长#k.如你所见，这个临时藏身处很安全受到士兵小组的保护。我们的处境可能很严峻，欢迎你来到蘑菇王国。");
        } else if (status == 2) {
            qm.gainItem(4032375, -1);
            qm.gainExp(6000);
            qm.forceCompleteQuest();
            qm.forceStartQuest(2312);
            qm.dispose();
        }
    }
}