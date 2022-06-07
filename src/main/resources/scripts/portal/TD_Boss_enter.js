/* @author RonanLana */

function enter(pi) {
        var stage = ((Math.floor(pi.getMapId() / 100)) % 10) - 1;
        var em = pi.getEventManager("TD_Battle" + stage);
        if(em == null) {
                pi.playerMessage(5, "战斗" + stage + "遇到意外错误，当前不可用。");
                return false;
        }

        if (pi.getParty() == null) {
                pi.playerMessage(5, "你得组队挑战");
                return false;
        } else if(!pi.isLeader()) {
                pi.playerMessage(5, "队长进入传送门开始战斗");
                return false;
        } else {
                var eli = em.getEligibleParty(pi.getParty());
                java.lang.System.out.println(em.getName());
                if(eli.size() > 0) {
                        if(!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                                pi.playerMessage(5, "战斗已经开始,你不能进去");
                                return false;
                        }
                }
                else {
                        pi.playerMessage(5, "你的队伍必须至少有2名队员组成才能挑战。");
                        return false;
                }

                pi.playPortalSound();
                return true;
        }
}
