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
/* Denma the Owner
	Henesys VIP Eye Change.

        GMS-like revised by Ronan -- contents found thanks to Mitsune (GamerBewbs), Waltzing, AyumiLove
*/
var status = 0;
var beauty = 0;
var price = 1000000;
var mface_v = Array(20000, 20001, 20002,20003, 20004, 20005, 20006, 20007, 20008, 20012, 20014, 20015, 20022, 20028, 20031);
var fface_v = Array(21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21012, 21013, 21014, 21023, 21026);
var facenew = Array();

function pushIfItemExists(array, itemid) {
    if ((itemid = cm.getCosmeticItem(itemid)) != -1 && !cm.isCosmeticEquipped(itemid)) {
        array.push(itemid);
    }
}
function start() {
    status = -1;
    cm.openNpc(1052004,"高级脸型");
    //action(1, 0, 0);
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
            cm.sendSimple("你好!欢迎来到射手村整形医院! 要整形吗?只要你有#b#t5152001##k,你可以改变一下脸型~!\r\n#L2#我有#i5152001##t5152001##l");
        } else if (status == 1) {
            if (selection == 2) {
                facenew = Array(23000,23001,23002,23003,23004,23005,23006,23007,23008,23010,23011,23012,23013,23014,23015,23016,23017,23018,23019,23020,23021,23022,23023,23024,23025,23026,23027,23028,23029,23030,23031,23032,23033,23034,23035,23038,23039,23040,23041,23042,23043,23044,23053,23054,23055,23056,23057,23058,23059,23060,23061,23062,23063,23064,23065,23066,23067,23068,23069,23070,23071,23072,23073,23074,23075,23076,23077,23078,23079,23080,23081,23082,23083,23084,23085,23086,23087,23088,23089,23090,23091,23092,23093,23094,23095,23096,23097,23098,23099 );
               /* if (cm.getPlayer().getGender() == 0) {
                    for(var i = 0; i < mface_v.length; i++)
                        pushIfItemExists(facenew, mface_v[i] + cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100));
                }
                if (cm.getPlayer().getGender() == 1) {
                    for(var i = 0; i < fface_v.length; i++)
                        pushIfItemExists(facenew, fface_v[i] + cm.getPlayer().getFace()% 1000 - (cm.getPlayer().getFace()% 100));
                }*/
               
                cm.sendStyle("嗯... 我可以为你服务. 来试试吧?使用#b#t5152001##k,你可以选择你喜欢的脸型.选择你想要的造型吧.", facenew);
            }
        }
        else if (status == 2){
            cm.dispose();
            if (cm.haveItem(5152001) == true){
                cm.gainItem(5152001, -1);
                cm.setFace(facenew[selection]);
                cm.sendOk("好了!");
            } else
                cm.sendOk("没有会员卡的话我不嗯能够为你服务");
        }
    }
}
