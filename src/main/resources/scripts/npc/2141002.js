/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Twilight of the gods
	Description: 		Pink Bean
 */

    var status;

    function start() {
        status = -1;
        action(1, 0, 0);
    }
    
    function action(mode, type, selection) {
        if (mode == -1)
            cm.dispose();
        else {
            if (mode == 0) {
                cm.dispose();
                return;
            }
            if (mode == 1)
                status++;
            else
                status--;
            
            var eim = cm.getEventInstance();
            if(!eim.isEventCleared()) {
                if (status == 0) {
                    cm.sendYesNo("现在要离开吗?");
                }
                else if (status == 1) {
                    cm.warp(270050000, 0);
                    cm.dispose();
                }
            
            } else {
                if (status == 0) {
                    cm.sendYesNo("品克缤被击败了!你们是真正的英雄!感谢你们的努力,时间神殿再一次恢复正常了!你们现在就要离开吗?");
                }
                else if (status == 1) {
                    if(eim.giveEventReward(cm.getPlayer(), 1)) {
                        cm.warp(270050000);
                    }
                    else {
                        cm.sendOk("背包空间不足.");
                    }
                    
                    cm.dispose();
                }
            }
        }
    }