/*
	@Author Ronan
        (Neo Tokyo Teleporter)
*/

var quests = [3719, 3724, 3730, 3736, 3742, 3748];
var array = ["2021年 - Average Town Entrance", "2099年 - Midnight Harbor Entrance", "2215年 - Bombed City Center Retail District", "2216年 - Ruined City Intersection", "2230年 - Dangerous Tower Lobby", "2503年 - Air Battleship Bow"/*, "Year 2227 - Dangerous City Intersection"*/];
var limit;

function start() {
        if(!cm.isQuestCompleted(3718)) {
            cm.sendOk("时间机器还没有被激活.");
            cm.dispose();
            return;
        }
        
        for(limit = 0; limit < quests.length; limit++) {
            if(!cm.isQuestCompleted(quests[limit])) {
                break;
            }
        }
        
        if(limit == 0) {
            cm.sendOk("挑战#bGuardian Nex#k,证明你的勇气,这样才可以解锁下一个逆奥之城的地图.");
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
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
    
                if(status == 0) {
                        var menuSel = generateSelectionMenu(array, limit);
                        cm.sendSimple(menuSel);
                } else if(status == 1) {
                        var mapid = 0;

                        switch (selection) {
                            case 0:
                                mapid = 240070100;
                                break;
                            case 1:
                                mapid = 240070200;
                                break;
                            case 2:
                                mapid = 240070300;
                                break;
                            case 3:
                                mapid = 240070400;
                                break;
                            case 4:
                                mapid = 240070500;
                                break;
                            case 5:
                                mapid = 240070600;
                                break;
                            /*case 6:
                                mapid = 683070400;
                                break;*/
                        }
                        
                        if (mapid > 0) {
                            cm.warp(mapid, 1);
                        } else {
                            cm.sendOk("先完成上一个任务.");
                        }
                }
        }
}

function generateSelectionMenu(array, limit) {     // nice tool for generating a string for the sendSimple functionality
        var menu = "";
        
        var len = Math.min(limit, array.length);
        for (var i = 0; i < len; i++) {
                menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
}

    