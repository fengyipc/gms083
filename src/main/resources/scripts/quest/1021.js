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
/* Author: Xterminator
 * Edited by XxOsirisxX

	NPC Name: 		Roger
	Map(s): 		Maple Road : Lower level of the Training Camp (2)
	Description: 		Quest - Roger's Apple
*/
importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
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
        
        if (status == 0)
            qm.sendNext("嘿, " + (qm.getPlayer().getGender() == 0 ? "先生" : "小姐") + "~ 有什么事吗? 哈哈! 我是罗杰,可以告诉你一些冒险岛的信息.");
        else if (status == 1)
            qm.sendNextPrev("你在问是谁让我这么做的？ 哈哈哈!\r\n我自己!我想这么做，对你们这些新来的旅行者友好一点。");
        else if (status == 2)
            qm.sendAcceptDecline("所以。。。。。让我这样做只是为了好玩！哈哈哈哈哈~！");
        else if (status == 3) {
            if (qm.getPlayer().getHp() >= 50) {
                qm.getPlayer().updateHp(25);
            }
            
            if (!qm.haveItem(2010007)) {
                qm.gainItem(2010007, 1);
            }
            
            qm.forceStartQuest();
            qm.sendNext("惊讶吗？如果HP变为0，那么您就有麻烦了。现在，我给你#r罗杰的苹果#k。请拿着。你会感觉更强壮。打开道具栏并双击以使用。嘿，打开道具栏很简单。只需按键盘上的“#bI#k”键。");
        } else if (status == 4) {
            qm.sendPrev("请把我给你的罗杰的苹果都拿走。你将可以看到生命条增加。当你的生命恢复到100%时，请再跟我说一次。");
        } else if (status == 5) {
            qm.showInfo("UI/tutorial.img/28");
            qm.dispose();
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
        
        if (status == 0)
            if (qm.c.getPlayer().getHp() < 50) {
                qm.sendNext("嘿, 你的HP还没回满.我给你的罗杰的苹果你都吃了吗?你确定?");
                qm.dispose();
            } else
                qm.sendNext("使用消耗品是不是很简单呢?你还可以把消耗品设置到快捷键上.");
        else if (status == 1)
            qm.sendNextPrev("干得好!这是我为你准备的礼物");
        else if (status == 2)
            qm.sendPrev("好了,这就是我可以教你的全部了.是时候说再见了.照顾好自己我的朋友!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v2010000# 3 #t2010000#\r\n#v2010009# 3 #t2010009#\r\n\r\n#fUI/UIWindow.img/QuestIcon/8/0# 10 exp");
        else if (status == 3) {
            if(qm.isQuestCompleted(1021))
                qm.dropMessage(1,"未知错误");
            else if(qm.canHold(2010000) && qm.canHold(2010009)){
                qm.gainExp(10);
                qm.gainItem(2010000, 3);
                qm.gainItem(2010009, 3);
                qm.forceCompleteQuest();
            }else
                qm.dropMessage(1,"你的背包满了");
            qm.dispose();
        }
    }
}