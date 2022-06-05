/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/**
 * @author: Ronan
 * @npc: Abdula
 * @map: Multiple towns on Maplestory
 * @func: Job Skill / Mastery Book Drop Announcer
*/

var status;
var selected = 0;
var num;
function start() {
    status = -1;
    selected = 0;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && type > 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;

        if (status == 0) {
            var greeting = "你好,我是中介商人#p9209000#!#b\r\n ";
            //greeting += "#L0#抵用券购买点券#l\r\n";
            //greeting += "#L1#点券购买抵用券#l\r\n";
            greeting += "#L2#购买#z4260009##l\r\n";
            greeting += "#L3#购买#z4260011##l\r\n";
            cm.sendSimple(greeting);
        } else if (status == 1) {
            selected = selection;
            var text;
            if (selection == 0) {
                text = "每20点抵用券可以交换1点券,需要多少点券?";
            } else if (selection == 1) {
                text = "每1点券可以交换8抵用券,需要使用多少点券?";
            } else if (selection == 2) {
                text = "#d#z4260009##b的价格是200点券,要买多少?";
            } else if (selection == 3) {
                text = "#d#z4260011##b的价格是300点券,要买多少?";
            }
            cm.sendGetNumber(text, 1, 1, 2000000);
        } else if (status == 2) {
            java.lang.System.out.println(selection+"");
            num = selection;
            var text;
            if (selected == 0) {
                text = "确定要使用" + (20 * num) + "抵用券交换" + num + "点券吗?";
            } else if (selected == 1) {
                text = "确定要使用" + num + "点券交换" + (num * 8) + "抵用券吗?";
            } else if (selected == 2) {
                text = "确定要使用" + (200 * num) + "点券购买" + num + "个#z4260009#吗?";
            } else if(selected == 3){
                text = "确定要使用" + (300 * num) + "点券购买" + num + "张#z4260011#吗?";
            }
            cm.sendYesNo(text);
        } else {
            if (selected == 0) {
                if (cm.getPlayer().getCashShop().getCash(2) >= 20 * num) {
                    cm.getPlayer().getCashShop().gainCash(2, -20 * num);
                    cm.getPlayer().getCashShop().gainCash(1, num);
                    cm.sendOk("交易成功,请到商城确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的抵用券");
                }
            } else if (selected == 1) {
                if (cm.getPlayer().getCashShop().getCash(1) >= num) {
                    cm.getPlayer().getCashShop().gainCash(1, -num);
                    cm.getPlayer().getCashShop().gainCash(2, num * 8);
                    cm.sendOk("交易成功,请到商城确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            } else if (selected == 2) {
                if (cm.getPlayer().getCashShop().getCash(1) >= num*200) {
                    cm.getPlayer().getCashShop().gainCash(1, -num*200);
                    cm.gainItem(4260009,num);
                    cm.sendOk("交易成功,请到背包确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            } else {
                if (cm.getPlayer().getCashShop().getCash(1) >= num*300) {
                    cm.getPlayer().getCashShop().gainCash(1, -num*300);
                    cm.gainItem(4260011,num);
                    cm.sendOk("交易成功,请到背包确认");
                } else {
                    cm.sendOk("交易失败,你没有足够的点券");
                }
            }
            cm.dispose();
        }
    }
}
