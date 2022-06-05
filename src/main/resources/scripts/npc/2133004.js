var status = -1;

function start() {
    action(1,0,0);
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
                    if(!cm.haveItem(4001163) || !cm.isEventLeader()) {
                        cm.sendYesNo("让队长给我看看#z4001163#.\r\n\r\n还是你想#r离开#k? 离开的话意味着抛弃同伴.");
                    } else {
                        cm.sendNext("干得漂亮,你获得了#z4001163#.我带你们去#b#m930000800##k.这边走.");
                    }                        
                } else if(status == 1) {
                        if (!cm.haveItem(4001163)) {
                                cm.warp(930000800, 0);
                        } else {
                                cm.getEventInstance().warpEventTeam(930000600);
                        }
                        
                        cm.dispose();
                }
        }
}