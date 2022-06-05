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
*/
/* Don Giovanni
	Kerning VIP Hair/Hair Color Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var hairprice = 1000000;
var haircolorprice = 1000000;
var mhair_v = Array(30040, 30130, 30780, 30850, 30860, 30920, 33040);
var fhair_v = Array(31090, 31140, 31330, 31440, 31760, 31880, 34050);
var hairnew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
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
        if (status == 0) {
            cm.sendSimple("你好!我是#b#p1052100##k,这家理发店的老板!你有#b#t5150003##k或者#b#t5151003##k吗,我来给你做个头发?看看想做些什么...\r\n#L1#理发:使用#i5150003##t5150003##l\r\n#L2#染发: 使用#i5151003##t5151003##l");
        } else if (status == 1) {
            if (selection == 1) {
                beauty = 1;
                hairnew = Array();
                if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mhair_v.length; i++)
                        pushIfItemExists(hairnew, mhair_v[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fhair_v.length; i++)
                        pushIfItemExists(hairnew, fhair_v[i] + parseInt(cm.getPlayer().getHair() % 10));
                }
                cm.sendStyle("如果你有#b#t5150003##k,你可以选择你想要的发型~.", hairnew);
            } else if (selection == 2) {
                beauty = 2;
                haircolor = Array();
                var current = parseInt(cm.getPlayer().getHair()/10)*10;
                for(var i = 0; i < 8; i++) {
                    pushIfItemExists(haircolor, current + i);
                }
                cm.sendStyle("如果你有#b#t5151003##k,你可以选择一个颜色.", haircolor);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (beauty == 1){
                if (cm.haveItem(5420003)){
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("好了!");
                } else if (cm.haveItem(5150003)){
                    cm.gainItem(5150003, -1);
                    cm.setHair(hairnew[selection]);
                    cm.sendOk("好了!");
                } else
                    cm.sendOk("你没有我们的会员卡...");
            }
            if (beauty == 2){
                if (cm.haveItem(5151003)){
                    cm.gainItem(5151003, -1);
                    cm.setHair(haircolor[selection]);
                    cm.sendOk("好了!");
                } else
                    cm.sendOk("你没有我们的会员卡...");
            }
            if (beauty == 0){
                if (selection == 0 && cm.getMeso() >= hairprice) {
                    cm.gainMeso(-hairprice);
                    cm.gainItem(5150003, 1);
                    cm.sendOk("好了!");
                } else if (selection == 1 && cm.getMeso() >= haircolorprice) {
                    cm.gainMeso(-haircolorprice);
                    cm.gainItem(5151003, 1);
                    cm.sendOk("好了!");
                } else
                    cm.sendOk("你没有会员卡!");
            }
        }
    }
}
