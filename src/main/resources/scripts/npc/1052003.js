/* Chris
        Victoria Road : Kerning City Repair Shop (103000006)
        
        Refining NPC: 
        * Minerals
        * Jewels
        * Special - Iron Hog's Metal Hoof x 100 into Steel Plate
        * Claws
*/

var status = 0;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;
var equip;
var last_use; //last item is a use item

function start() {
    cm.getPlayer().setCS(true);
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {    // hope types 2 & 3 works as well, as 1 and 4 END CHAT
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            var selStr = "我可以为你锻造.#b"
            var options = new Array("制作矿石","制作宝石","我有一些#z4000039#...","升级拳套");
            for (var i = 0; i < options.length; i++){
                selStr += "\r\n#L" + i + "# " + options[i] + "#l";
            }

            cm.sendSimple(selStr);
        }
        else if (status == 1) {
            selectedType = selection;
            if (selectedType == 0){ //mineral refine
                var selStr = "制作哪种?#b";
                var minerals = new Array ("#z4011000#","#z4011001#","#z4011002#","#z4011003#","#z4011004#","#z4011005#","#z4011006#");
                for (var i = 0; i < minerals.length; i++){
                    selStr += "\r\n#L" + i + "# " + minerals[i] + "#l";
                }
                equip = false;
                cm.sendSimple(selStr);
            }
            else if (selectedType == 1){ //jewel refine
                var selStr = "制作哪种?#b";
                var jewels = new Array ("#z4021000#","#z4021001#","#z4021002#","#z4021003#","#z4021004#","#z4021005#","#z4021006#","#z4021007#","#z4021008#");
                for (var i = 0; i < jewels.length; i++){
                    selStr += "\r\n#L" + i + "# " + jewels[i] + "#l";
                }
                equip = false;
                cm.sendSimple(selStr);
            }
            else if (selectedType == 2){ //foot refine
                var selStr = "你知道吗?很多人都不知道#z4000039#有什么用...如果你愿意的话,我可以用#z4000039#做些特殊的东西.";
                equip = false;
                cm.sendYesNo(selStr);
            }
            else if (selectedType == 3){ //claw refine
                var selStr = "哪一种?#b";
                //1472023,1472024,1472025
                var claws = new Array ("#z1472023##k Lv. 60#b","#z1472024##k Lv. 60#b","#z1472025##k Lv. 60#b");
                for (var i = 0; i < claws.length; i++){
                    selStr += "\r\n#L" + i + "# " + claws[i] + "#l";
                }
                equip = true;
                cm.sendSimple(selStr);
            }
            if (equip)
                status++;
        }
        else if (status == 2 && mode == 1) {
            selectedItem = selection;
            if (selectedType == 0){ //mineral refine
                var itemSet = new Array(4011000,4011001,4011002,4011003,4011004,4011005,4011006);
                var matSet = new Array(4010000,4010001,4010002,4010003,4010004,4010005,4010006);
                var matQtySet = new Array(10,10,10,10,10,10,10);
                var costSet = new Array(300,300,300,500,500,500,800);
                item = itemSet[selectedItem];
                mats = matSet[selectedItem];
                matQty = matQtySet[selectedItem];
                cost = costSet[selectedItem];
            }
            else if (selectedType == 1){ //jewel refine
                var itemSet = new Array(4021000,4021001,4021002,4021003,4021004,4021005,4021006,4021007,4021008);
                var matSet = new Array(4020000,4020001,4020002,4020003,4020004,4020005,4020006,4020007,4020008);
                var matQtySet = new Array(10,10,10,10,10,10,10,10,10);
                var costSet = new Array (500,500,500,500,500,500,500,1000,3000);
                item = itemSet[selectedItem];
                mats = matSet[selectedItem];
                matQty = matQtySet[selectedItem];
                cost = costSet[selectedItem];
            }
            else if (selectedType == 2){ //special refine
                var itemSet = new Array(4011001,1);
                var matSet = new Array(4000039,1);
                var matQtySet = new Array (100,1);
                var costSet = new Array (1000,1)
                item = itemSet[0];
                mats = matSet[0];
                matQty = matQtySet[0];
                cost = costSet[0];
            }

            var prompt = "要制作#t" + item + "#?想做多少?";

            cm.sendGetNumber(prompt,1,1,100)
        }

        else if (status == 3) {
            if (equip)
            {
                selectedItem = selection;
                qty = 1;
            }
            else
                qty = (selection > 0) ? selection : (selection < 0 ? -selection : 1);

            last_use = false;

            if (selectedType == 3){ //claw refine
                var itemSet = new Array (1472023,1472024,1472025);
                var matSet = new Array(new Array (1472022,4011007,4021000,2012000),new Array (1472022,4011007,4021005,2012002),new Array (1472022,4011007,4021008,4000046));
                var matQtySet = new Array (new Array (1,1,8,10),new Array (1,1,8,10),new Array (1,1,3,5));
                var costSet = new Array (80000,80000,100000)
                item = itemSet[selectedItem];
                mats = matSet[selectedItem];
                matQty = matQtySet[selectedItem];
                cost = costSet[selectedItem];
                if (selectedItem != 2)
                    last_use = true;
            }

            var prompt = "你想制作";
            if (qty == 1)
                prompt += "一个#t" + item + "#?";
            else
                prompt += qty + "个#t" + item + "#?";

            prompt += "我需要这些材料!#b";

            if (mats instanceof Array){
                for (var i = 0; i < mats.length; i++) {
                    prompt += "\r\n#i"+mats[i]+"# " + matQty[i] * qty + " #t" + mats[i] + "#";
                }
            } else {
                prompt += "\r\n#i"+mats+"# " + matQty * qty + " #t" + mats + "#";
            }

            if (cost > 0) {
                prompt += "\r\n#i4031138# " + cost * qty + "金币";
            }
            cm.sendYesNo(prompt);
        } else if (status == 4) {
            var complete = true;

            if(!cm.canHold(item, qty)) {
                cm.sendOk("背包空间不足.");
                cm.dispose();
                return;
            }
            else if (cm.getMeso() < cost * qty) {
                cm.sendOk("金币不够.");
                cm.dispose();
                return;
            } else {
                if (mats instanceof Array) {
                    for(var i = 0; complete && i < mats.length; i++)
                        if (!cm.haveItem(mats[i], matQty[i] * qty))
                            complete = false;
                }
                else if (!cm.haveItem(mats, matQty * qty))
                    complete = false;
            }

            if (!complete)
                cm.sendOk("材料不足.");
            else {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++){
                        cm.gainItem(mats[i], -matQty[i] * qty);
                    }
                } else {
                    cm.gainItem(mats, -matQty * qty);
                }
                cm.gainMeso(-cost * qty);
                cm.gainItem(item, qty);
                cm.sendNext("做好了.");
            }
            cm.dispose();
        }
    }
}