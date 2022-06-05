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
	NPC Name: 		Cloy
	Map(s): 		Victoria Road : Henesys Park (100000200)
	Description: 		Pet Master
 */
    var status = -2;
    var sel;
    
    function start() {
        status = -2
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
                
            if(status == -1) {
                cm.sendNext("。。。你有没有可能抚养我的孩子？我完善了一个咒语，用生命之水赋予洋娃娃生命。人们称之为“#b宠物#k”。如果你身边有人，请随时向我提问。");
            }
            else if (status == 0)
                cm.sendSimple("你想知道更多的吗？#b\r\n#L0#告诉我更多关于宠物的事。#l\r\n#L1#我怎么养宠物？#l\r\n#L2#宠物也会死吗？#l\r\n#L27#请教我如何转移宠物能力点。#l");
            else if (status == 1) {
                sel = selection;
                if (selection == 0) {
                    status = 3;
                    cm.sendNext("所以你想了解更多关于宠物的知识。很久以前，我做了一个洋娃娃，在上面喷洒了生命之水，然后在上面施了咒语，创造了一个神奇的动物。我知道这听起来难以置信，但它是一个真正的玩具娃娃。他们很了解人，也很善于跟随别人。");
                } else if (selection == 1) {
                    status = 6;
                    cm.sendNext("根据你的命令，宠物可以爱它，恨它，并表现出其他种类的反应。如果你的宠物听从你的命令。双击宠物，你可以检查亲密度，水平，丰满度等。。。");
                } else if (selection == 2) {
                    status = 11;
                    cm.sendNext("快死了。。。嗯，从技术上讲，它们本身并不是活着的，所以我不知道用“死亡”这个词是否合适。他们是玩偶与我的神奇力量和生命之水的力量成为一个活的物体。当然，当它活着的时候，它就像一只活的动物。。。");
                } else if (selection == 3)
                    cm.sendNext("These are the commands for #rBrown Kitty and Black Kitty#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, dummy#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1~30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#btalk, say, chat#k (Level 10 ~ 30)\r\n#bcutie#k (Level 10 ~ 30)\r\n#bup, stand, rise#k (Level 20 ~ 30)");
                else if (selection == 4)
                    cm.sendNext("These are the commands for #rBrown Puppy#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, baddog, dummy#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1~30)\r\n#bpee#k (Level 1 ~ 30)\r\n#btalk, say, chat#k (Level 10 ~ 30)\r\n#bdown#k (Level 10 ~ 30)\r\n#bup, stand, rise#k (Level 20 ~ 30)");
                else if (selection == 5)
                    cm.sendNext("These are the commands for #rPink Bunny and White Bunny#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#bup, stand, rise#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1~30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#btalk, say, chat#k (Level 10 ~ 30)\r\n#bhug#k (Level 10 ~ 30)\r\n#bsleep, sleepy, gotobed#k (Level 20 ~ 30)");
                else if (selection == 6)
                    cm.sendNext("These are the commands for #rMini Kargo#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#bup, stand, rise#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1~30)\r\n#bpee#k (Level 1 ~ 30)\r\n#btalk, say, chat#k (Level 10 ~ 30)\r\n#bthelook, charisma#k (Level 10 ~ 30)\r\n#bdown#k (Level 10 ~ 30)\r\n#bgoodboy, goodgirl#k (Level 20 ~ 30)");
                else if (selection == 7)
                    cm.sendNext("These are the commands for #rRudolph and Dasher#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#bup, stand#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, dummy#k (Level 1 ~ 30)\r\n#bmerryxmas, merrychristmas#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1~30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#btalk, say, chat#k (Level 11 ~ 30)\r\n#blonely, alone#k (Level 11 ~ 30)\r\n#bcutie#k (Level 11 ~ 30)\r\n#bmush, go#k (Level 21 ~ 30)");
                else if (selection == 8)
                    cm.sendNext("These are the commands for #rBlack Pig#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1~30)\r\n#bhand#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, dummy#k (Level 1 ~ 30)\r\n#btalk, chat, say#k (Level 10 ~ 30)\r\n#bsmile#k (Level 10 ~ 30)\r\n#bthelook, charisma#k (Level 20 ~ 30)");
                else if (selection == 9)
                    cm.sendNext("These are the commands for #rPanda#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bchill, relax#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#bup, stand, rise#k (Level 1 ~ 30)\r\n#btalk, chat, say#k (Level 10 ~ 30)\r\n#bletsplay#k (Level 10 ~ 30)\r\n#bmeh, bleh#k (Level 10 ~ 30)\r\n#bsleep#k (Level 20 ~ 30)");
                else if (selection == 10)
                    cm.sendNext("These are the commands for #rHusky#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, baddog, dummy#k (Level 1 ~ 30)\r\n#bhand#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#bdown#k (Level 10 ~ 30)\r\n#btalk, chat, say#k (Level 10 ~ 30)\r\n#bup, stand, rise#k (Level 20 ~ 30)");
                else if (selection == 11)
                    cm.sendNext("These are the commands for #rDino Boy and Dino Girl#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badboy, badgirl#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#bsmile, laugh#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, dummy#k (Level 1 ~ 30)\r\n#btalk, chat, say#k (Level 10 ~ 30)\r\n#bcutie#k (Level 10 ~ 30)\r\n#bsleep, nap, sleepy#k (Level 20 ~ 30)");
                else if (selection == 12)
                    cm.sendNext("These are the commands for #rMonkey#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#brest#k (Level 1 ~ 30)\r\n#bbad, no, badboy, badgirl#k (Level 1 ~ 30)\r\n#bpee#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#bup, stand#k (Level 1 ~ 30)\r\n#btalk, chat, say#k (Level 10 ~ 30)\r\n#bplay#k (Level 10 ~ 30)\r\n#bmelong#k (Level 10 ~ 30)\r\n#bsleep, gotobed, sleepy#k (Level 20 ~ 30)");
                else if (selection == 13)
                    cm.sendNext("These are the commands for #rTurkey#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bno, rudeboy, mischief#k (Level 1 ~ 30)\r\n#bstupid#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#bup, stand#k (Level 1 ~ 30)\r\n#btalk, chat, gobble#k (Level 10 ~ 30)\r\n#byes, goodboy#k (Level 10 ~ 30)\r\n#bsleepy, birdnap, doze#k (Level 20 ~ 30)\r\n#bbirdeye, thanksgiving, fly, friedbird, imhungry#k (Level 30)");
                else if (selection == 14)
                    cm.sendNext("These are the commands for #rWhite Tiger#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badboy, badgirl#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#brest, chill#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, dummy#k (Level 1 ~ 30)\r\n#btalk, chat, say#k (Level 10 ~ 30)\r\n#bactsad, sadlook#k (Level 10 ~ 30)\r\n#bwait#k (Level 20 ~ 30)");
                else if (selection == 15)
                    cm.sendNext("These are the commands for #rPenguin#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badboy, badgirl#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#bup, stand, rise#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#btalk, chat, say#k (Level 10 ~ 30)\r\n#bhug, hugme#k (Level 10 ~ 30)\r\n#bwing, hand#k (Level 10 ~ 30)\r\n#bsleep#k (Level 20 ~ 30)\r\n#bkiss, smooch, muah#k (Level 20 ~ 30)\r\n#bfly#k (Level 20 ~ 30)\r\n#bcute, adorable#k (Level 20 ~ 30)");
                else if (selection == 16)
                    cm.sendNext("These are the commands for #rGolden Pig#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badboy, badgirl#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#btalk, chat, say#k (Level 11 ~ 30)\r\n#bloveme, hugme#k (Level 11 ~ 30)\r\n#bsleep, sleepy, gotobed#k (Level 21 ~ 30)\r\n#bignore / impressed / outofhere#k (Level 21 ~ 30)\r\n#broll, showmethemoney#k (Level 21 ~ 30)");
                else if (selection == 17)
                    cm.sendNext("These are the commands for #rRobot#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bup, stand, rise#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, dummy#k (Level 1 ~ 30)\r\n#bbad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#battack, charge#k (Level 1 ~ 30)\r\n#biloveyou#k (Level 1 ~ 30)\r\n#bgood, thelook, charisma#k (Level 11 ~ 30)\r\n#bspeack, talk, chat, say#k (Level 11 ~ 30)\r\n#bdisguise, change, transform#k (Level 11 ~ 30)");
                else if (selection == 18)
                    cm.sendNext("These are the commands for #rMini Yeti#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad, no, badboy, badgirl#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#bdance, boogie, shakeit#k (Level 1 ~ 30)\r\n#bcute, cutie, pretty, adorable#k (Level 1 ~ 30)\r\n#biloveyou, likeyou, mylove#k (Level 1 ~ 30)\r\n#btalk, chat, say#k (Level 11 ~ 30)\r\n#bsleep, nap, sleepy, gotobed#k (Level 11 ~ 30)");
                else if (selection == 19)
                    cm.sendNext("These are the commands for #rJr. Balrog#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bliedown#k (Level 1 ~ 30)\r\n#bno|bad|badgirl|badboy#k (Level 1 ~ 30)\r\n#biloveyou|mylove|likeyou#k (Level 1 ~ 30)\r\n#bcute|cutie|pretty|adorable#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#bsmirk|crooked|laugh#k (Level 1 ~ 30)\r\n#bmelong#k (Level 11 ~ 30)\r\n#bgood|thelook|charisma#k (Level 11 ~ 30)\r\n#bspeak|talk|chat|say#k (Level 11 ~ 30)\r\n#bsleep|nap|sleepy#k (Level 11 ~ 30)\r\n#bgas#k (Level 21 ~ 30)");
                else if (selection == 20)
                    cm.sendNext("These are the commands for #rBaby Dragon#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bno|bad|badgirl|badboy#k (Level 1 ~ 30)\r\n#biloveyou|loveyou#k (Level 1 ~ 30)\r\n#bpoop#k (Level 1 ~ 30)\r\n#bstupid|ihateyou|dummy#k (Level 1 ~ 30)\r\n#bcutie#k (Level 11 ~ 30)\r\n#btalk|chat|say#k (Level 11 ~ 30)\r\n#bsleep|sleepy|gotobed#k (Level 11 ~ 30)");
                else if (selection == 21)
                    cm.sendNext("These are the commands for #rGreen/Red/Blue Dragon#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 15 ~ 30)\r\n#bno|bad|badgirl|badboy#k (Level 15 ~ 30)\r\n#biloveyou|loveyou#k (Level 15 ~ 30)\r\n#bpoop#k (Level 15 ~ 30)\r\n#bstupid|ihateyou|dummy#k (Level 15 ~ 30)\r\n#btalk|chat|say#k (Level 15 ~ 30)\r\n#bsleep|sleepy|gotobed#k (Level 15 ~ 30)\r\n#bchange#k (Level 21 ~ 30)");
                else if (selection == 22)
                    cm.sendNext("These are the commands for #rBlack Dragon#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 15 ~ 30)\r\n#bno|bad|badgirl|badboy#k (Level 15 ~ 30)\r\n#biloveyou|loveyou#k (Level 15 ~ 30)\r\n#bpoop#k (Level 15 ~ 30)\r\n#bstupid|ihateyou|dummy#k (Level 15 ~ 30)\r\n#btalk|chat|say#k (Level 15 ~ 30)\r\n#bsleep|sleepy|gotobed#k (Level 15 ~ 30)\r\n#bcutie, change#k (Level 21 ~ 30)");
                else if (selection == 23)
                    cm.sendNext("These are the commands for #rJr. Reaper#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bno|bad|badgirl|badboy#k (Level 1 ~ 30)\r\n#bplaydead, poop#k (Level 1 ~ 30)\r\n#btalk|chat|say#k (Level 1 ~ 30)\r\n#biloveyou, hug#k (Level 1 ~ 30)\r\n#bsmellmyfeet, rockout, boo#k (Level 1 ~ 30)\r\n#btrickortreat#k (Level 1 ~ 30)\r\n#bmonstermash#k (Level 1 ~ 30)");
                else if (selection == 24)
                    cm.sendNext("These are the commands for #rPorcupine#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bno|bad|badgirl|badboy#k (Level 1 ~ 30)\r\n#biloveyou|hug|goodboy#k (Level 1 ~ 30)\r\n#btalk|chat|say#k (Level 1 ~ 30)\r\n#bcushion|sleep|knit|poop#k (Level 1 ~ 30)\r\n#bcomb|beach#k (Level 10 ~ 30)\r\n#btreeninja#k (Level 20 ~ 30)\r\n#bdart#k (Level 20 ~ 30)");
                else if (selection == 25)
                    cm.sendNext("These are the commands for #rSnowman#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bstupid, ihateyou, dummy#k (Level 1 ~ 30)\r\n#bloveyou, mylove, ilikeyou#k (Level 1 ~ 30)\r\n#bmerrychristmas#k (Level 1 ~ 30)\r\n#bcutie, adorable, cute, pretty#k (Level 1 ~ 30)\r\n#bcomb, beach/bad, no, badgirl, badboy#k (Level 1 ~ 30)\r\n#btalk, chat, say/sleep, sleepy, gotobed#k (Level 10 ~ 30)\r\n#bchang#k (Level 20 ~ 30)");
                else if (selection == 26)
                    cm.sendNext("These are the commands for #rSkunk#k. The level mentioned next to the command shows the pet level required for it to respond.\r\n#bsit#k (Level 1 ~ 30)\r\n#bbad/no/badgirl/badboy#k (Level 1 ~ 30)\r\n#brestandrelax, poop#k (Level 1 ~ 30)\r\n#btalk/chat/say, iloveyou#k (Level 1 ~ 30)\r\n#bsnuggle/hug, sleep, goodboy#k (Level 1 ~ 30)\r\n#bfatty, blind, badbreath#k (Level 10 ~ 30)\r\n#bsuitup, bringthefunk#k (Level 20 ~ 30)");
                else if (selection == 27) {
                    status = 14;
                    cm.sendNext("为了转移宠物的能力点，亲密度和等级，宠物AP重置卷轴是必需的。如果您使用此掷骰来伤害Ellinia中的仙女，她会将宠物的等级和亲密度转移到另一个宠物上。我给你的宠物是因为我能感觉到你的心。但是，我不能免费赠送。我可以给你这本书250000金币。哦，我差点忘了！即使你有这本书，如果你没有新宠物来转移能力点也是没有用的。");
                }
                if(selection > 2 && selection < 27)
                    cm.dispose();
            } else if (status == 2) {
                if(sel == 0)
                    cm.sendNextPrev("但是生命之水只在世界树的最底层流出，所以我不能给他太多的时间。。。我知道，很不幸。。。但即使它又变成了一个娃娃，我也总能给它带来生命，所以在你和它在一起的时候要善待它。");
                else if (sel == 1)
                    cm.sendNextPrev("和宠物交谈，注意它，它的亲密程度会上升，最终他的整体水平也会上升。随着亲密程度的提高，宠物的整体水平将很快上升。随着整体水平的提高，有一天宠物甚至会像一个人一样说话，所以要努力提高它。当然，这样做并不容易。。。");
                else if (sel == 2)
                    cm.sendNextPrev("过了一段时间。。。没错，他们停止移动。当魔法的效果消失，生命之水干涸之后，它们就变成了一个娃娃。但这并不意味着它会永远停止，因为一旦你把生命之水倒过来，它就会活着回来。");
                else if (sel == 27)
                    cm.sendYesNo("将会花费25万金币.确定要买吗?");
            } else if (status == 3) {
                if (sel == 0)
                    cm.sendNextPrev("对了,当你给他们特殊的命令时，它们会做出反应。你可以骂它们，爱它们。。。就看你怎么对他它们了.它们害怕离开主人，所以对它们好点，给它们爱.不然它们会很快变得悲伤和孤独。。。");
                else if (sel == 1){
                    cm.sendNextPrev("它虽然只是娃娃，但它们也有生命，所以它们也能感觉到饥饿。#b饥饿度#k表示宠物的饥饿程度。100是最大值，越低，说明宠物越来越饿。过一段时间，它甚至不会听从你的命令，所以要小心。");
                    return;
                }else if (sel == 2)
                    cm.sendNextPrev("当他们还活着的时候，请善待他们。也要喂好它们。知道有活着的东西跟着你，只听你的，不是很好吗？");
                else if (sel == 27){
                    if (cm.getMeso() < 250000 || !cm.canHold(4160011))
                        cm.sendOk("背包空间不足或金币不够");
                    else {
                        cm.gainMeso(-250000);
                        cm.gainItem(4160011, 1);
                    }
                    cm.dispose();
                }
            } else if (status == 4){
                if(sel != 1)
                    cm.dispose();
                cm.sendNextPrev("哦，是的！宠物不能吃正常的人类食物。相反，我的弟子亨内斯在市场卖宠物食品，所以如果你需要宠物的食物，就去找亨尼斯。提前购买食物，在宠物真的饿了之前给它喂食是个好主意。");
            } else if (status == 5)
                cm.sendNextPrev("哦，如果你长时间不喂宠物，它就会自己回家。你可以把它从家里带出来喂它，但这对宠物的健康并不是很好，所以试着定期给它喂食，这样它就不会下降到那个水平，好吗？我想这样就行了。");
            else
                cm.dispose();
        }
    }