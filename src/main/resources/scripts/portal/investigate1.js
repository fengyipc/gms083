function enter(pi) {
	if(pi.isQuestActive(2314) || pi.getPlayer().getQuestStatus(2319)==2){
		pi.openNpc(1300014);
		return true;
	}
	return false;
}