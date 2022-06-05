/*
 * @Author - Sparrow
 * @NPC - 1012008 - Casey the Game Master
 * @Map - 100000203 - Henesys Game Park
 */

var status;
var current;
var omok =       [4080000, 4080001, 4080002, 4080003, 4080004, 4080005];
var omok1piece = [4030000, 4030000, 4030000, 4030010, 4030011, 4030011];
var omok2piece = [4030001, 4030010, 4030011, 4030001, 4030010, 4030001];
var omokamount = 99;
var text = "根据你想在游戏中使用什么样的棋子，五子棋要的材料也会有所不同。你想做哪一套？"

function start() {
    current = 0;
    status = -1;
    action(1,0,0);
}

function action(mode, type, selection) {
    if(mode == -1 && current > 0) {
        cm.dispose();
        return;
    } else {
        if(mode == 1) { 
            status++;
        } else {
            status--;
        }
    }

    if (status == 0) {
        cm.sendSimple("嘿，你看起来需要休息一下。你应该像我一样享受生活。好吧，如果你有几样东西，我可以为你制作玩小游戏的道具。那么现在。。。我能为你做些什么？#b\r\n#L0#制作一个小游戏道具#l\r\n#L1#给我讲一下小游戏相关细节#l#k");
      
    } else if (status == 1) {
        if (selection == 0) {
            cm.sendSimple("你想制作小游戏道具吗？小游戏不是你可以直接玩的东西。对于每个小游戏，你需要一组特定的物品。你想做哪款小游戏？#b\r\n#L4#怪物五子棋#l\r\n#L5#记忆大考验#l#k");
        } else if (selection == 1) {
            cm.sendSimple("你想多了解一些小游戏吗？好的! 有什么尽管问我.你想知道更多关于哪款小游戏？#b\r\n#L2#怪物五子棋#l\r\n#L3#记忆大考验#l#k");
        }

    }
    else if (status == 2) {
        if (selection == 2) {
            current = 1;
            cm.sendNext("这是怪物五子棋的规则，记好了。 怪物五子棋是个下棋游戏，你和你的对手轮流把一枚棋子放在桌上，直到有人在一条线上连续放置5个棋子，不管是水平的、对角线的还是垂直的。对于新手，只有拥有一套游戏道具的人才能开设游戏房间。");
        } else if (selection == 3) {
            current = 2;
            cm.sendNext("这是记忆大考验的规则,仔细听.就像它名字一样,记忆大考验的内容就是找出一对对对应的卡片.当所有卡片都能匹配上的时候,谁匹配到的数量多谁就赢得比赛.和五子棋一样,你需要#b一个记忆大考验的道具#k 开设游戏房间.");
        } else if (selection == 4) {
            current = 3;
            cm.sendNext("想要玩#b怪物五子棋#k,是吗?你需要五子棋道具.只有有道具的人才可以开放游戏,除了市场上的几个地方，你可以在任何地方玩这个游戏.");
        } else if (selection == 5) {
            current = 4;
            if (cm.haveItem(4030012, 15)) {
                cm.gainItem(4030012, -15);
                cm.gainItem(4080100, 1);
                cm.sendOk("东西做好了,双击就可以使用了."); //Lmfao a set of A set xD
                cm.dispose();
            } else {
                cm.sendOk("想制作#b记忆大考验#k?你需要一些#b怪物卡#k,怪物卡几乎可以在这个岛上任何怪物身上掉落.收集15个怪物卡我就可以给你做记忆大考验."); //Lmfao a set of A set xD
                cm.dispose();
            }
        }
    }
    else if (status == 3) {
        if (current == 1) {
            cm.sendNextPrev("每一场五子棋游戏都将花费你100金币。即使你没有#b五子棋道具#k，你也可以进入房间玩。但是，如果你没有100金币，那么你就不能进入房间。开设游戏房间的人也需要100金币才能进入游戏（否则就没有游戏了）。如果你在游戏中用完了金币，那么你会被自动踢出房间！");
        } else if (current == 2) {
            cm.sendNextPrev("每一场记忆大考验游戏都将花费你100金币。即使你没有#b记忆大考验道具#k，你也可以进入房间玩。但是，如果你没有100金币，那么你就不能进入房间。开设游戏房间的人也需要100金币才能进入游戏（否则就没有游戏了）。如果你在游戏中用完了金币，那么你会被自动踢出房间！");
        } else if (current == 3) {
            for (var i = 0; i < omok.length; i++)
                text += "\r\n#L"+i+"##b#t"+omok[i]+"##k#l";
            cm.sendSimple(text);
        }

    }
    else if (status == 4) {
        if (current == 1 || current == 2) {
            cm.sendNextPrev("进入房间，当您准备好玩游戏时，单击#b准备#k。\r\n玩家单击#b准备#k后，房主可以按#b开始#k开始游戏。如果来的人你不想和他玩，房主有权把他踢出房间。在那个人的右边会有一个写着x的方形盒子。点击这个来冷冷的道别，好吗？"); //Oh yeah, because people WALK in Omok Rooms.
        }
        else if (current == 3) {
            if (cm.haveItem(omok1piece[selection], 99) && cm.haveItem(omok2piece[selection], 99) && cm.haveItem(4030009, 1)) {
                cm.gainItem(omok1piece[selection], -omokamount);
                cm.gainItem(omok2piece[selection], -omokamount);
                cm.gainItem(4030009, -1);
                cm.gainItem(omok[selection], 1);cm.sendOk("东西做好了,双击就可以使用了."); //Lmfao a set of A set xD
                cm.dispose();
            } else {
                cm.sendNext("#b你想要制作#t" + omok[selection] + "##k?好的,给我材料: #r" + omokamount + " #t" + omok1piece[selection] + "#, " + omokamount + " #t" + omok2piece[selection] + "#, 1 #t" + 4030009 + "##k.每次怪物被击败都有可能掉落这些材料...");
                cm.dispose();
            }
        }

    }
    else if (status == 5) {
        if (current == 1) {
            cm.sendNextPrev("游戏开始时，房主先手，你会有一个时间限制，如果过时了,你就会输料。一般来说，3x3是不允许的，但是如果有一点是绝对必要的，把你的作品放在那里或面临结束游戏，那么你可以把它放在那里。3×3是允许的最后一道防线！哦，如果是#r6或7#k也不算，只有5！");
        } else if (current == 2)  {
            cm.sendNextPrev("哦，和五子棋不同的是，当你为比赛卡片创建游戏室时，你需要根据游戏使用的牌数来设置游戏。有3种模式可用，3x4、4x5和5x6，分别需要12、20和30张卡。记住，一旦房间开放了，你就无法改变它，所以如果你真的想改变它，你必须关闭房间，打开另一个。");
        }
    }
    else if (status == 6) {
        if (current == 1) {
            cm.sendNextPrev("如果你知道你的背靠墙，你可以请求一个“#r重置#k”。如果对方接受你的请求，那么你和你的对手最后的招式将被取消。如果你觉得有必要去洗手间，或者休息一段时间，你可以请求一个\"#r暂停#k\"。如果对方接受了请求，比赛将以平局结束。小贴士：这也许是保持友谊的好方法。");
        } else if (current == 2) {
            cm.sendNextPrev("比赛开始时，房主先手。注意，你会被给予一个时限，如果你不按时行动，你会输掉你的这一轮。当你找到一对匹配的配对，你将得到你的轮到，只要你不断地找到一对匹配的卡片。用你的记忆技巧来创造连胜。");
        }
        
    }
    else if (status == 7) {
        if (current == 1) {
            cm.sendPrev("下一场比赛开始时，落后者将先手。另外，任何人都不允许在比赛中途离开。如果你这样做了，你可能需要请求一个“#b暂停或放弃#k”（当然，如果你要求放弃，你将输掉比赛。）如果你在游戏中途点击“离开”并在游戏结束后打离开，你将在游戏结束后立即离开房间。");
        } else if (current == 2) {
            cm.sendNextPrev("如果你和你的对手有相同数量的配对对，那么谁拥有更长的匹配对连胜将获胜。如果你觉得有必要去洗手间，或者休息一段时间，你可以请求一个#b平局#k。如果对方接受了请求，比赛将以平局结束。小贴士：这也许是保持友谊的好方法。");
        }
    }
    else if (status == 8) {
        if (current == 2) {
            cm.sendOk("下一场比赛开始时，落后者将先手。另外，任何人都不允许在比赛中途离开。如果你这样做了，你可能需要请求一个“#b暂停或放弃#k”（当然，如果你要求放弃，你将输掉比赛。）如果你在游戏中途点击“离开”并在游戏结束后打离开，你将在游戏结束后立即离开房间。");
            cm.dispose();
        }else{
            cm.dispose();
        }
    }
}  