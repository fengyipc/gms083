/*
	This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/* Dr. Lenu
	Henesys Random/VIP Eye Color Change.
*/
var status = 0;
var beauty = 0;
var regprice = 1000000;
var vipprice = 1000000;
var colors = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}

function pushIfItemsExists(array, itemidList) {
    for (var i = 0; i < itemidList.length; i++) {
        var itemid = itemidList[i];
        
        if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
            array.push(itemid);
        }
    }
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 1)  // disposing issue with stylishs found thanks to Vcoc
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0)
            cm.sendSimple("你好~! 我是#p9200100#, 我可以修改你的瞳色!使用#b#t5152010##k或#b#t5152013##k!你想做什么?\r\n#L1#换瞳色: #i5152010##t5152010##l\r\n#L2#换瞳色: #i5152013##t5152013##l\r\n#L3#使用: #i5152103# (任何颜色)#l");
        else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                if (cm.getPlayer().getGender() == 0)
                    var current = cm.getPlayer().getFace()% 100 + 20000;
                if (cm.getPlayer().getGender() == 1)
                    var current = cm.getPlayer().getFace()% 100 + 21000;
                colors = Array();
                pushIfItemsExists(colors, [current , current + 100, current + 200, current +400, current + 600, current + 700]);
                cm.sendYesNo("如果使用#b#t5152010##k,你将会得到随机一种瞳色.确定使用#b#t5152010##k吗?");
            } else if (selection == 2) {
                beauty = 2;
                if (cm.getPlayer().getGender() == 0)
                    var current = cm.getPlayer().getFace()% 100 + 20000;
                if (cm.getPlayer().getGender() == 1)
                    var current = cm.getPlayer().getFace() % 100 + 21000;
                colors = Array();
                pushIfItemsExists(colors, [current , current + 100, current + 200, current +400, current + 600, current + 700]);
                cm.sendStyle("使用#b#t5152013##k,你可以挑选一个你喜欢的方案.", colors);
            } else if (selection == 3) {
                beauty = 3;
                if (cm.getPlayer().getGender() == 0) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 20000;
                }
                if (cm.getPlayer().getGender() == 1) {
                    var current = cm.getPlayer().getFace()
                    % 100 + 21000;
                }
                
                colors = Array();
                for (var i = 0; i < 8; i++) {
                    if (cm.haveItem(5152100 + i)) {
                        pushIfItemExists(colors, current + 100 * i);
                    }
                }
                
                if (colors.length == 0) {
                    cm.sendOk("你没有任何一次性美瞳.");
                    cm.dispose();
                    return;
                }
                
                cm.sendStyle("你想用哪种?", colors);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5152010) == true){
                    cm.gainItem(5152010, -1);
                    cm.setFace(colors[Math.floor(Math.random() * colors.length)]);
                    cm.sendOk("好了!");
                } else
                    cm.sendOk("你没有我们的会员卡..");
            } else if (beauty == 2){
                if (cm.haveItem(5152013) == true){
                    cm.gainItem(5152013, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("好了!");
                } else
                    cm.sendOk("你没有我们的会员卡..");
            } else if (beauty == 3){
                var color = (colors[selection] / 100) % 100 | 0;
                
                if (cm.haveItem(5152100 + color)){
                    cm.gainItem(5152100 + color, -1);
                    cm.setFace(colors[selection]);
                    cm.sendOk("好了!");
                } else {
                    cm.sendOk("你没有我们的会员卡..");
                }
            } else if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= regprice) {
                    cm.gainMeso(-regprice);
                    cm.gainItem(5152010, 1);
                    cm.sendOk("好了!");
                } else if (selection == 1 && cm.getMeso() >= vipprice) {
                    cm.gainMeso(-vipprice);
                    cm.gainItem(5152013, 1);
                    cm.sendOk("好了!");
                } else
                    cm.sendOk("你没有足够的金币!");
            }
        }
    }
}
