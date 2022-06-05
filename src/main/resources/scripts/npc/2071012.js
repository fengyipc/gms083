/* A Familiar Lady
    Hidden Street : Gloomy Forest (922220000)
 */

    var status;
 
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
    
                if(status == 0) {
                    if(cm.getQuestProgressInt(23647, 1) != 0) {
                        cm.dispose();
                        return;
                    }
                    
                    if(!cm.haveItem(4031793, 1)) {
                        cm.sendOk("嘿... 你能帮我找找我丢在森林里的#b#z4031793##k吗?我现在急需使用它!");
                        cm.dispose();
                        return;
                    }
                    
                    cm.sendYesNo("嘿... 你能帮我找找我丢在森林里的#b#z4031793##k吗?我现在急需使用它! ... 你找打了吗!!!能给我吗?");
                } else if(status == 1) {
                    cm.sendNext("谢谢~这是你从我这里拿走的奖励，会对你有帮助的。");
                    cm.gainItem(4031793, -1);
                    cm.gainFame(-5);
                    cm.setQuestProgress(23647, 1, 1);
                    cm.dispose();
                }
            }
    }