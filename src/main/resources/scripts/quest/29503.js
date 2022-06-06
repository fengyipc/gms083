/* 
 *  Dallier - King Medal
 *  Lith Habor = 104000000
 *  Sleepywood = 105040300
 */

var status = -1;

function start(mode, type, selection) {
    if (mode == 0) {
	if (status == 0) {
	    qm.sendNext("准备好了回来找我.");
	    qm.dispose();
	    return;
	} else if (status == 2) {
	    status--;
	} else {
	    qm.dispose();
	    return;
	}
    } else {
	status++;
    }

    if (status == 0) {
	qm.sendAcceptDecline("#v1142030# #e#b#z1142030##k\n\r\n\r - 限时: 1 小时\n\r - 为这个村子捐赠最多....#n想要试试能不能获得这枚勋章吗?");
    } else if (status == 1) {
	qm.sendNext("当前排名 \n\r\n\r1. #bMintLovePep#k : ???,???,??? 金币\n\r2. #bKelviinXD#k : 68,000,000 金币\n\r3. #bxBabyRence#k : 49,999,999 金币\n\r4. #bXxTrIStaArxx#k : 29,999,999 金币n\n\r5. #bxBabyRence#k : 14,000,000 金币\n\r\n\rUnderstand that we cannot divulge the exact number donated by the current King of Donation. \n\rAlso remember that all records will be reset every first of the month...");
    } else if (status == 2) {
	qm.sendNextPrev("Best of luck to you. There's no real set date for this, so if you feel like you qualify for this, then feel free to come see me so I can determine whether you qualify for it. And remember that you will not be able to challenge other Titles unless you either forfeit this challenge or complete it...");
	qm.dispose();
    }
}

function end(mode, type, selection) {
}

/*function getMedalType(ids) {
    var thestring = "#b";
    var extra;
    for (x = 0; x < ids.length; x++) {
	extra = "#L" + x + "##t" + ids[x] + "##l\r\n";
	thestring += extra;
    }
    thestring += "#k";
    return thestring;
}*/