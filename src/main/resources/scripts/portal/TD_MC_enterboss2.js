function enter(pi) {
    var em = pi.getEventManager("MK_PrimeMinister");
    var party = pi.getPlayer().getParty();
    if (party != null) {
        var eli = em.getEligibleParty(pi.getParty());   // thanks Conrad for pointing out missing eligible party declaration here
        if (!pi.getPlayer().isPartyLeader()) {
            pi.message("你不是队长。");
            return false;
        } else if (eli.size() <= 0) {
            pi.message("别的队伍已经在这个频道挑战了。");
            return false;
        } else if (eli.size() != pi.getParty().getPartyMembers().size() || pi.getPlayer().getPartyMembersOnSameMap().size() != pi.getParty().getPartyMembers().size()) {
            pi.message("队伍里有人不在附近或不满足进入条件。");
            return false;
        } else {
            if (em.startInstance(party, pi.getMap(), 1)) {
                pi.playPortalSound();
                return true;
            } else {
                pi.message("别的队伍已经在这个频道挑战了。");
                return false;
            }
        }
    } else {
        if (em.startInstance(pi.getPlayer())) { // thanks RedHat for noticing an issue here
            pi.playPortalSound();
            return true;
        } else {
            pi.message("别的队伍已经在这个频道挑战了。");
            return false;
        }
    }
}