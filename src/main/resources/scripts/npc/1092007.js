/*
NPC:        Muirhat - Nautilus' Port
Created By: Kevin
Function:   When on the quest, he warps player to Black Magician's Disciple
*/

var status;

function start() {
    
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection){
    if (mode == -1){
        cm.dispose();
    }
    else{
        if (mode == 0 && type > 0){
            cm.dispose();
            return;
        }

        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0){
            if (cm.getQuestStatus(2175) == 1){
                if (cm.getPlayer().canHold(2030019)){
                    cm.sendOk("拿着#b#t2030019##k,这会让你更轻松.  #i2030019#");
                }
                else{
                    cm.sendOk("背包空间不足.");
                    cm.dispose();
                }
            }
            else{
                cm.sendOk("黑魔法师和他的手下.凯琳和她的船员. \n他们之间的斗争永远不会结束.");
                cm.dispose();
            }
        }
        else if (status == 1){
            cm.gainItem(2030019, 1);
            cm.warp(100000006, 0);
            cm.dispose();
        }
    }
}