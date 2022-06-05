var status = -1;
var level = 1;

function start() {
    action(1,0,0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	status--;
    }
    if (cm.getPlayer().getMapId() == 925100700) {
	cm.warp(251010404,0);
	cm.dispose();
	return;
    }
    
    if(status == 1) {   // leaders cant withdraw
        cm.warp(251010404,0);
        return;
    }
    
    if (!cm.isEventLeader()) {
	cm.sendYesNo("希望你的队长跟我交谈.还是说你想退出了?");
    }
    else {
        var eim = cm.getEventInstance();
        if (eim == null) {
            cm.warp(251010404,0);
            cm.sendNext("你怎么来到这里的?");
            cm.dispose();
            return;
        }

        level = eim.getProperty("level");

        switch(cm.getPlayer().getMapId()) {
            case 925100000:
                cm.sendNext("我们现在就进去!一定要击败所有的怪物.");
                cm.dispose();
                break;
            case 925100100:
                var emp = eim.getProperty("stage2");
                if (emp.equals("0")) {
                    if (cm.haveItem(4001120,20)) {
                        cm.sendNext("漂亮!现在把20个#z4001120#交给我.");
                        cm.gainItem(4001120,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "1");
                    } else {
                        cm.sendNext("我们现在就进去!一定要击败所有的怪物.给我收集20个#z4001120#.");
                    }
                } else if (emp.equals("1")) {
                    if (cm.haveItem(4001121,20)) {
                        cm.sendNext("漂亮!现在把20个#z4001121#给我.");
                        cm.gainItem(4001121,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "2");
                    } else {
                        cm.sendNext("我们现在就进去!一定要击败所有的怪物.给我收集20个#z4001121#.");
                    }
                } else if (emp.equals("2")) {
                    if (cm.haveItem(4001122,20)) {
                        cm.sendNext("漂亮! 你们继续吧.");
                        cm.gainItem(4001122,-20);
                        cm.getMap().killAllMonsters();
                        eim.setProperty("stage2", "3");
                        eim.showClearEffect(cm.getMapId());
                    } else {
                        cm.sendNext("我们现在就进去!一定要击败所有的怪物.给我收集20个#z4001122#.");
                    }
                } else {
                    cm.sendNext("下一关开启了.去吧!");
                }
                cm.dispose();
                break;
            case 925100200:
            case 925100300:
                cm.sendNext("要想袭击海盗船，我们必须先消灭守卫.");
                cm.dispose();
                break;
            case 925100201:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("海盗箱子出现了!如果你有钥匙,可以打开箱子.这会让他生气.");
                    if (eim.getProperty("stage2a") == "0") {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage2a", "1");
                    }
                } else {
                    cm.sendNext("这些风铃草藏起来了。我们必须解放他们.");
                }
                cm.dispose();
                break;
            case 925100301:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("海盗箱子出现了!如果你有钥匙,可以打开箱子.这会让他生气..");
                    if (eim.getProperty("stage3a").equals("0")) {
                        cm.getMap().setReactorState();
                        eim.setProperty("stage3a", "1");
                    }
                } else {
                    cm.sendNext("这些风铃草藏起来了。我们必须解放他们.");
                }
                cm.dispose();
                break;
            case 925100202:
            case 925100302:
                cm.sendNext("这些是船长和克鲁斯，他们献身于海盗勋爵。你认为合适就杀了他们.");
                cm.dispose();
                break;
            case 925100400:
                cm.sendNext("这些是船的动力来源。我们必须用门上的旧金属钥匙把它封住！");
                cm.dispose();
                break;
            case 925100500:
                if (cm.getMap().getMonsters().size() == 0) {
                    cm.sendNext("谢谢你救了我们的首领！我们欠你的一份人情。");
                } else {
                    cm.sendNext("击败所有怪物！即使是海盗大人的手下！");
                }
                cm.dispose();
                break;
        }
    }
    
    
}