/**
 * @author: Ronan
 * @npc: Chamberlain Eak
 * @map: Orbis - Tower of Goddess
 * @func: Orbis PQ
*/

var status = 0;
var em = null;

function isStatueComplete() {
    for(var i = 1; i <= 6; i++) {
        if(cm.getMap().getReactorByName("scar" + i).getState() < 1) return false;
    }
    
    return true;
}

function clearStage(stage, eim) {
    eim.setProperty("statusStg" + stage, "1");
    eim.showClearEffect(true);
}

function start() {
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
    
        if (cm.getPlayer().getMapId() == 920011200) { //exit
            cm.warp(200080101);
            cm.dispose();
            return;
        }
        if (!cm.isEventLeader()) {
            if(cm.getPlayer().getMapId() == 920010000) {
                cm.warp(920010000, 2);
                cm.dispose();
                return;
            }

            cm.sendOk("我只和队长说话!");
            cm.dispose();
            return;
        }

        var eim = cm.getEventInstance();

        switch(cm.getPlayer().getMapId()) {
            case 920010000:
                if(eim.getIntProperty("statusStg0") != 1) {
                    eim.warpEventTeamToMapSpawnPoint(920010000, 2);
                    eim.giveEventPlayersExp(3500);
                    clearStage(0, eim);

                    cm.sendNext("救救米涅瓦吧，她被皮克斯爸爸困在封印里了，我们的塔是恐怖的！他把我们的密涅瓦雕像的所有部件都放错了，我们必须把它全部找回来！哦，对不起，我是塔楼的管家。我是密涅瓦的皇室仆人.");
                } else {
                    cm.warp(920010000, 2);
                }
                cm.dispose();
                break;
            case 920010100:
                if (isStatueComplete()) {
                    if (eim.getIntProperty("statusStg7") == -1) {
                        eim.warpEventTeam(920010800);
                    } else if(eim.getIntProperty("statusStg8") == -1) {
                        cm.sendOk("嗷!你拿来了#t4001055#! 请把它放在雕像底部!");
                    } else {
                        cm.sendOk("感谢你拯救了米涅瓦!请和她对话...");
                    }
                } else {
                    cm.sendOk("请拯救米涅瓦!收集六块她的雕像碎片然后和我对话拿到最后一块!");
                } 
                break;
            case 920010200: //walkway
                if (!cm.haveItem(4001050,30)) {
                    cm.sendOk("在这里的怪物身上收集30片雕像碎片!");
                } else {
                    cm.sendOk("你集齐了!给,这是第一块雕像碎片.");
                    cm.removeAll(4001050);
                    cm.gainItem(4001044,1); //first piece
                    eim.giveEventPlayersExp(3500);
                    clearStage(1, eim);
                }
                break;
            case 920010300: //storage
                if(eim.getIntProperty("statusStg2") != 1) {
                    if(cm.getMap().countMonsters() == 0 && cm.getMap().countItems() == 0) {
                        if(cm.canHold(4001045)) {
                            cm.sendOk("你找到了第二块雕像碎片.");
                            cm.gainItem(4001045, 1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(2, eim);
                            eim.setProperty("statusStg2", "1");
                        } else {
                            cm.sendOk("背包空间不足.");
                        }
                    } else {
                        cm.sendOk("找出藏在这里的第二块雕像碎片.");
                    }
                } else {
                    cm.sendOk("干得好,去找其他碎片吧.");
                }
                
                break;
            case 920010400: //lobby
                if (eim.getIntProperty("statusStg3") == -1) {
                    cm.sendOk("拜托,找到正确的CD并放到播放器上.\r\n#v4001056# 星期天\r\n#v4001057# 星期一\r\n#v4001058# 星期二\r\n#v4001059# 星期三\r\n#v4001060# 星期四\r\n#v4001061# 星期五\r\n#v4001062# 星期六\r\n");
                } else if (eim.getIntProperty("statusStg3") == 0) {
                    cm.getMap().getReactorByName("stone3").forceHitReactor(1);
                    cm.sendOk("这音乐... 听起来真不错.做的漂亮,出现了一个箱子.里面应该有雕像碎片!");
                    eim.giveEventPlayersExp(3500);
                    clearStage(3, eim);
                    eim.setProperty("statusStg3", "2");
                    
                } else {
                    cm.sendOk("十分感谢!");
                }
                break;
            case 920010500: //sealed
                if (eim.getIntProperty("statusStg4") == -1) {
                    var total = 3;
                    for(var i = 0; i < 2; i++) {
                        var rnd = Math.round(Math.random() * total);
                        total -= rnd;
                        
                        eim.setProperty("stage4_" + i, rnd);
                    }
                    eim.setProperty("stage4_2", "" + total);
                    
                    eim.setProperty("statusStg4", "0");
                }
                if (eim.getIntProperty("statusStg4") == 0) {
                    var players = Array();
                    var total = 0;
                    for (var i = 0; i < 3; i++) {
                        var z = cm.getMap().getNumPlayersInArea(i);
                        players.push(z);
                        total += z;
                    }
                    if (total != 3) {
                        cm.sendOk("这里需要3个玩家站在平台上.");
                    } else {
                        var num_correct = 0;
                        for (var i = 0; i < 3; i++) {
                            if (eim.getProperty("stage4_" + i).equals("" + players[i])) {
                                num_correct++;
                            }
                        }
                        if (num_correct == 3) {
                            cm.sendOk("组合正确! 地上出现了一个箱子,里面有雕像的碎片!");
                            cm.getMap().getReactorByName("stone4").forceHitReactor(1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(4, eim);
                        } else {
                            eim.showWrongEffect();
                            if (num_correct > 0) {
                                cm.sendOk("有个一平台上的玩家数量正确.");
                            } else {
                                cm.sendOk("全部平台上玩家的数量都不对.");
                            }
                        }
                    }
                } else {
                    cm.sendOk("做的漂亮!请去寻找其他碎片!");
                }
                cm.dispose();
                break;
            case 920010600: //lounge
                if(eim.getIntProperty("statusStg5") == -1) {
                    if (!cm.haveItem(4001052,40)) {
                        cm.sendOk("在这一关的怪物身上寻找40个碎片!");
                    } else {
                        cm.sendOk("你集齐了!这是第五块雕像碎片.");
                        cm.removeAll(4001052);
                        cm.gainItem(4001048,1); //fifth piece
                        eim.giveEventPlayersExp(3500);
                        clearStage(5, eim);
                        eim.setIntProperty("statusStg5", 1);
                    }
                } else {
                    cm.sendOk("去其他房间搜索吧.");
                }
                break;
            case 920010700: //on the way up
                if (eim.getIntProperty("statusStg6") == -1) {
                    var rnd1 = Math.floor(Math.random() * 5);
                    
                    var rnd2 = Math.floor(Math.random() * 5);
                    while(rnd2 == rnd1) {
                        rnd2 = Math.floor(Math.random() * 5);
                    }
                    
                    if(rnd1 > rnd2) {
                        rnd1 = rnd1 ^ rnd2;
                        rnd2 = rnd1 ^ rnd2;
                        rnd1 = rnd1 ^ rnd2;
                    }
                    
                    var comb = "";
                    for(var i = 0; i < rnd1; i++) comb += "0";
                    comb += "1";
                    for(var i = rnd1 + 1; i < rnd2; i++) comb += "0";
                    comb += "1";
                    for(var i = rnd2 + 1; i < 5; i++) comb += "0";
                    
                    eim.setProperty("stage6_c", "" + comb);
                    
                    eim.setProperty("statusStg6", "0");
                }
                
                var comb = eim.getProperty("stage6_c");
                
                if (eim.getIntProperty("statusStg6") == 0) {
                    var react = "";
                    var total = 0;
                    for(var i = 1; i <= 5; i++) {
                        if (cm.getMap().getReactorByName("" + i).getState() > 0) {
                            react += "1";
                            total += 1;
                        } else {
                            react += "0";
                        }
                    }
                    
                    if (total != 2) {
                        cm.sendOk("地图顶部需要有两个推开的开关.");
                    } else {
                        var num_correct = 0;
                        var psh_correct = 0;
                        for (var i = 0; i < 5; i++) {
                            if (react.charCodeAt(i) == comb.charCodeAt(i)) {
                                num_correct++;
                                if(react.charAt(i) == '1') psh_correct++;
                            }
                        }
                        if (num_correct == 5) {
                            cm.sendOk("组合成功,拿好雕像碎片!");
                            cm.getMap().getReactorByName("stone6").forceHitReactor(1);
                            eim.giveEventPlayersExp(3500);
                            clearStage(6, eim);
                        } else {
                            eim.showWrongEffect();
                            if (psh_correct >= 1) {
                                cm.sendOk("有一个开关正确了.");
                            } else {
                                cm.sendOk("两个开关都是错误的.");
                            }
                        }
                    }
                } else {
                    cm.sendOk("做的不错!!去找其他碎片吧.");
                }
                break;
            case 920010800:
                cm.sendNext("求你了，想办法打败小精灵吧！一旦你通过放置种子找到了黑暗的海王星，你就找到了精灵爸爸！打败它，让生命之根来拯救米涅瓦！！！"); 
                break;
            case 920010900:
                if(eim.getProperty("statusStg8") == "1") {
                    cm.sendNext("这是塔楼的监狱。你可能会在这里找到一些好东西，但一定要尽快解开谜团。");
                } else {
                    cm.sendNext("在那里你找不到任何雕像碎片。爬上梯子回到中心塔，在其他地方搜索。一旦你救了密涅瓦，你就可以回来拿下面的东西。");
                }
                break;
            case 920011000:
                if(cm.getMap().countMonsters() > 0) {
                    cm.sendNext("这是塔楼的暗室。消灭了这个房间的所有怪物后，和我谈谈进入宝藏室，离开中心塔的通道。");
                } else {
                    cm.warp(920011100, "st00");
                }
                break;
        }
        cm.dispose();
    }
}

function clear() {
    cm.showEffect(true, "quest/party/clear");
    cm.playSound(true, "Party1/Clear");
}