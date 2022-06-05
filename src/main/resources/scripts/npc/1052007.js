

var status = 0;
var ticketSelection = -1;
var text = "检票口.";
var hasTicket = false;
var NLC = false;
var em;

function start() {
	cm.sendSimple("选择目的地.\n\r\n#L0##b废弃都市购物中心#l\n\n\r\n#L1#进入秘密区域#l\r\n#L2#新叶城#l");
}

function action(mode, type, selection) {
    em = cm.getEventManager("Subway");
    
    if (mode == -1) {
    	cm.dispose();
    	return;
    } else if (mode == 0) {
           cm.dispose();
           return;
    } else {
    	status++;
    }
    if (status == 1) {
        if (selection == 0) {
    		var em = cm.getEventManager("KerningTrain");
                if (!em.startInstance(cm.getPlayer())) {
                    cm.sendOk("里面人满了.待会儿再来吧.");
                }
                
        	cm.dispose();
        	return;
        } else if (selection == 1) {
            if (cm.haveItem(4031036) || cm.haveItem(4031037) || cm.haveItem(4031038)) {
                text += "你可以进去,要用哪张票?#b";
                for (var i = 0; i < 3; i++) {
	                if (cm.haveItem(4031036 + i)) {
	                    text += "\r\n#b#L" + (i + 1) + "##t" + (4031036 + i) +"#";
	        		}
	            }
                cm.sendSimple(text);  
                hasTicket = true;
            } else { 
            	cm.sendOk("看样子你没有地铁票!");
            	cm.dispose();
            	return;
            }
        } else if (selection == 2) {
        	if (!cm.haveItem(4031711) && cm.getPlayer().getMapId() == 103000100) {
	    		cm.sendOk("你没有票!你可以找#p9201057#购买.");
	    		cm.dispose();
	    		return;
        	}
            if (em.getProperty("entry") == "true") {
                cm.sendYesNo("看起来这里有足够的空间。请把票准备好，我可以让你进去。旅程会很长，但你会很快到达目的地的。你怎么认为？你想搭这趟车吗？");
            } else {
                cm.sendNext("我们将在起飞前1分钟开始登机。请耐心等待几分钟。请注意，地铁将准时起飞，在此之前1分钟我们将停止收票，请务必准时到达。");
                cm.dispose();
                return;
            }
        }
    } else if (status == 2) {
    	if (hasTicket) {
    		ticketSelection = selection;
            if (ticketSelection > -1) {
                cm.gainItem(4031035 + ticketSelection, -1);
                cm.warp(103000897 + (ticketSelection * 3), "st00");  // thanks IxianMace for noticing a few scripts having misplaced warp SP's
                hasTicket = false;
                cm.dispose();
                return;
            }
    	}
        
	if (cm.haveItem(4031711)) {
            if(em.getProperty("entry") == "false") {
                cm.sendNext("我们将在起飞前1分钟开始登机。请耐心等待几分钟。请注意，地铁将准时起飞，在此之前1分钟我们将停止收票，请务必准时到达。");
            }
            else {
                cm.gainItem(4031711, -1);
                cm.warp(600010004);
            }
            
            cm.dispose();
            return;
        }
    }
}