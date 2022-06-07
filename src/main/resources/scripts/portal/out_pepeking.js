function enter(pi) {
	var eim = pi.getEventInstance();
        if(eim != null) {
                eim.stopEventTimer();
                eim.dispose();
        }
	
	var questProgress = pi.getQuestProgressInt(2330, 3300005) + pi.getQuestProgressInt(2330, 3300006) + pi.getQuestProgressInt(2330, 3300007); //3 Yetis
 	if(questProgress == 3 && !pi.hasItem(4032388)) {
 		if(pi.canHold(4032388)){
 			pi.getPlayer().message("你得到一把通往婚礼大厅的钥匙。企鹅国王一定把它扔了。");
 			pi.gainItem(4032388, 1);
 
 			pi.playPortalSound();
                        pi.warp(106021400, 2);
                        return true;
 		} else {
 			pi.getPlayer().message("请给其他栏留一个空间");
 			return false;
 		}
 	} else {
 		pi.playPortalSound();
                pi.warp(106021400, 2);
                return true;
 	}
}