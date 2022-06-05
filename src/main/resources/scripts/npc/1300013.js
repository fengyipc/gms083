/*
        NPC: Blocked Entrance (portal?)
        MAP: Mushroom Castle - East Castle Tower (106021400)
*/

var status;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    else if (mode == 0 && status == 0) {
        cm.dispose();
        return;
    }
    else if (mode == 0)
        status--;
    else
        status++;

    if (status == 0) {
        cm.sendSimple("#L1#挑战 #b企鹅王#k 与 #b雪人三兄弟#k.#l\r\n#L0#挑战 #b拯救碧欧蕾塔公主#k.#l");
    } else if (status == 1) {
        if (selection == 1) {
            var em = cm.getEventManager("KingPepeAndYetis");
            var party = cm.getPlayer().getParty();
            if (party != null) {
                var eli = em.getEligibleParty(cm.getParty());   // thanks Conrad for pointing out missing eligible party declaration here
                if (eli.size() > 0) {
                    if (em.startInstance(party, cm.getMap(), 1)) {
                    } else {
                        cm.message("别的队伍已经在这个频道挑战了。");
                    }
                }
            } else {
                if (em.startInstance(cm.getPlayer())) { // thanks RedHat for noticing an issue here
                } else {
                    cm.message("别的队伍已经在这个频道挑战了。");
                }
            }
            cm.dispose();
        } else if (selection == 0) {
            var questProgress = cm.getQuestProgressInt(2330, 3300005) + cm.getQuestProgressInt(2330, 3300006) + cm.getQuestProgressInt(2330, 3300007); //3 Yetis
            if (cm.isQuestCompleted(2330) || cm.haveItem(4032388)) {
                cm.warp(106021401, 1);
            } else {
                cm.sendOk("你必须完成<阻止婚礼>任务才可以进入");
            }
            cm.dispose();
        }
    }

}