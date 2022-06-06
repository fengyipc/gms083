/* ===========================================================
			Ronan Lana
	NPC Name: 		John, Elpam
	Description: 	Quest - Lost in Translation
=============================================================
Version 1.0 - Script Done.(10/7/2017)
=============================================================
*/

var status = -1;

function start(mode, type, selection) {
    status++;
	if (mode != 1) {
	    if(type == 1 && mode == 0)
		    status -= 2;
            else {
                qm.sendOk("拜托，这个城市真的需要你配合!");
                qm.dispose();
                return;
            }
	}
	if (status == 0)
		qm.sendAcceptDecline("嗯，那不好。我好像不能让这些超象形文字工作，该死。。。啊，是的，外人！他可能知道这篇论文所用的语言。让埃尔帕姆读一下，也许他知道些什么.");
	else if (status == 1){
            if(qm.canHold(4032032, 1)) {
                qm.gainItem(4032032, 1);
                qm.sendOk("很好，这件事我指望你.");
                qm.forceStartQuest();
            } else {
                qm.sendOk("嘿。你的ETC没有空位.");
            }
	} else if (status == 2){
            qm.dispose();
	}
}

function end(mode, type, selection) {
    status++;
    if (mode != 1) {
        if(type == 1 && mode == 0)
                status -= 2;
        else {
            qm.dispose();
            return;
        }
    }
    if (status == 0){
        if(qm.haveItem(4032032, 1)) {
            qm.sendOk("你好，本地人。你有需要翻译的信息吗？我在范思哲的人以精通多种外语而闻名，这个人很可能是我们认识的一些人。请待命。。。");
            qm.gainItem(4032032, -1);
            qm.forceCompleteQuest();
        } else {
            qm.sendOk("恐怕你没有自称随身携带的那封信.");
        }
    } else if (status == 1) {
        qm.dispose();
    }
}
