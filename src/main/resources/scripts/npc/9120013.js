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
//Boss Kitty

var status;
var questions;
var answers;
var correctAnswer;
var questionNum;

function start() {
    status = -1;
    questions = new Array("哪一个道具#o9400010#不会掉落?","哪个NPC负责玩家从废弃都市到古代神社的往返?","古代神社出售的什么道具可以提高攻击力?","Which of these items do the Extras NOT drop?","Which of these items DO NOT exist??","What's the name of the vegetable store owner in Showa Town?","Which of these items DO exist?","What is the name of the strongest boss in the Mushroom Shrine?","Which one of these items has a mis-matched class or level description?","Which of these noodles are NOT being sold by Robo at the Mushroom Shrine?","Which of these NPCs do NOT stand in front of Showa Movie Theater?")
    answers = new Array(new Array("#t4000065#","#t4000073#","红色砖头"),new Array("导游倪妮","#p9000020#","导游波利"),new Array("Takoyaki","Yakisoba","Tempura"),new Array("Extra A's Badge","Extra B's Corset","Extra C's Necklace"),new Array("Frozen Tuna","Fan","Fly Swatter"),new Array("Sami","Kami","Umi"),new Array("Cloud Fox's Tooth","Ghost's Bouquet","Dark Cloud Fox's Tail"),new Array("Black Crow","Blue Mushmom","Himegami"),new Array("Bamboo Spear - Warrior-only Weapon","Pico-Pico Hammer - One-handed Sword","Mystic Cane - Level 51 equip"),new Array("Kinoko Ramen (Pig Skull)","Kinoko Ramen (Salt)","Mushroom Miso Ramen"),new Array("Skye","Furano","Shinta"));
    correctAnswer = new Array(1,1,0,1,2,2,2,0,0,2,2);
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    }
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
            if (cm.isQuestStarted(8012) && !cm.haveItem(4031064)){ //quest in progress
                cm.sendYesNo("你全得到了?现在要回答我的问题吗?");
            }
            else { //quest not started or already completed
                //cm.sendOk("Meeeoooowww!");//lol what's this?
                cm.dispose();
            }
        }
        else if (status == 1 && mode == 1) {
            var hasChicken = true;
            if (!cm.haveItem(2020001,300)) hasChicken=false;
            if (!hasChicken) {
                cm.sendOk("什么? 不! 300!一个都不能少...");
                cm.dispose();
            }
            else {
                cm.gainItem(2020001, -300)
                cm.sendNext("做得好!等一...瞧!我得到了一些食物! 你自便.现在回答我的问题,如果答对了,这就是你的!");
            }
        }
        else if (status == 7 && mode == 1) { //2-6 are the questions
            if (selection != correctAnswer.pop()){
                cm.sendNext("嗯...不管怎么样人总会出错! 如果想再试试,再给我300个炸鸡.")
                cm.dispose();
            }
            else {
                cm.sendNext("口当,你都答对了.虽然我不喜欢人类,但是我承诺的, 给你#b#z4031064#.")
            }
        }
        else if (status == 8 && mode == 1) { //gain marble
            cm.gainItem(4031064, 1);
            cm.sendOk("我们的交易到此为止了,虽然很感谢你,但是你现在可以走了!");
            cm.dispose();
        }
        else if (status >= 2 && status <= 6 && mode == 1) {//questions
            var cont = true;
            if (status > 2) {
                if (selection != correctAnswer.pop()){
                    cm.sendNext("嗯...不管怎么样人总会出错! 如果想再试试,再给我300个炸鸡.")
                    cm.dispose();
                    cont = false;
                }
            }
            if (cont) {
                questionNum = Math.floor(Math.random() * questions.length);
                if (questionNum != (questions.length - 1)){
                    var temp;
                    temp = questions[questionNum];
                    questions[questionNum] = questions[questions.length - 1];
                    questions[questions.length - 1] = temp;
                    temp = answers[questionNum];
                    answers[questionNum] = answers[questions.length - 1];
                    answers[questions.length - 1] = temp;
                    temp = correctAnswer[questionNum];
                    correctAnswer[questionNum] = correctAnswer[questions.length - 1];
                    correctAnswer[questions.length - 1] = temp;
                }
                var question = questions.pop();
                var answer = answers.pop();
                var prompt = "第" + (status - 1) + "题: " + question;
                for (var i = 0; i < answer.length; i++)
                    prompt += "\r\n#b#L" + i + "#" + answer[i] + "#l#k";
                cm.sendSimple(prompt);
            }
        }
    }
}