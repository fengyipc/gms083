function start() {
    cm.sendNext("你做的很好, " + cm.getPlayer().getName() + ". 现在我会把你送到冰封雪域. 把挂件放在身上,当你准备好学习新技能了和我对话.");
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        cm.warp(211000000,"in01");
        cm.dispose();
    }
}