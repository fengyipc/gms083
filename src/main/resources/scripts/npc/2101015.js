var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("嘿, 我在竞技场没见过你! 你到这里来做什么?");
        cm.dispose();
        return;
    }
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            menuStr = generateSelectionMenu(["我想查看竞技点! / 我想要获得#b#z3010018##k", "我想知道更多阿里安特竞技场的事情."]);
            cm.sendSimple("你好,想干什么?\r\n\r\n" + menuStr);
        } else if (status == 1) {
            if (selection == 0) {
                apqpoints = cm.getPlayer().getAriantPoints();
                if (apqpoints < 100) {
                    cm.sendOk("你的阿里安特竞技点: #b" + apqpoints + "#k分.你需要得到#b100分#k就可以获得#b#z3010018##k. 你的分数够了再来找我.");
                    cm.dispose();
                } else if (apqpoints + arena.getAriantRewardTier(cm.getPlayer()) >= 100) {
                    cm.sendOk("你的阿里安特竞技点: #b" + apqpoints + "#k分,你已经有足够的分数了!去找我的妻子, #p2101016#,她会把#z3010018#交给你!");
                    cm.dispose();
                } else {
                    cm.sendNext("哇,看样子你已经获得了#b100#k分,我们做个交易吧?!");
                }
            } else if (selection == 1) {
                cm.sendOk("竞技场的主要目标是让玩家累积积分，这样他们就可以交易到最高的奖品：#z3010018#。");
                cm.dispose();
            }
        } else if (status == 2) {
            cm.getPlayer().gainAriantPoints(-100);
            cm.gainItem(3010018, 1);
            cm.dispose();
        }
    }
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "##b" + array[i] + "#l#k\r\n";
    }
    return menu;
}