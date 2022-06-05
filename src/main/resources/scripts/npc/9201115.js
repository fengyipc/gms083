var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
        var eim = cm.getEventInstance();
        if (eim != null && eim.getIntProperty("glpq6") == 3) {
                cm.sendOk("... 干得不错.你超越了扭曲的主人.过去领取你的奖励.");
                cm.dispose();
                return;
        }
        
        if (!cm.isEventLeader()) {
                cm.sendNext("让队长来找我.");
                cm.dispose();
                return;
        }
    
        if (mode == 1) {
                status++;
        } else {
                status--;
        }

        if (eim != null) {
                if (eim.getIntProperty("glpq6") == 0) {
                        if (status == 0) {
                                cm.sendNext("Welcome to the Twisted Masters' Keep. 今晚我来做东...");
                        } else if (status == 1) {
                                cm.sendNext("今晚,将有一群冒险家的盛宴.. 嘎嘎嘎...");
                        } else if (status == 2) {
                                cm.sendNext("让我们训练有素的守护大师护送你!");
                                cm.mapMessage(6, "Engarde! Master Guardians approach!");
                                for (var i = 0; i < 10; i++) {
                                        var mob = eim.getMonster(9400594);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1337 + (Math.random() * 1337), 276));
                                }
                                for (var i = 0; i < 20; i++) {
                                        var mob = eim.getMonster(9400582);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-1337 + (Math.random() * 1337), 276));
                                }
                                eim.setIntProperty("glpq6", 1);
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 1) {
                        if (cm.getMap().countMonsters() == 0) {
                                if (status == 0) {
                                        cm.sendOk("什么?你打败他们了?");
                                } else if (status == 1) {
                                        cm.sendNext("好吧，没关系！扭曲的大师们会很高兴欢迎你的.");
                                        cm.mapMessage(6, "Twisted Masters approach!");

                                        //Margana
                                        var mob = eim.getMonster(9400590);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob, new java.awt.Point(-22, 1));

                                        //Red Nirg
                                        var mob2 = eim.getMonster(9400591);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob2, new java.awt.Point(-22, 276));

                                        //Hsalf
                                        var mob4 = eim.getMonster(9400593);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob4, new java.awt.Point(496, 276));

                                        //Rellik
                                        var mob3 = eim.getMonster(9400592);
                                        cm.getMap().spawnMonsterOnGroundBelow(mob3, new java.awt.Point(-496, 276));

                                        eim.setIntProperty("glpq6", 2);
                                        cm.dispose();
                                }
                        } else {
                                cm.sendOk("Pay no attention to me. The Master Guardians will escort you!");
                                cm.dispose();
                        }
                } else if (eim.getIntProperty("glpq6") == 2) {
                        if (cm.getMap().countMonsters() == 0) {
                                cm.sendOk("WHAT? Ugh... this can't be happening.");
                                cm.mapMessage(5, "The portal to the next stage has opened!");
                                eim.setIntProperty("glpq6", 3);
                                
                                eim.showClearEffect(true);
                                eim.giveEventPlayersStageReward(6);
                                
                                eim.clearPQ();
                                cm.dispose();
                        } else {
                                cm.sendOk("Pay no attention to me. The Twisted Masters will escort you!");
                                cm.dispose();
                        }
                } else {
                        cm.sendOk("... Well played. You overtook the Twisted Masters. Pass through that gate to receive your prizes.");
                        cm.dispose();
                }
        } else {
                cm.dispose();
        }
}