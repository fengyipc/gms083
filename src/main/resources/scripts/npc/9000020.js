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
status = -1;


var travelFrom = [777777777, 541000000];
var travelFee = [3000, 10000,30000];

var travelMap = [800000000, 550000000,702000000];
var travelPlace = ["古代神社", "吉隆大都市","嵩山镇"];
var travelPlaceShort = ["古代神社", "吉隆大都市","松山镇"];
var travelPlaceCountry = ["日本", "马来西亚","东方神州"];
var travelAgent = ["我", "#r#p9201135##k"];

var travelType;
var travelStatus;

function start() {
    travelStatus = getTravelingStatus(cm.getPlayer().getMapId());
    action(1, 0, 0);
}

function getTravelingStatus(mapid) {
    for (var i = 0; i < travelMap.length; i++) {
        if (mapid == travelMap[i]) {
            return i;
        }
    }

    return -1;
}

function getTravelType(mapid) {
    for (var i = 0; i < travelFrom.length; i++) {
        if (mapid == travelFrom[i]) {
            return i;
        }
    }

    return 0;
}

function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        if (mode == 0 && status == 4)
            status -= 2;
        else {
            cm.dispose();
            return;
        }
    }

    if (travelStatus != -1) {
        if (status == 0)
            cm.sendSimple("旅行怎么样?满意吗?#b\r\n#L0#是的,我要返回#m" + cm.getPlayer().peekSavedLocation("WORLDTOUR") + "#\r\n#L1#不,我还想再逛逛.");
        else if (status == 1) {
            if (selection == 0) {
                cm.sendNext("好的.我会把你带回之前来的地方!");
            } else if (selection == 1) {
                cm.sendOk("好的.");
                cm.dispose();
            }
        } else if (status == 2) {
            var map = cm.getPlayer().getSavedLocation("WORLDTOUR");
            if (map == -1)
                map = 104000000;
            cm.warp(map);
            cm.dispose();
        }
    } else {
        if (status == 0) {
            travelType = getTravelType(cm.getPlayer().getMapId());
            cm.sendNext("如果你觉得生活变得无趣了,来次海外旅行怎么样?没什么比去一个新的地方更好的东西了!你应该出去玩玩了.我们给你提供世界旅行,不用担心费用,很便宜!");
        } else if (status == 1) {
            var text = "我们现在可供你选择以下目的地:";
            for (var i = 0; i < travelMap.length; i++) {
                text += "\r\n#L" + i + "#" + (i + 1) + " . #b#m" + travelMap[i] + "##k(" + travelFee[i] + "金币)#l";
            }
            cm.sendSimple(text);
            // cm.sendSimple("我们现在可供你选择以下目的地: #b" + travelPlace[travelType] + "#k. " + travelAgent[travelType] + "将会作为你的旅游向导.放心,目的地的数量会越来越多.现在,想要到" + travelPlaceShort[travelType] + "了解更多吗?#b\r\n#L0#是的,带我去" + travelPlaceShort[travelType] + " (" + travelPlaceCountry[travelType] + ")");
        } else if (status == 2) {
            sel = selection;
            cm.sendNext("你想去#b#m" + travelMap[selection] + "##k吗? ");
        } else if (status == 3) {
            if (cm.getMeso() < travelFee[sel]) {
                cm.sendNext("你的金币不够这次旅行.");
                cm.dispose();
            } else {
                cm.gainMeso(-travelFee[sel]);
                cm.getPlayer().saveLocation("WORLDTOUR");
                java.lang.System.out.println(travelMap[sel]+""+sel);
                cm.warp(travelMap[sel], 0);
                cm.dispose();
            }
        }
    }
}
var sel;