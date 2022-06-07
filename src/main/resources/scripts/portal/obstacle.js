/*
 	Author: Ronan
 	Map: Mushroom Castle - Deep Inside Mushroom Forest (106020300)
 	Right Portal
 */
 
 function enter(pi){
 	if (pi.isQuestStarted(100202)) {
 		pi.playPortalSound(); pi.warp(106020400, 2);
 		return true;
 	} else if (pi.hasItem(4000507)) {
                pi.gainItem(4000507, -1);
                pi.message("你用了一个蘑菇的毒孢子穿过屏障。");
                
                pi.playPortalSound(); pi.warp(106020400, 2);
                return true;
        }

        pi.message("杂草丛生的藤蔓挡住了路。");
 	return false;
 } 