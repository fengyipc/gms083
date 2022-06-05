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
/* Dances with Balrog
    Warrior Job Advancement
    Victoria Road : Warriors' Sanctuary (102000003)

    Custom Quest 100003, 100005
*/

status = -1;
actionx = { "1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false };
job = 110;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 1;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "你已经走了很长的路才达到今天所拥有的力量、智慧和勇气，不是吗？ 你对现在名人堂中的#ra NPC 持有你角色的当前形象#k 有什么看法？ 你喜欢它吗？";
        if (spawnPnpcFee > 0) {
            sendStr += " 我能为你做这件事，只需付出 #b " + cm.numberWithCommas(spawnPnpcFee) + " 金币。#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你想成为#r战士#k?这是需要一些条件的#b你至少得10级,并且" + cm.getFirstJobStatRequirement(jobType) + "#k.");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 100) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("... 你安全回来了!我就知道你可以的.你是一个合格的战士!我允许你进行第二次转职。在那之前,你要选择你想要转职的分支。有什么疑问就问我吧。");
            else if (cm.haveItem(4031008)) {
                cm.sendOk("去找#b#p1072000##k.");
                cm.dispose();
            } else
                cm.sendNext("你取得了惊人的进步.");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && (cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 1 && !cm.getPlayer().gotPartyQuestItem("JBP")))) {
            actionx["3thJobI"] = true;
            cm.sendNext("我一直在等你。几天前，我从 #b#p2020008##k 那里听说了你。嗯……我想试试你的实力。蚂蚁广场附近有一条秘密通道。除了你，没有人可以进入那个通道。 如果你进入通道，你会遇见我的分身。 打败他，把 #b#t4031059##k 带回来给我。");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请把 #b#t4031059##k带回来给我。");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("哇...你打败了我的另一个自我，并把#b#t4031059##k 带给了我。好的！这无疑证明了你的实力。就实力而言，你已经准备好进行第三次转职了。正如我所承诺的，我会给你#b#t4031057##k。将这条项链交给神秘岛的#b#p2020008##k，您将能够参加第三次转职的第二项测试。祝你好运~");
        } else {
            cm.sendOk("你的选择很明智.");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type != 1) {
        status -= 2;
    }

    if (status == -1) {
        start();
        return;
    } else {
        if (spawnPnpc) {
            if (mode > 0) {
                if (cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("抱歉,你钱不够.");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("希望你喜欢.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("抱歉,.荣耀大厅满了..");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJob"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("下定决心再来找我。");
                if (!(mode == 0 && type != 1)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType)) {
                cm.sendNextPrev("这个选择很重要并且无法反悔.");
            } else {
                cm.sendOk("继续训练直到满足我刚刚告诉你成为#r战士#k最起码的要求.");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1302077)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(100);
                    cm.gainItem(1302077, 1);
                    cm.resetStats();
                }
                cm.sendOk("从现在开始,你就是一个合格的战士了.这个职业并不轻松,但是如果你努力练习加强你的力量和技能,你可以克服碰到的任何困难.加油吧!");
                cm.dispose();
            } else {
                cm.sendOk("给背包腾出一些空间然后再来和我对话.");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("你现在比开始成长了不少。你的技能栏新增了一排技能。自己去看看吧。我只是给了你一点#bSP#k。当您打开屏幕左下角的#bSkill#k菜单时，您可以使用SP来学习一些技能。不过，有一些技能只有在先学会了一些技能后才能获得。");
        else if (status == 3)
            cm.sendNextPrev("现在提醒一下。一旦你选择了，你就不能改变主意并尝试选择另一条路。去吧，像个骄傲的战士一样战斗吧！");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("#b\r\n#L0#剑客怎么样.\r\n#L1#准骑士怎么样.\r\n#L2#枪战士怎么样.\r\n#L3#我要转职!");
            else {
                cm.sendNext("你做得很好.你看着很厉害了,但我还是需要测试一下你的能力,测试不难,放开去做就好了.给,拿着我的信件...千万别弄丢了!");
                if (!cm.isQuestStarted(100003)) cm.startQuest(100003);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031008)) {
                    if (!cm.haveItem(4031008))
                        cm.gainItem(4031008, 1);
                    cm.sendNextPrev("把这封信送给勇士部落附近#b#m102020300##k的#b#p1072000##k.他是战士职业指导员.把信给他他会测试你的能力.祝你好运.");
                } else {
                    cm.sendNext("你背包的空间不足.");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //fighter
                        cm.sendNext("精通使用#b剑#k和#b斧#k的战士.\r\n\r\n#r剑客#k很厉害.");
                    } else if (selection == 1) {    //page
                        cm.sendNext("精通使用#b剑#k和#b钝器#k的战士.\r\n\r\n#r准骑士#k很厉害.");
                    } else {    //spearman
                        cm.sendNext("精通使用#b枪#k和#b矛#k的战士.\r\n\r\n#r枪战士#k很厉害.");
                    }
                    status -= 2;
                } else
                    cm.sendSimple("现在决定了吗?选择你要转职的职业. #b\r\n#L0#剑客(剑,斧)\r\n#L1#准骑士(剑,钝器)\r\n#L2#枪战士(枪,矛)");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031008)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("确定要转职为" + (job == 110 ? "#b剑客#k" : job == 120 ? "#b准骑士#k" : "#b枪战士#k") + "?一旦决定了就无法反悔了,确定吗?");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100005);
            cm.sendNext("如你所愿.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚给你了一本作为" + (job == 110 ? "剑客" : job == 120 ? "准骑士" : "枪战士") + "的技能书.");
        else if (status == 5)
            cm.sendNextPrev("增加了一些技能点.打开#b技能面板#k.你可以学习新的技能了");
        else if (status == 6)
            cm.sendNextPrev("请在你更加强大以后找到我。我会等你的。");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("打败我的分身.并且带回#b#t4031059##k.");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}

/* 3th Job Part
    PORTAL 20 MINUTES.
 */