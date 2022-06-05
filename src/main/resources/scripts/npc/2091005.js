/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>
    Copyleft (L) 2016 - 2019 RonanLana (HeavenMS)

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
/*
* @Author: Moogra, XxOsirisxX, Ronan
* @NPC:    2091005
* @Name:   So Gong
* @Map(s): Dojo Hall
*/

importPackage(Packages.config);
importPackage(Packages.constants.game);

var disabled = false;
var belts = Array(1132000, 1132001, 1132002, 1132003, 1132004);
var belt_level = Array(25, 35, 45, 60, 75);
var belt_on_inventory;
var belt_points;

var status = -1;
var selectedMenu = -1;
var dojoWarp = 0;

function start() {
    if (disabled) {
        cm.sendOk("我的师傅现在正在#r闭关#k,我不能让你进去.");
        cm.dispose();
        return;
    }
    
    belt_points = YamlConfig.config.server.USE_FAST_DOJO_UPGRADE ? Array(10, 90, 200, 460, 850) : Array(200, 1800, 4000, 9200, 17000);
    
    belt_on_inventory = new Array();
    for (var i = 0; i < belts.length; i++) {
        belt_on_inventory.push(cm.haveItemWithId(belts[i], true));
    }
                            
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.getPlayer().setDojoStage(dojoWarp);
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        
        if(status == 0) {
            if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                var text = "真没想到你可以挑战到这里!但是从现在开始就没那么容易了.要继续挑战吗?\r\n\r\n#b#L0#我要继续#l\r\n#L1#我要离开#l\r\n";
                if (!GameConstants.isDojoPartyArea(cm.getPlayer().getMapId())) {
                    text += "#L2#我想记录我的分数#l";
                }
                cm.sendSimple(text);
            } else if (cm.getPlayer().getLevel() >= 25) {
                if (cm.getPlayer().getMap().getId() == 925020001) {
                    cm.sendSimple("我师傅是武陵最强大的,你想要挑战他?好吧,你一定会后悔的.\r\n\r\n#b#L0#我想独自挑战他.#l\r\n#L1#我想组队挑战他.#l\r\n\r\n#L2#我想要获得腰带.#l\r\n#L3#我想重置我的分数.#l\r\n#L4#我想获得奖章.#l\r\n#L5#武陵道场是干嘛的?#l");
                } else {
                    cm.sendYesNo("什么,要放弃了?你只要更上一层楼!真的要放弃?");
                }
            } else {
                cm.sendOk("嘿!你在嘲笑我的师傅? 你凭什么挑战他? 开玩笑!你至少需要#b25#k级.");
                cm.dispose();
                return;
            }
        } else {
            if (cm.getPlayer().getMap().getId() == 925020001) {
                if (mode >= 0) {
                    if (status == 1)
                        selectedMenu = selection;
                    if (selectedMenu == 0) { //I want to challenge him alone.
                        if (!cm.getPlayer().hasEntered("dojang_Msg") && !cm.getPlayer().getFinishedDojoTutorial()) { //kind of hackish...
                            if (status == 1) {
                                cm.sendYesNo("嘿! 说你呢!这是第一次来这里吧? 我师傅不想见任何人. 他很忙. 从你的外貌来看，我想他不会在意的.哈! 但是, 今天你很幸运... 我告诉你, 如果你可以击败我, 我会让你去见见师傅. 你觉得怎么样?");
                            } else if (status == 2) {
                                if (mode == 0) {
                                    cm.sendNext("哈哈!你那样的心态是想打动谁?\r\n回到你该去的地方吧!");
                                    cm.dispose();
                                    return;
                                } else {
                                    var avDojo = cm.getClient().getChannelServer().ingressDojo(true, 0);

                                    if(avDojo < 0) {
                                        if(avDojo == -1) cm.sendOk("所有到场都有人在挑战了,等一下");
                                        else cm.sendOk("你的队伍有人没有资格挑战.");
                                    }
                                    else {
                                        cm.getClient().getChannelServer().getMapFactory().getMap(925020010 + avDojo).resetMapObjects();
                                        
                                        cm.resetDojoEnergy();
                                        cm.warp(925020010 + avDojo, 0);
                                    }

                                    cm.dispose();
                                    return;
                                }
                            }
                        } else if (cm.getPlayer().getDojoStage() > 0) {
                            dojoWarp = cm.getPlayer().getDojoStage();
                            cm.getPlayer().setDojoStage(0);
                            
                            var stageWarp = ((dojoWarp / 6) | 0) * 5;
                            cm.sendYesNo("上一次你一个人接受挑战时，你去了#b" + stageWarp + "#k层.我现在可以让你直接继续挑战. 要跳过前面的关卡吗? (选择 #r否#k重新挑战.)");
                        } else {
                            var avDojo = cm.getClient().getChannelServer().ingressDojo(false, dojoWarp);

                            if(avDojo < 0) {
                                if(avDojo == -1) cm.sendOk("所有的道场都已经被使用了. 等下再试试吧.");
                                else cm.sendOk("您的队伍已经在挑战道场，或者您的队伍里有人挑战的冷却时间还没到。等待他们完成进入.");
                                
                                cm.getPlayer().setDojoStage(dojoWarp);
                            } else {
                                var warpDojoMap = 925020000 + (dojoWarp + 1) * 100 + avDojo;
                                cm.getClient().getChannelServer().resetDojoMap(warpDojoMap);
                                
                                cm.resetDojoEnergy();
                                cm.warp(warpDojoMap, 0);
                            }

                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 1) { //I want to challenge him with a party.
                        var party = cm.getPlayer().getParty();
                        if (party == null) {
                            cm.sendNext("你想干什么?让队长和我说话.");
                            cm.dispose();
                            return;
                        }
                        
                        if (party.getLeader().getId() != cm.getPlayer().getId()) {
                            cm.sendNext("你想干什么?让队长和我说话.");
                            cm.dispose();
                            return;
                        }

                        //else if (party.getMembers().size() == 1) {
                        //    cm.sendNext("You're going to take on the challenge as a one-man party?");
                        //}

                        else if (!isBetween(party, 30)) {
                            cm.sendNext("你的团队等级范围太广了，无法进入. 请确定你队伍里人员等级差不超过 #r30#k.");
                            cm.dispose();
                            return;
                        } else {
                            var avDojo = cm.getClient().getChannelServer().ingressDojo(true, cm.getParty(), 0);

                            if(avDojo < 0) {
                                if(avDojo == -1) cm.sendOk("所有的道场都已经被使用了. 等下再试试吧.");
                                else cm.sendOk("您的队伍已经在挑战道场，或者您的队伍里有人挑战的冷却时间还没到。等待他们完成进入.");
                            } else {
                                cm.getClient().getChannelServer().resetDojoMap(925030100 + avDojo);
                                
                                cm.resetPartyDojoEnergy();
                                cm.warpParty(925030100 + avDojo);
                            }

                            cm.dispose();
                            return;
                        }

                    } else if (selectedMenu == 2) { //I want to receive a belt.
                        if (!cm.canHold(belts[0])) {
                            cm.sendNext("给腰带腾出一个位置!");
                            cm.dispose();
                            return;
                        }
                        if (mode < 1) {
                            cm.dispose();
                            return;
                        }
                        if (status == 1) {
                            var selStr = "你有#b" + cm.getPlayer().getDojoPoints() + "#k分.师傅更喜欢有才华的人. 如果你获得的分数高于平均水平，你可以根据你的分数获得一条腰带.\r\n";
                            for (var i = 0; i < belts.length; i++) {
                                if (belt_on_inventory[i]) {
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "# (已获取)";
                                } else
                                    selStr += "\r\n#L" + i + "##i" + belts[i] + "# #t" + belts[i] + "#";
                            }
                            cm.sendSimple(selStr);
                        } else if (status == 2) {
                            var belt = belts[selection];
                            var level = belt_level[selection];
                            var points = belt_points[selection];
                            
                            var oldbelt = (selection > 0) ? belts[selection - 1] : -1;
                            var haveOldbelt = (oldbelt == -1 || cm.haveItemWithId(oldbelt, false));
                            
                            if (selection > 0 && !belt_on_inventory[selection - 1]) {
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            } else if (cm.getPlayer().getDojoPoints() >= points) {
                                if (selection > 0 && !haveOldbelt) {
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                                } else if (cm.getPlayer().getLevel() > level) {
                                    if(selection > 0) cm.gainItem(oldbelt, -1);
                                    cm.gainItem(belt, 1);
                                    cm.getPlayer().setDojoPoints(cm.getPlayer().getDojoPoints() - points);
                                    cm.sendNext("这是#i" + belt + "# #b#t" + belt + "##k.你已经证明了你的勇气，可以登上道场。做得好!");
                                } else
                                    sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);
                            } else
                                sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points);

                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 3) { //I want to reset my training points.
                        if (status == 1) {
                            cm.sendYesNo("你知道如果你重置你的分数，它会回到0，对吗？不过，这并不总是坏事。如果重置后可以重新开始获取训练点数，则可以再次获得腰带。你想现在重置你的训练点数吗?");
                        } else if (status == 2) {
                            if (mode == 0) {
                                cm.sendNext("你要重新打起精神?准备好了再来.");
                            } else {
                                cm.getPlayer().setDojoPoints(0);
                                cm.sendNext("高了! 你的分数已经被清空了!");
                            }
                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 4) { //I want to receive a medal.
                        if (status == 1 && cm.getPlayer().getVanquisherStage() <= 0) {
                            cm.sendYesNo("你还没获得过奖牌? 如果你击败道场里一种怪物#b100 次#k你可以获得#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k.看来你没有#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k... 你想试试挑战获得#b#t" + (1142033 + cm.getPlayer().getVanquisherStage()) + "##k吗?");
                        } else if (status == 2 || cm.getPlayer().getVanquisherStage() > 0) {
                            if (mode == 0) {
                                cm.sendNext("不想的话就算了.");
                            } else {
                                if (cm.getPlayer().getDojoStage() > 37) {
                                    cm.sendNext("你已经获得了所有奖牌.");
                                } else if (cm.getPlayer().getVanquisherKills() < 100 && cm.getPlayer().getVanquisherStage() > 0)
                                    cm.sendNext("你还需要击杀#b" + (100 - cm.getPlayer().getVanquisherKills()) + "#k才能获得#b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.请再努力一点。提醒一下，只有在武陵道中被我们师父召唤的大多数人才被考虑在内。哦，确保你没有猎杀怪物然后离开!#r 如果你在击败怪物后没有进入下一关，那不算胜利#k.");
                                else if (cm.getPlayer().getVanquisherStage() <= 0) {
                                    cm.getPlayer().setVanquisherStage(1);
                                } else {
                                    cm.sendNext("你已经获得#b#t" + (1142032 + cm.getPlayer().getVanquisherStage()) + "##k.");
                                    cm.gainItem(1142033 + cm.getPlayer().getVanquisherStage(), 1);
                                    cm.getPlayer().setVanquisherStage(cm.c.getPlayer().getVanquisherStage() + 1);
                                    cm.getPlayer().setVanquisherKills(0);
                                }
                            }

                            cm.dispose();
                            return;
                        } else {
                            cm.dispose();
                            return;
                        }
                    } else if (selectedMenu == 5) { //What is a Mu Lung Dojo?
                        cm.sendNext("我们的师傅是武陵最强的人。他建的地方叫武陵道场，有38层楼高！你可以在每一个阶段都训练自己。当然，像你这样级别的人很难达到顶峰.");
                        cm.dispose();
                        return;
                    }
                } else {
                    cm.dispose();
                    return;
                }
            } else if (isRestingSpot(cm.getPlayer().getMap().getId())) {
                if (selectedMenu == -1)
                    selectedMenu = selection;
                
                if (selectedMenu == 0) {
                    var hasParty = (cm.getParty() != null);
                    
                    var firstEnter = false;
                    var avDojo = cm.getClient().getChannelServer().lookupPartyDojo(cm.getParty());
                    if(avDojo < 0) {
                        if(hasParty) {
                            if(!cm.isPartyLeader()) {
                                cm.sendOk("你不是队长！如果你想继续的话，叫队长来.");
                                cm.dispose();
                                return;
                            }
                            
                            if(!isBetween(cm.getParty(), 35)) {
                                cm.sendOk("你的团队等级范围太广了，无法进入. 请确定你队伍里人员等级差不超过 #r30#k.");
                                cm.dispose();
                                return;
                            }
                        }
                        
                        avDojo = cm.getClient().getChannelServer().ingressDojo(hasParty, cm.getParty(), Math.floor((cm.getPlayer().getMap().getId()) / 100) % 100);
                        firstEnter = true;
                    }

                    if(avDojo < 0) {
                        if(avDojo == -1) cm.sendOk("所有的道场都已经被使用了. 等下再试试吧.");
                        else cm.sendOk("您的队伍已经在挑战道场，或者您的队伍里有人挑战的冷却时间还没到。等待他们完成进入.");
                    } else {
                        var baseStg = hasParty ? 925030000 : 925020000;
                        var nextStg = Math.floor((cm.getPlayer().getMap().getId() + 100) / 100) % 100;

                        var dojoWarpMap = baseStg + (nextStg * 100) + avDojo;
                        if(firstEnter) {
                            cm.getClient().getChannelServer().resetDojoMap(dojoWarpMap);
                        }
                        
                        //non-leader party members can progress whilst having the record saved if they don't command to enter the next stage
                        cm.getPlayer().setDojoStage(0);
                        
                        if(!hasParty || !cm.isLeader()) cm.warp(dojoWarpMap, 0);
                        else cm.warpParty(dojoWarpMap, 0);
                    }

                    cm.dispose();
                    return;
                } else if (selectedMenu == 1) { //I want to leave
                    if (status == 1) {
                        cm.sendYesNo("所以，你要放弃？你真的要走了？");
                    } else {
                        if (mode == 1) {
                            cm.warp(925020002, "st00");
                        }
                        cm.dispose();
                        return;
                    }
                } else if (selectedMenu == 2) { //I want to record my score up to this point
                    if (status == 1) {
                        cm.sendYesNo("如果你记录下你的分数，你就可以从你下次停止的地方开始。这不方便吗？你想记录你现在的分数吗？");
                    } else {
                        if (mode == 0) {
                            cm.sendNext("你觉得你可以挑战更高层？祝你好运");
                        } else if (cm.getPlayer().getDojoStage() == Math.floor(cm.getMapId() / 100) % 100) {
                            cm.sendOk("你的分数已经录下来了。下一次你挑战武陵道场时，你可以回到这一点。");
                        } else {
                            cm.sendNext("我录下了你的分数。如果你下次再上去告诉我，你就可以从你离开的地方开始了。请注意，如果您选择继续挑战，您的记录将被删除，因此请谨慎选择。");
                            cm.getPlayer().setDojoStage(Math.floor(cm.getMapId() / 100) % 100);
                        }
                        cm.dispose();
                        return;
                    }
                }
            } else {
                if (mode == 0) {
                    cm.sendNext("别犹豫了,很快你就会被打的哭着想回去.");
                } else if (mode == 1) {
                    var dojoMapId = cm.getPlayer().getMap().getId();
                    
                    cm.warp(925020002, 0);
                    cm.getPlayer().message("能不能不犹豫了?");
                    
                    cm.getClient().getChannelServer().freeDojoSectionIfEmpty(dojoMapId);
                }
                cm.dispose();
            }
        }
    }
}

function sendBeltRequirements(belt, oldbelt, haveOldbelt, level, points) {
    var beltReqStr = (oldbelt != -1) ? "你必须先获得#i" + oldbelt + "#,并把它放在背包" : "";
    
    var pointsLeftStr = (points - cm.getPlayer().getDojoPoints() > 0) ? "你还需要#r" + (points - cm.getPlayer().getDojoPoints()) + "#k分" : "";
    var beltLeftStr = (!haveOldbelt) ? "你必须把需要的腰带放在背包" : "";
    var conjStr = (pointsLeftStr.length > 0 && beltLeftStr.length > 0) ? "和" : "";
        
    cm.sendNext("为了接受#i" + belt + "##b#t" + belt + "##k," + beltReqStr + "必须超过#b" + level + "#k级并且获得至少#b" + points + "分#k.\r\n\r\n如果你想要交换腰带," + beltLeftStr + conjStr + pointsLeftStr + ".");
}

function isRestingSpot(id) {
    return (Math.floor(id / 100) % 100) % 6 == 0 && id != 925020001;
}

function isBetween(party, range) {
    var lowest = cm.getPlayer().getLevel();
    var highest = lowest;
    for (var x = 0; x < party.getMembers().size(); x++) {
        var lvl = party.getMembers().get(x).getLevel();
        if (lvl > highest)
            highest = lvl;
        else if (lvl < lowest)
            lowest = lvl;
    }
    return (highest - lowest) <= range;
}
