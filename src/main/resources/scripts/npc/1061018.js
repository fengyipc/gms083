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
    
                if(status == 0){
                        if(cm.getEventInstance().isEventCleared()) {
                                cm.sendOk("哇!你们居然打败了蝙蝠怪.");
                        } else if(cm.getPlayer().getMap().getCharacters().size() > 1) {
                                cm.sendYesNo("你确定要抛弃伙伴逃离战斗吗?");
                        } else {
                                cm.sendYesNo("你有什么事的话你就先走吧.");
                        }
                } else if(status == 1){
                        if(cm.getEventInstance().isEventCleared()) {
                                cm.warp(cm.getMapId() == 105100300 ? 105100301 : 105100401, 0);
                        } else {
                                cm.warp(105100100);
                        }

                        cm.dispose();
                }
        }
}
