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
/* Dark Lord
    Thief Job Advancement
    Victoria Road : Thieves' Hideout (103000003)
    Custom Quest 100009, 100011
*/

status = -1;
actionx = { "1stJob": false, "2ndjob": false, "3thJobI": false, "3thJobC": false };
job = 410;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 4;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "You have walked a long way to reach the power, wisdom and courage you hold today, haven't you? What do you say about having right now #ra NPC on the Hall of Fame holding the current image of your character#k? Do you like it?";
        if (spawnPnpcFee > 0) {
            sendStr += " I can do it for you, for the fee of #b " + cm.numberWithCommas(spawnPnpcFee) + " mesos.#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("要转职为#r飞侠#k?你需要10级,并且" + cm.getFirstJobStatRequirement(jobType) + "#k.");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 400) {
            actionx["2ndJob"] = true;
            if (cm.haveItem(4031012))
                cm.sendNext("你做得很好,可以开始下一阶段了.");
            else if (cm.haveItem(4031011)) {
                cm.sendOk("去找#b#p1072003##k.");
                cm.dispose();
            } else
                cm.sendNext("你的进展是惊人的.");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 4 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("几天前,冰封雪域的#b#p2020011##k和我提起了你.我知道你想做飞侠的三转任务.因此,我需要测试以下你的的能力.金银岛藻泽地里面有一条秘密通道.你进去以后会发现一个我的分身.你的任务就是击败我的分身并带回#b#t4031059##k");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("请带回#b#t4031059##k.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("做得好.你打败了我的分身并安全的带回了#b#t4031059##k.你现在证明了你拥有三转所需的力量.现在你把这条项链带给冰封雪域的#b#p2020011##k,他会让你进行下一阶段测试.");
        } else if (cm.isQuestStarted(6141)) {
            cm.warp(910300000, 3);
        } else {
            cm.sendOk("这里是大力冒险岛.");
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
                    cm.sendOk("你的金币不够.");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("好了.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("满员了...");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("你知道的,别无选择...");
                if (!(mode == 0 && type != 1)) {
                    cm.dispose();
                    return;
                }
            }
        }
    }

    if (actionx["1stJob"]) {
        if (status == 0) {
            if (cm.getLevel() >= 10 && cm.canGetFirstJob(jobType))
                cm.sendYesNo("嗷...! 你看着可以做飞侠... 现在就要转职成为飞侠吗?");
            else {
                cm.sendOk("不合要求的等级或者属性.");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(2070000) && cm.canHoldAll([1472061, 1332063])) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(400);
                    cm.gainItem(2070015, 500);
                    cm.gainItem(1472061, 1);
                    cm.gainItem(1332063, 1);
                    cm.resetStats();
                }
                cm.sendNext("好吧，从这里开始，你就是飞侠了！");
            } else {
                cm.sendNext("请清理一下背包再找我.");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("你现在更强大了.我给你了一些#b技能点#k.");
        else if (status == 3)
            cm.sendNextPrev("好了,加油吧.");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.haveItem(4031012))
                cm.sendSimple("#b\r\n#L0#介绍刺客.#l\r\n#L1#介绍侠客.#l\r\n#L3#我要转职!#l");
            else {
                cm.sendNext("拿上我的信件进行一个简单的测试!");
                if (!cm.isQuestStarted(100009)) cm.startQuest(100009);
            }
        } else if (status == 1) {
            if (!cm.haveItem(4031012)) {
                if (cm.canHold(4031011)) {
                    if (!cm.haveItem(4031011))
                        cm.gainItem(4031011, 1);
                    cm.sendNextPrev("把信送到#b#p1072003##k手里,他应该在#b#m102040000##k附近.");
                } else {
                    cm.sendNext("请给背包腾出一些空间.");
                    cm.dispose();
                }
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //assassin
                        cm.sendNext("使用#r拳套#k,擅长投掷暗器,是很强大的输出机器.");
                    } else if (selection == 1) {    //bandit
                        cm.sendNext("使用#r短剑#k,近身攻击.");
                    }

                    status -= 2;
                } else
                    cm.sendSimple("拿定主意了?请选择职业进行转职. #b\r\n#L0#刺客#l\r\n#L1#侠客#l");
            }
        } else if (status == 2) {
            if (cm.haveItem(4031011)) {
                cm.dispose();
                return;
            }
            job += selection * 10;
            cm.sendYesNo("确认要转职为" + (job == 410 ? "#b刺客#k" : "#b侠客#k") + "?");
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);
            cm.completeQuest(100011);
            if (job == 410) cm.sendNext("好的!");
            else cm.sendNext("好的.");

            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else
            cm.dispose();
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("Since he is a clone of myself, you can expect a tough battle ahead. He uses a number of special attacking skills unlike any you have ever seen, and it is your task to successfully take him one on one. There is a time limit in the secret passage, so it is crucial that you defeat him within the time limit. I wish you the best of luck, and I hope you bring the #b#t4031059##k with you.");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}