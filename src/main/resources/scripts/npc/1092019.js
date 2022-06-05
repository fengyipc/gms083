/*
    This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    Copyleft (L) 2016 - 2019 RonanLana (HeavenMS)

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/*
-- JavaScript -----------------
Lord Jonathan - Nautilus' Port
-- Created By --
    Cody (Cyndicate)
-- Totally Recreated by --
    Moogra
-- And Quest Script by --
    Ronan
-- Function --
No specific function, useless text.
-- GMS LIKE --
*/

var status;

var seagullProgress;
var seagullIdx = -1;
var seagullQuestion = ["一天,我去了海边，抓了62只章鱼当晚餐.但后来有个孩子过来给了我10个章鱼作为礼物! 那么我有多少章鱼?"];
var seagullAnswer = ["72"];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {    // missing script for skill test found thanks to Jade鈩?
            if (!cm.isQuestStarted(6400)) {
                cm.sendOk("你是谁?找我干嘛?无聊的话去玩泥巴去.");
                cm.dispose();
            } else {
                seagullProgress = cm.getQuestProgressInt(6400, 1);

                if (seagullProgress == 0) {
                    seagullIdx = Math.floor(Math.random() * seagullQuestion.length);

                    // string visibility thanks to ProXAIMeRx & Glvelturall
                    cm.sendNext("那好吧！我现在就给你第一个问题！你最好准备好了，因为这个很难。就连这里的海鸥都认为这一次很难。这是一个相当困难的问题。");
                } else if (seagullProgress == 1) {
                    cm.sendNext("现在~让我们继续下一个问题。这个真的很难。巴特，我得帮我一把。你认识巴特，对吧？");
                } else {
                    cm.sendNext("哦！这真是令人印象深刻！我认为我的考试很难，你要通过这个考试。。。你确实是海盗家族中不可或缺的一员，也是海鸥的朋友。我们之间的友谊将持续一生，我们现在是紧密相连的！而且，最重要的是，当你处于困境时，朋友会帮助你。如果你处于紧急状态，叫我们海鸥。");
                }
            }
        } else if (status == 1) {
            if (seagullProgress == 0) {
                cm.sendGetText(seagullQuestion[seagullIdx]);
            } else if (seagullProgress == 1) {
                cm.sendNextPrev("我现在会把你送到一个空房间.在里面你会看到9个巴特. 哈哈哈~ 他们是孪生兄弟?当然不是.我只是用了点魔法而已.");
            } else {
                cm.sendNextPrev("有麻烦就通知我们使用地毯式空袭,谁叫我们是朋友.\r\n\r\n  #s5221003#    #b#q5221003##k");
            }
        } else if (status == 2) {
            if (seagullIdx > -1) {
                var answer = cm.getText();
                if (answer == seagullAnswer[seagullIdx]) {
                    cm.sendNext("什么! 我真想不到你这么聪明! 难以置信! 在海鸥世界里，这种智慧会给你一个博士学位，然后一些。 太神奇了... 难以置信... 我不信!");
                    cm.setQuestProgress(6400, 1, 1);
                    cm.dispose();
                } else {
                    cm.sendOk("嗯,我记得好像不是这样的");
                    cm.dispose();
                }
            } else if (seagullProgress != 2) {
                cm.sendNextPrev("无论如何,只有一个才是真正的巴特.你知道海盗以他们与海盗同伴的友谊和友情而闻名。如果你是真正的海盗, 你就能很容易找出你的同伴.闲话不多说了,现在送你进去.");
            } else {
                //cm.gainExp(1000000);
                //cm.teachSkill(5221003, 0, 10, -1);
                //cm.forceCompleteQuest(6400);

                cm.sendNextPrev("你通过了我所有的挑战！干得好！");
                cm.dispose();
            }
        } else if (status == 3) {
            var em = cm.getEventManager("4jaerial");
            if (!em.startInstance(cm.getPlayer())) {
                cm.sendOk("另一个玩家已经在挑战这个频道的测试。请尝试其他频道，或等待当前玩家结束挑战。");
            }

            cm.dispose();
        }
    }
}