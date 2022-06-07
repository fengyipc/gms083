function enter(pi) {
	if(pi.isQuestStarted(22008)){
		pi.playPortalSound(); pi.warp(100030103, "west00");
	} else {
		pi.playerMessage(5, "你不能无缘无故地去尤塔家后院");
    } 
	return true;
}  