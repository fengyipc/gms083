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
/* Kyrin
    Pirate Job Advancement
	
    Custom Quest 100009, 100011
*/

status = -1;
actionx = { "1stJob": false, "2ndjob": false, "2ndjobT": false, "3thJobI": false, "3thJobC": false };
job = 510;

spawnPnpc = false;
spawnPnpcFee = 7000000;
jobType = 5;

var advQuest = 0;
function start() {
    if (cm.isQuestStarted(6330)) {
        if (cm.getEventInstance() != null) {    // missing script for skill test found thanks to Jade鈩?
            advQuest = 5;                       // string visibility thanks to iPunchEm & Glvelturall
            cm.sendNext("不赖,我们聊聊!");
        } else if (cm.getQuestProgressInt(6330, 6331) == 0) {
            advQuest = 1;
            cm.sendNext("准备好了吗?现在尝试抵挡我的攻击2分钟.我可不会放水的.祝你好运.");
        } else {
            advQuest = 3;
            cm.teachSkill(5121003, 0, 10, -1);
            cm.forceCompleteQuest(6330);

            cm.sendNext("恭喜.你通过了我的测试.我会教你 \"超级变身\".\r\n\r\n  #s5121003#    #b#q5121003##k");
        }
    } else if (cm.isQuestStarted(6370)) {
        if (cm.getEventInstance() != null) {
            advQuest = 6;
            cm.sendNext("不赖,我们聊聊!");
        } else if (cm.getQuestProgressInt(6370, 6371) == 0) {
            advQuest = 2;
            cm.sendNext("准备好了吗?现在尝试抵挡我的攻击2分钟.我可不会放水的.祝你好运.");
        } else {
            advQuest = 4;
            cm.teachSkill(5221006, 0, 10, -1);
            cm.forceCompleteQuest(6370);

            cm.sendNext("恭喜.你通过了我的测试.我会教你 \"武装\".\r\n\r\n  #s5221006#    #b#q5221006##k");
        }
    } else if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;

        var sendStr = "经过不懈的努力,你才能达到你今天所拥有的力量、智慧和勇气，对吧？有什么比进入荣耀大厅更吸引人呢?想试试吗?";
        if (spawnPnpcFee > 0) {
            sendStr += "给我#b " + cm.numberWithCommas(spawnPnpcFee) + "金币,我可以让你进入荣耀大厅.#k";
        }

        cm.sendYesNo(sendStr);
    } else {
        if (cm.getJobId() == 0) {
            actionx["1stJob"] = true;
            cm.sendNext("想转职为#r海盗#k?需要一些条件.你的等级必须超过10级, 并且至少有" + cm.getFirstJobStatRequirement(jobType) + "#k.");   // thanks Vcoc for noticing a need to state and check requirements on first job adv starting message
        } else if (cm.getLevel() >= 30 && cm.getJobId() == 500) {
            actionx["2ndJob"] = true;
            if (cm.isQuestCompleted(2191) || cm.isQuestCompleted(2192))
                cm.sendNext("你做得很好.我允许你进行下一次转职.");
            else
                cm.sendNext("你的成长惊人.");
        } else if (actionx["3thJobI"] || (cm.getPlayer().gotPartyQuestItem("JB3") && cm.getLevel() >= 70 && cm.getJobId() % 10 == 0 && parseInt(cm.getJobId() / 100) == 5 && !cm.getPlayer().gotPartyQuestItem("JBP"))) {
            actionx["3thJobI"] = true;
            cm.sendNext("你来了?几天前, 冰封雪域的#b#p2020013##k和我提到你了. 听说你想进行第三次转职.因此我需要测试你的力量.在金银岛中心有一个山洞,进去之后你会发现一个隐秘通道.在里面一将会面对我的分身.你的任务就是击败它并安全带回#b#t4031059##k.");
        } else if (cm.getPlayer().gotPartyQuestItem("JBP") && !cm.haveItem(4031059)) {
            cm.sendNext("拜托,带着#b#t4031059##k来找我.");
            cm.dispose();
        } else if (cm.haveItem(4031059) && cm.getPlayer().gotPartyQuestItem("JBP")) {
            actionx["3thJobC"] = true;
            cm.sendNext("做的漂亮.你成功击败了我的分身并带回了#b#t4031059##k.你证明了你拥有可以进行第三次转职的力量.现在把这条项链带给冰封雪域的#b#p2020013##k进行下一阶段测试.祝你好运.");
        } else {
            cm.sendOk("有什么事吗.");
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
        if (advQuest > 0) {
            if (advQuest < 3) {
                var em = cm.getEventManager(advQuest == 1 ? "4jship" : "4jsuper");
                if (!em.startInstance(cm.getPlayer())) {
                    cm.sendOk("有人正在挑战.请稍等.");
                }
            } else if (advQuest < 5) {
                if (advQuest == 3) {
                    cm.sendOk("它类似于 '超人变形',但是更强.");
                } else {
                    cm.sendOk("不像海盗使用的大部分技能.你可以真正的驾驶'海盗船'进行战斗. 当你坐上海盗船,你的防御力会提升, 这对你的战斗会有很大的帮助.愿你成为世上最强大的枪手...");
                }
            } else {
                if (advQuest < 6) {
                    cm.setQuestProgress(6330, 6331, 2);
                } else {
                    cm.setQuestProgress(6370, 6371, 2);
                }

                cm.warp(120000101);
            }

            cm.dispose();
        } else if (spawnPnpc) {
            if (mode > 0) {
                if (cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("对不起你没有足够的金币.");
                    cm.dispose();
                    return;
                }

                if (Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("搞定!希望你能喜欢.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("对不起,目前已经满员了...");
                }
            }

            cm.dispose();
            return;
        } else {
            if (mode != 1 || status == 7 && type != 1 || (actionx["1stJob"] && status == 4) || (cm.haveItem(4031008) && status == 2) || (actionx["3thJobI"] && status == 1)) {
                if (mode == 0 && status == 2 && type == 1)
                    cm.sendOk("你知道没有别的选择了...");
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
                cm.sendYesNo("噢...!看来你够资格成为我们的一员... 你所需要的仅仅是下定决心.那么,现在要转职成为海盗吗?");
            } else {
                cm.sendOk("你没有满足我的要求.");
                cm.dispose();
            }
        } else if (status == 1) {
            if (cm.canHold(2070000) && cm.canHoldAll([1482000, 1492000])) {
                if (cm.getJobId() == 0) {
                    cm.changeJobById(500);
                    cm.gainItem(1492000, 1);
                    cm.gainItem(1482000, 1);
                    cm.gainItem(2330000, 1000);
                    cm.resetStats();
                }
                cm.sendOk("好的,从现在开始你就是一名海盗了!");
                cm.dispose();
            } else {
                cm.sendNext("Make some room in your inventory and talk back to me.");
                cm.dispose();
            }
        } else if (status == 2)
            cm.sendNextPrev("You've gotten much stronger now. Plus every single one of your inventories have added slots. A whole row, to be exact. Go see for it yourself. I just gave you a little bit of #bSP#k. When you open up the #bSkill#k menu on the lower left corner of the screen, there are skills you can learn by using SP's. One warning, though: You can't raise it all together all at once. There are also skills you can acquire only after having learned a couple of skills first.");
        else if (status == 3)
            cm.sendNextPrev("Now a reminder. Once you have chosen, you cannot change up your mind and try to pick another path. Go now, and live as a proud Pirate.");
        else
            cm.dispose();
    } else if (actionx["2ndJob"]) {
        if (status == 0) {
            if (cm.isQuestCompleted(2191) || cm.isQuestCompleted(2192))
                cm.sendSimple("好的,当你拿定主意了,点击[我要转职].#b\r\n#L0#请介绍一下拳手.\r\n#L1#请介绍一下枪手.\r\n#L3#我要转职!");
            else
                cm.sendNext("好主意.你看起来很厉害,但我还是需要测试一下你,不会太难, 你应该不会让我失望.");
        } else if (status == 1) {
            if (!cm.isQuestCompleted(2191) && !cm.isQuestCompleted(2192)) {
                // Pirate works differently from the other jobs. It warps you directly in.
                actionx["2ndJobT"] = true;
                cm.sendYesNo("现在要开始测试吗?");
            } else {
                if (selection < 3) {
                    if (selection == 0) {    //brawler
                        cm.sendNext("拳手是擅长使用#r拳甲#k的海盗.\r\n\r\n#b拳手#k拥有较高的生存能力,能有不错的近战输出能力.");
                    } else if (selection == 1) {    //gunslinger
                        cm.sendNext("枪手是擅长使用#r短枪#k的海盗.\r\n\r\n#b枪手#k是敏捷的远程输出职业.使用#r轻羽鞋#k技能,可以漂浮在空中,这样就可以跳的更远并且降低下落速度. #r迷惑射击#k还可以让身边的怪物陷入眩晕.");
                    }

                    status -= 2;
                } else
                    cm.sendNextPrev("你还有很长的路要走，但做海盗会帮助你达到目的。记住这一点，你会做得很好的。");
            }
        } else if (status == 2) {
            if (actionx["2ndJobT"]) {
                var map = 0;
                if (cm.isQuestStarted(2191))
                    map = 108000502;
                else
                    map = 108000501;
                if (cm.getPlayerCount(map) > 0) {
                    cm.sendOk("所有的训练地图都在使用中。请稍后再试。");
                    cm.dispose();
                } else {
                    cm.warp(map, 0);
                    cm.dispose();
                    return;
                }
            } else {
                if (cm.isQuestCompleted(2191) && cm.isQuestCompleted(2192))
                    job = (Math.random() < 0.5) ? 510 : 520;
                else if (cm.isQuestCompleted(2191))
                    job = 510;
                else if (cm.isQuestCompleted(2192))
                    job = 520;

                cm.sendYesNo("所以你要转职成为" + (job == 510 ? "#b拳手#k" : "#b枪手#k") + "?一旦决定了就不能反悔了,确定吗?");
            }
        } else if (status == 3) {
            if (cm.haveItem(4031012))
                cm.gainItem(4031012, -1);

            if (job == 510) cm.sendNext("那么从此你就是一个#b拳手了#k. ");
            else cm.sendNext("那么从此你就是一个#b枪手了#k.");
            if (cm.getJobId() != job)
                cm.changeJobById(job);
        } else if (status == 4)
            cm.sendNextPrev("我刚刚给了你作为" + (job == 510 ? "拳手" : "枪手") + "的技能书.顺便也增加了一下你的背包空间.同时你的HP,MP也提升了.");
        else if (status == 5)
            cm.sendNextPrev("我还给你了一些#b技能点#k.打开#b技能菜单#k.你现在就可以学习二转技能了.");
        else if (status == 6)
            cm.sendNextPrev("好好冒险吧");
    } else if (actionx["3thJobI"]) {
        if (status == 0) {
            if (cm.getPlayer().gotPartyQuestItem("JB3")) {
                cm.getPlayer().removePartyQuestItem("JB3");
                cm.getPlayer().setPartyQuestItemObtained("JBP");
            }
            cm.sendNextPrev("他是我的分身,你将会陷入苦战.他会使用你可能都没有见过的技能.秘密通道有时间限制,你必须在时间结束前打败他.祝你好运,希望你能安全带回#b#t4031059##k.");
        }
    } else if (actionx["3thJobC"]) {
        cm.getPlayer().removePartyQuestItem("JBP");
        cm.gainItem(4031059, -1);
        cm.gainItem(4031057, 1);
        cm.dispose();
    }
}