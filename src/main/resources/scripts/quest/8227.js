/* ===========================================================
			Ronan Lana
	NPC Name: 		Jack, John
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
            qm.sendAcceptDecline("嘿，伙计！时机不错。这是一份公报，我可以从看守所的官员那里翻阅，但它的信息是加密的。我没有用，因为它是这样的。你能把这个传给约翰看看他能不能破解?");
    else if (status == 1){
        if(qm.canHold(4032032, 1)) {
            qm.gainItem(4032032, 1);
            qm.sendOk("很好，这件事我指望你.");
            qm.forceStartQuest();
        } else {
            qm.sendOk("嘿。你的ETC没有空位.");
        }
    } else if (status == 2) {
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
            qm.gainItem(4032032, -1);
            qm.sendOk("哦，你带了封信来吗？！整洁！让我看看我现在能不能解码.");
            qm.forceCompleteQuest();
        } else {
            qm.sendOk("你没带杰克说的密码信？来吧，孩子，我们需要它来破译敌人的下一步!");
        }
    } else if (status == 1){
        qm.dispose();
    }
}
