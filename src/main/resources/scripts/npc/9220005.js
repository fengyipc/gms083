/** 
Roodolph - Happy ville 
@author fantier123
**/ 
var status;
function start() { 
        status = 0;
	action(1, 0, 0); 
} 
function action(mode, type, selection) { 
	if (mode == -1) { 
		cm.dispose(); 
	} else { 
		if (mode == 0) { 
			cm.sendOk("需要了在和我联系."); 
			cm.dispose(); 
		} 
                if (mode == 1) 
                        status++; 
                else 
                        status--; 
                 
                if (status == 1) { 
                        if (cm.getChar().getMapId() == 209000000) { 
                                cm.sendYesNo("你想去#b扫雪车#k所在的地方吗?"); 
                                status = 9; 
                        } else if (cm.getChar().getMapId() == 209080000) { 
                                cm.sendYesNo("想要返回幸福村吗?"); 
                                status = 19; 
                        }
                        else {
                                cm.sendOk("你还好吗?");
                                cm.dispose();
                        }
                } 
                else if (status == 10) { 
                        cm.warp(209080000, 0); 
                        cm.dispose(); 
                } 
                else if (status == 20) { 
                        cm.warp(209000000, 0); 
                        cm.dispose(); 
                }
                
                else {
                        cm.sendOk("你还好吗?");
                        cm.dispose();
                }
        }
} 