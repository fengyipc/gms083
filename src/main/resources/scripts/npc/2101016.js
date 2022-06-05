var arena;
var status = 0;

importPackage(Packages.client);

function start() {
    arena = cm.getPlayer().getAriantColiseum();
    if (arena == null) {
        cm.sendOk("Hey, I did not see you on the field during the battle in the arena! What are you doing here?");
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
            copns = arena.getAriantScore(cm.getPlayer());
            if (copns < 1 && !cm.getPlayer().isGM()) {
                cm.sendOk("太差劲了,你没有得到任何宝石!");
                cm.dispose();
            } else {
                cm.sendNext("我看看...你做得很好并且带来了#b" + copns + "#k颗我喜欢的宝石.自从你完成了竞技, 我会奖励你阿里安特竞技点#b" + arena.getAriantRewardTier(cm.getPlayer()) + "分#k.如果你想知道你的分数,找#b#p2101015##k问问.");
            }
        } else if (status == 1) {
            //cm.warp(980010020, 0);
            copns = arena.getAriantRewardTier(cm.getPlayer());
            arena.clearAriantRewardTier(cm.getPlayer());
            arena.clearAriantScore(cm.getPlayer());
            cm.removeAll(4031868);
            
            cm.getPlayer().gainExp(92.7 * cm.getPlayer().getExpRate() * copns, true, true);
            cm.getPlayer().gainAriantPoints(copns);
            cm.sendOk("太棒了!下次请给我更多宝石! 哈哈哈哈!"); 
            cm.dispose();
        }
    }
}