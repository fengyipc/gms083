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
/* Grendel the Really Old
    Magician Job Advancement
    Victoria Road : Magic Library (101000003)

    Custom Quest 100006, 100008, 100100, 100101
*/

status = -1;
actionx = { "1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false };
job = 210;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 2;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "经过不懈的努力才能达到你今天所拥有的力量、智慧和勇气，对吧？ 你觉得把你现在角色的形象做成名人堂里的NPC怎么样?";
        if (spawnPnpcFee > 0) {
            sendStr += "我可以为你服务,你需要支付#b " + cm.numberWithCommas(spawnPnpcFee) + "金币.#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("你想转职成为#r法师#k? 你的等级必须到达10级,并且 " + cm.getFirstJobStatRequirement(jobType) + "#k.来看看.");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 200) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("哈哈…我就知道你会轻松通过考试的。我承认，你是一个伟大的魔法师。我会让你比现在更强大。但在那之前。。。你需要从给你的两条路中选择一条。这对你来说是个艰难的决定，但是。。。如果有什么问题要问，请问。");
            else if (cm.haveItem(4031009)) {
                cm.sendOk("去看看#b#p1072001##k.");
                cm.dispose();
            } else
                cm.sendNext("嗯。。。自从我上次见到你以来，你已经成长了很多。我没有看到我以前看到的弱者，相反，现在看起来更像一个弓箭手。你觉得呢？难道你不想变得更强大吗？通过一个简单的测试，我会使你更强。你想继续吗？");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 2 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("给你.几天前,冰峰雪域的#b#p2020009##k跟我谈起了你.我知道你对法师的第三次转职的有着较大的兴趣.为了达到这个目标,我必须测试你的力量，看看能否达到转职要求。在金银岛的一片深邃的森林中间有一个洞口,它会把你引向一条秘密通道.一旦进入,你将面我的分身.你的任务是打败她，获取#b#t4031059##k带回来.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请把#b#t4031059##k带回来.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("恭喜你，打败了我的分身，获取#b#t4031059##k后安全返回。你现在已经证明了自己。现在你应该把这条项链给#b#p2020011##k，在冰峰雪域接受第二部分的测试。祝你好运。");
        } else {
            cm.sendOk("你的选择很明智。");
            cm.dispose();
        }
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == -1 && selection == -1) {
        cm.dispose();
        return;
    } else if (mode == 0 && type == 0) {
        status -= 2;
    }

    if (status == -1) {
        start();
        return;
    } else {
        if (spawnPnpc) {
            if (mode > 0) {
                if (cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("对不起，你没有足够的金币来购买你在名人堂的位置。");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("给你！希望你会喜欢。");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("不好意思,满员了");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("你知道别无选择...");
                if (!(mode == 0 && type == 0)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 8 && cm.canGetFirstJob(jobType)) {
                cm.sendYesNo("这是一个重要的最终选择。你不能反悔。");
            } else {
                cm.sendOk("再训练一下,直到你达到基本要求，我可以让你成为#r法师#k.");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(1372043)) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(200);
                    cm.gainItem(1372043, 1);
                    cm.resetStats();
                }
                cm.sendNext("好吧，从这开始，你就是我们的一员了！你将过着四处游走的生活，但只要耐心一点，你就会过上更好的生活。好吧，不多，但我会给你一些我的能力。。。哈哈！！！");
            } else {
                cm.sendNext("背包需要清理出一些空间.");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("你现在变得更强大了,我给了你一点点#b能力值#k. 当你打开#b技能#k 菜单在屏幕的左下角,您可以使用SP'.不过,有一个警告:你不可能一下子把它都提起来.也有一些技能只有在你先学会了一些技能之后才能获得.");
        else if (status == 3)
            cm.sendNextPrev("现在提醒你。一旦你选择了，你就不能改变主意，尝试选择另一条路。去吧，做一个强大的法师。");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("好吧，当你做出决定后，点击底部的[我将选择我的职业]。\b\r\n#L0#请向我解释火毒法师。#l\r\n#L1#请向我解释一下冰雷法师。#l\r\n#L2#请向我解释一下牧师。#l\r\n#L3#我将选择我的职业！#l");
            else {
                cm.sendNext("很好的决定。你看起来很厉害，但我需要看看你是否真的足够厉害，能通过考试，这不是一个困难的考试，所以你会做得很好。给，先拿我的信。。。一定不要丢了！");
                if (!cm.isQuestStarted(100006)) cm.startQuest(100006);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031009)) {
                    if (!cm.haveItem(4031009))
                        cm.gainItem(4031009, 1);
                    cm.sendNextPrev("请把这封信送到#b#m101020000##k的#b#p1072001##k.把信给她，她就代替我来考验你。祝你好运.");
                } else {
                    cm.sendNext("请在你的背包中留出一些空间。");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {
                        cm.sendNext("火毒法师擅长使用火焰和剧毒魔法,很强力的单体输出.");    //f/p mage
                    } else if (selection == 1) {
                        cm.sendNext("冰雷法师擅长使用寒冰和雷电魔法,很强力的群体输出和控制.");    //i/l mage
                    } else {
                        cm.sendNext("牧师擅长使用神圣魔法,可以为队友治疗,可以给队友提供很强的增益法术.");    //牧师
                    }

                    status -= 2;
                } else
                    cm.sendSimple("现在决定好了吗. #b\r\n#L0#巫师(火/毒)\r\n#L1#巫师(冰/雷)\r\n#L2#牧师");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031009)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("你想转职成为" + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + "? 一旦选择就不能反悔了,确定吗?");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100008);
            cm.sendNext("好的,你现在是一个" + (job == 210 ? "#b巫师(火/毒)#k" : job == 220 ? "#b巫师(冰/雷)#k" : "#b牧师#k") + "了.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
            cm.dispose();
        }
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("把#b#t4031059##k带过来.");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}