/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
		       Matthias Butz <matze@odinms.de>
		       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation version 3 as published by
    the Free Software Foundation. You may not use, modify or distribute
    this program under any other version of the GNU Affero General Public
    License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

    Author: Ronan Lana (RonanLana)
*/
/* Chico
	Lidibrium : Ludibrium Village (2040014)
	
	Refining NPC: 
	* Omok sets - Set 2
	* Match of cards
*/

var status = -1;
var selectedType = -1;
var selectedItem = -1;
var item;
var mats;
var matQty;
var cost;
var qty;

var items = [4080100,4080006,4080007,4080008,4080009,4080010,4080011];
var matSet = [[4030012],[4030009,4030013,4030014],[4030009,4030013,4030016],[4030009,4030014,4030016],[4030009,4030015,4030013],[4030009,4030015,4030014],[4030009,4030015,4030016]];
var matQtySet = [[99],[1,99,99],[1,99,99],[1,99,99],[1,99,99],[1,99,99],[1,99,99]];
var costSet = [10000,25000,25000,25000,25000,25000,25000];

function start() {
    cm.getPlayer().setCS(true);
    var selStr = "你好!我是#p2040014#, 我是小游戏专家.你想玩什么游戏? #b"
    var options = ["#i4080100# #t4080100#","#i4080006# #t4080006#","#i4080007# #t4080007#","#i4080008# #t4080008#","#i4080009# #t4080009#","#i4080010# #t4080010#","#i4080011# #t4080011#"];
    for (var i = 0; i < options.length; i++)
        selStr += "\r\n#L" + i + "# " + options[i] + "#l";
    cm.sendSimple(selStr);
}

function action(mode, type, selection) {
    status++;
    if (mode != 1){
        cm.dispose();
        return;
    }
    if (status == 0) {        
        selectedItem = selection;
        
        item = items[selectedItem];
        mats = matSet[selectedItem];
        matQty = matQtySet[selectedItem];
        cost = costSet[selectedItem];
        qty = 1;
        
        var prompt = "我们要做";
        if (qty == 1)
            prompt += "一个#t" + item + "#";
        else
            prompt += qty + "个#t" + item + "#";
        prompt += ",对吗? 我需要这些材料!#b";
        if (mats instanceof Array)
            for(var i = 0; i < mats.length; i++)
                prompt += "\r\n#i" + mats[i] + "# " + (matQty[i] * qty) + " #t" + mats[i] + "#";
        else
            prompt += "\r\n#i" + mats + "# " + (matQty * qty) + " #t" + mats + "#";
        if (cost > 0)
            prompt += "\r\n#i4031138# " + (cost * qty) + "金币";
        cm.sendYesNo(prompt);
    }else if (status == 1) {
        var complete = true;
        
        if (cm.getMeso() < (cost * qty)) {
            cm.sendOk("瞧瞧,我也要赚钱的.");
            cm.dispose();
            return;
        }
        else {
            if (mats instanceof Array) {
                for(var i = 0; complete && i < mats.length; i++)
                    if (!cm.haveItem(mats[i], matQty[i] * qty))
                        complete = false;
            }else if (!cm.haveItem(mats, matQty * qty))
                complete = false;
        }	
        if (!complete)
            cm.sendOk("材料不足.");
        else {
            if (cm.canHold(item,qty)) {
                if (mats instanceof Array) {
                    for (var i = 0; i < mats.length; i++)
                        cm.gainItem(mats[i], -(matQty[i] * qty));
                }else
                    cm.gainItem(mats, -(matQty * qty));
                cm.gainMeso(-(cost * qty));
                
                cm.gainItem(item, qty);
                cm.sendOk("这就是了!");
            }else {
                cm.sendOk("背包空间不足.");
            }
        }
        
        cm.dispose();
    }
}