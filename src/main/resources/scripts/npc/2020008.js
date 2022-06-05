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

status = -1;
var job;
var sel;
actionx = { "Mental": false, "Physical": false };

function start() {
    if (cm.isQuestStarted(6192)) {
        if (cm.getParty() == null) {
            cm.sendOk("组队参加.");
            cm.dispose();
            return;
        }

        var em = cm.getEventManager("ElnathPQ");
        if (em == null) {
            cm.sendOk("任务脚本有问题.");
            cm.dispose();
            return;
        }

        var eli = em.getEligibleParty(cm.getParty());
        if (eli.size() > 0) {
            if (!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                cm.sendOk("其他队伍已经开始了任务,请等待他们出来或者去其他频道看看.");
            }
        }
        else {
            cm.sendOk("你不能开始任务,因为你队伍人数不足或者有人等级不满足要求,试试队伍搜索.");
        }

        cm.dispose();
        return;
    }

    var jobBase = parseInt(cm.getJobId() / 100);
    var jobStyle = 1;
    if (!(cm.getPlayer().getLevel() >= 70 && jobBase == jobStyle && cm.getJobId() % 10 == 0)) {
        if (cm.getPlayer().getLevel() >= 50 && jobBase % 10 == jobStyle) {
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
    cm.sendSimple("有什么可以为你效劳吗?#b" + (cm.getJobId() % 10 == 0 ? "\r\n#L0#我想做三转任务.#l" : "") + "\r\n#L1#请让我做扎昆任务#l.");
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type == 0) {
        status -= 2;
    } else if (mode != 1 || (status > 2 && !actionx["Mental"]) || status > 3) {
        if (mode == 0 && type == 1)
            cm.sendNext("做决定吧.");
        cm.dispose();
        return;
    }
    if (actionx["Mental"]) {
        if (status == 0)
            cm.sendNext("很好的完成了智力测试。你回答了所有的问题。我必须说，你在那里表现出的智慧给我留下了深刻的印象。在我们开始下一步之前，请先把项链递给我。");
        else if (status == 1)
            cm.sendYesNo("好了!你现在是更强大的战士了.");
        else if (status == 2) {
            /*if (cm.getPlayer().getRemainingSp() > 0)
                if (cm.getPlayer().getRemainingSp() > (cm.getLevel() - 70) * 3) {
                    cm.sendNext("请用光SP.");
                    cm.dispose();
                    return;
                }*/
            if (cm.getJobId() % 10 == 0) {
                cm.gainItem(4031058, -1);
                cm.changeJobById(cm.getJobId() + 1);
                cm.getPlayer().removePartyQuestItem("JBQ");
            }

            if (Math.floor(cm.getJobId() / 10) == 11) cm.sendNext("恭喜你，你现在是#b勇士#k了. 一些新的攻击技能，如#b虎咆哮#k和#b狂乱剑#k是具有毁灭性的,使用#b防御崩坏#k会削弱怪物的防御能力。最好集中精力用你在战斗中掌握的武器来获得技能。");
            else if (Math.floor(cm.getJobId() / 10) == 12) cm.sendNext("恭喜你，你现在是#b骑士#k了. 你将获得新的技能栏，包括各种新的攻击技能以及基于元素的攻击。建议在这一栏中补充的武器类型，无论是剑还是钝器，都应该继续当骑士。有一种技能叫做#b元素合击#k,它为武器添加了冰、火和闪电元素，使骑士成为唯一一个可以执行基于元素的攻击的战士。给你的武器充能一个削弱怪物的元素，然后使用#b冰雷合击#k.这肯定会让你成为这里毁灭性的力量。");
            else cm.sendNext("恭喜你，你现在是龙骑士#k了.你将学习新的矛和枪系列武器的攻击技能，无论选择什么武器，龙骑士都是强大的存在。龙骑士的技能，如#b龙之献祭#k(对一个怪物的最大伤害)和#b龙咆哮#k(对多个怪物的伤害)被推荐为主要的攻击技能，#b龙咆哮#k是全屏幕强力攻击。缺点是技能会消耗一半以上的可用生命。");
        } else if (status == 3) {
            cm.sendNextPrev("我也给了你一些技能点和能力值，这将帮助你开始。你现在真的成了一个强大的战士。不过，请记住，现实世界将等待你的到来，还有更艰难的障碍要克服。一旦你觉得你不能训练自己去更高的地方，那么，只有这样，来见我。我会在这里等你。");
        }
    } else if (actionx["Physical"]) {
        if (status == 0)
            cm.sendNext("很好的完成了力量测试。我就知道你能做到。既然你已经通过了上半部分的考试，下面是下半部分。请先把项链给我。");
        else if (status == 1) {
            if (cm.haveItem(4031057)) {
                cm.gainItem(4031057, -1);
                cm.getPlayer().setPartyQuestItemObtained("JBQ");
            }
            cm.sendNextPrev("这是考试的后半部分。这项测试将决定你是否足够聪明，能够迈出迈向成功的下一步。在冰封雪域的雪原上有一个被雪覆盖的黑暗区域，叫做圣地，连怪物都无法到达。在这个区域的中心有一块巨大的石头，叫做圣石。你需要提供一个特殊的项目作为祭品，然后圣石将测试你的智慧。");
        } else if (status == 2)
            cm.sendNextPrev("你需要诚实而坚定地回答每一个问题。如果你正确回答了所有的问题，那么圣石会正式接受你并把你交给你#b#t4031058##k.把项链拿回来，我会帮你走到下一步。祝你好运。");
    } else if (cm.getPlayer().gotPartyQuestItem("JB3") && selection == 0) {
        cm.sendNext("去跟#b#p1022000##k对话，并把#b#t4031057##k带回来给我.");
        cm.dispose();
    } else if (cm.getPlayer().gotPartyQuestItem("JBQ") && selection == 0) {
        cm.sendNext("去跟#b#p2030006##k对话，并把#b#t4031058##k带回来给我.");
        cm.dispose();
    } else {
        if (sel == undefined)
            sel = selection;
        if (sel == 0) {
            if (cm.getPlayer().getLevel() >= 70 && cm.getJobId() % 10 == 0) {
                if (status == 0)
                    cm.sendYesNo("欢迎你，我是#b#p2020008##k,所有战士的教官,在每一个需要我指导的战士身上发挥出最好的一面。你好像是那种想成为强大存在的勇士，准备迎接第三次转职挑战的人。但我见过无数的战士像你一样渴望转职，结果却失败了的人。那你呢？你准备好接受考验并获得第三次转职了吗？");
                else if (status == 1) {
                    cm.getPlayer().setPartyQuestItemObtained("JB3");
                    cm.sendNext("很好。你将受到两个重要方面的考验：力量和智慧。我现在给你解释一下测试的物理部分。你还记得勇士部落的#b#p1022000##k吗?去见他，他会告诉你考试前半部分的细节。请完成任务，然后从#p1022000#k把#b#t4031057##k带回来给我.");
                } else if (status == 2)
                    cm.sendNextPrev("只有你通过了身体部分的测试，心理部分的测试才能开始。#b#t4031057##k将证明你确实通过了考试。我会让#b#p1022000##k对你进行测试。在你到达目的地之前，做好准备。这不容易，但我对你有极大的信心。祝你好运。");
            }
        } else {
            if (cm.getPlayer().getLevel() >= 50) {
                cm.sendOk("长老会让你挑战扎昆，祝你一切顺利。");
                if (!(cm.isQuestStarted(100200) || cm.isQuestCompleted(100200))) cm.startQuest(100200);
                if (Packages.config.YamlConfig.config.server.USE_ENABLE_SOLO_EXPEDITIONS && !cm.isQuestCompleted(100201)) cm.completeQuest(100201);
            } else
                cm.sendOk("你太弱了，还无法挑战#r扎昆#k. 至少达到#b50级#k以后，再与我交谈。");
            cm.dispose();
        }
    }
}