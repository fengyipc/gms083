/* @author RonanLana */

function enter(pi) {
        if (!pi.haveItem(4000381)) {
                pi.playerMessage(5, "你没有白色精华。");
                return false;
        } else {
                var em = pi.getEventManager("LatanicaBattle");

                if (pi.getParty() == null) {
                        pi.playerMessage(5, "你当前不在队伍中，创建一个来尝试挑战BOSS。");
                        return false;
                } else if(!pi.isLeader()) {
                        pi.playerMessage(5, "你的队长必须进入传送门才能开始战斗。");
                        return false;
                } else {
                        var eli = em.getEligibleParty(pi.getParty());
                        if(eli.size() > 0) {
                                if(!em.startInstance(pi.getParty(), pi.getPlayer().getMap(), 1)) {
                                        pi.playerMessage(5, "战斗已经开始，你还不能进入这个地方。");
                                        return false;
                                }
                        }
                        else {  //this should never appear
                                pi.playerMessage(5, "你还不能开始这场战斗，因为你的队伍不在附近，你的一些队员没有资格参加战斗，或者他们不在地图上。如果找不到成员，请尝试“群搜索”。");
                                return false;
                        }

                        pi.playPortalSound();
                        return true;
                }
        }
}