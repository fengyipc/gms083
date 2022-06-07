function enter(pi) {
    var party = pi.getPlayer().getParty();
    if (party.getLeaderId() != pi.getPlayer().getId()) {
        pi.getPlayer().dropMessage("只有队长可以通过");
        return false;
    }
    for (var i = 0; i < party.getPartyMembers().size(); i++) {
        if (!pi.getPlayer().getMap().getMapAllPlayers().containsKey(party.getPartyMembers().get(i).getId())) {
            pi.getPlayer().dropMessage("玩家<" + party.getPartyMembers().get(i).getName() + ">不在当前地图,必须全队都到达这里才可以进入传送门");
            return false;
        }
    }
    pi.playPortalSound(); pi.warpParty(926100401, 0); //next
    return true;
}