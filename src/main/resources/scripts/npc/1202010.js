var status = 0;

var spawnPnpc = false;
var spawnPnpcFee = 7000000;
var jobType = 21;

function start() {
    if (parseInt(cm.getJobId() / 100) == jobType && cm.canSpawnPlayerNpc(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()))) {
        spawnPnpc = true;
        
        var sendStr = "你已经走了很长的路，才能达到今天的力量、智慧和勇气，不是吗？你想要#r达人殿堂里有你的位置吗#k?";
        if(spawnPnpcFee > 0) {
            sendStr += "我可以为你做，收费为#b " + cm.numberWithCommas(spawnPnpcFee) + "金币.#k";
        }
        
        cm.sendYesNo(sendStr);
    } else {
        cm.sendOk("看，伟大的英雄们！那些坚韧不拔的心，是从很久以前就在保护我们的人民，我们勇敢的同志们。");
        cm.dispose();
    }
}

function action(mode, type, selection) {
    status++;
    if (mode == 0 && type != 1)
        status -= 2;
    if (status == -1){
        start();
        return;
    } else {
        if(spawnPnpc) {
            if(mode > 0) {
                if(cm.getMeso() < spawnPnpcFee) {
                    cm.sendOk("你没有足够的金币.");
                    cm.dispose();
                    return;
                }
                
                if(Packages.server.life.MaplePlayerNPC.spawnPlayerNPC(Packages.constants.game.GameConstants.getHallOfFameMapid(cm.getJob()), cm.getPlayer())) {
                    cm.sendOk("做好了,希望你喜欢.");
                    cm.gainMeso(-spawnPnpcFee);
                } else {
                    cm.sendOk("对不起,我们的位置不够了...");
                }
            }
            
            cm.dispose();
            return;
        } else {
            // do nothing
        }
    }
}