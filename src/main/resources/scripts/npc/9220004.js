/** 
Happy - Happy ville 
@author Ronan
**/ 
var status = -1;
function start() { 
        action(1, 0, 0); 
} 
function action(mode, type, selection) { 
	if (mode == -1) { 
		cm.dispose(); 
	} else {
                if (status == 0 && mode == 0) { 
			cm.sendOk("需要的话随时找我."); 
			cm.dispose(); 
		} 
                if (mode == 1) 
                        status++; 
                else 
                        status--; 
                 
                if (status == 0) { 
                        cm.sendSimple("#b<突袭:幸福村>#k\r\n一次突袭只不过是许多人联合起来，试图打败那些非常强大的生物. 这里也没什么不同。每个人都可以参与击败这个生物. 你想做什么?\r\n#b\r\n#L0#召唤#o9500317#.\r\n#L1#召唤#o9500320#.\r\n#L2#就是看看.#k");
                } else if(status == 1) {
                        if(selection == 0) {
                                if(cm.getMap().getMonsters().size() > 1) {  //reactor as a monster? wtf
                                        cm.sendOk("这里还有其他生物."); 
                                        cm.dispose();
                                        return;
                                }
                            
                                cm.getMap().spawnMonsterOnGroundBelow(9500317, 1700, 80);
                        } else if(selection == 1) {
                                if(cm.getMap().getMonsters().size() > 6) {  //reactor as a monster? wtf
                                        cm.sendOk("这里还有其他生物."); 
                                        cm.dispose();
                                        return;
                                }
                            
                                cm.getMap().spawnMonsterOnGroundBelow(9500320, 1700, 80);
                        } else {
                                cm.sendOk("好吧.");
                        }
                        
                        cm.dispose();
                }
        }
} 