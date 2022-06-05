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
/* NPC: Donation Box (9000041)
	Victoria Road : Henesys
	
	NPC Bazaar:
        * @author Ronan Lana
*/

var 武器35 = Array(1302020, 1382009, 1462014, 1472030, 1482020, 1492020);
var 武器43 = Array(1302030, 1332025, 1382012, 1412011, 1422014, 1432012, 1442024, 1452022, 1462019, 1472032, 1482021, 1492021);
var 武器64 = Array(1302064, 1312032, 1322054, 1332055, 1332056, 1372034, 1382039, 1402039, 1412027, 1422029, 1432040, 1442051, 1452045, 1462040, 1472055, 1482022, 1492022);
var 抽奖 = Array(4005000, 4005001, 4005002, 4005003, 1002419, 4005004, 4021000, 4021001, 4021002, 4021003, 4021004, 4021005, 4021006, 4021007, 4021008, 2002023, 2022121, 2022195, 2022439, 2022440, 2022441, 2022308, 2022307, 2002028, 2002029, 2022306, 2022305);
var 职业盾 = Array(1092045, 1092046, 1092047);
var status;
var sel1;
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    status++;
    if (mode != 1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        var text = "#b你好,打猎时候有收集到#r#z4001126##b吗?我正在收集它们,如果你给我枫叶,我可以奖励你的\r\n";
        text += "#L0#使用枫叶兑换35级枫叶武器#l\r\n";
        text += "#L1#使用枫叶兑换43级枫叶武器#l\r\n";
        text += "#L2#使用枫叶兑换64级枫叶武器#l\r\n";
        text += "#L3#使用枫叶和#z1092030#兑换64级枫叶盾#l\r\n";
        text += "#L4#使用枫叶抽奖#l\r\n";
        cm.sendSimple(text);
    } else if (status == 1) {
        sel1 = selection;
        var text;
        if (selection == 0) {
            text = "#b兑换35级枫叶武器需要#r33#z4001126##b,看看你需要什么吧\r\n";
            for (var i = 0; i < 武器35.length; i++) {
                text += "#L" + 武器35[i] + "#兑换#z" + 武器35[i] + "#\r\n";
            }
            cm.sendSimple(text);
        } else if (selection == 1) {
            text = "#b兑换43级枫叶武器需要#r66#z4001126##b,看看你需要什么吧\r\n";
            for (var i = 0; i < 武器43.length; i++) {
                text += "#L" + 武器43[i] + "#兑换#z" + 武器43[i] + "#\r\n";
            }
            cm.sendSimple(text);
        } else if (selection == 2) {
            text = "#b兑换64级枫叶武器需要#r99#z4001126##b,看看你需要什么吧\r\n";
            for (var i = 0; i < 武器64.length; i++) {
                text += "#L" + 武器64[i] + "#兑换#z" + 武器64[i] + "#\r\n";
            }
            cm.sendSimple(text);
        } else if (selection == 3) {
            text = "#b兑换64级枫叶盾需要#r50#z4001126##b和一个#z1092030#,看看你需要什么吧\r\n";
            for (var i = 0; i < 职业盾.length; i++) {
                text += "#L" + 职业盾[i] + "#兑换#z" + 职业盾[i] + "#\r\n";
            }
            cm.sendSimple(text);
        } else {
            text = "#b要用#z4001126#抽奖吗?需要花费10#z4001126#,可能会获得这些奖励:\r\n";
            for (var i = 0; i < 抽奖.length; i++) {
                text += "#i" + 抽奖[i] + "#";
            }
            text += "抽不中还有金币奖励哦,确定要参与抽奖吗?";
            cm.sendYesNo(text);
        }
    } else if (status == 2) {
        var fee;
        if (sel1 == 0)
            fee = 33;
        else if (sel1 == 1)
            fee == 66;
        else if (sel1 == 2)
            fee = 99;
        else if (sel1 == 3)
            fee = 50;
        else
            fee = 10;
        if (cm.haveItem(4001126, fee)) {
            if (sel1 < 3) {
                if (cm.canHold(selection)) {
                    var item = cm.gainItem(selection, 1, true, false);
                    cm.gainItem(4001126, -fee);
                    cm.sendOk("#z" + selection + "#已经发送到您的背包,请注意查收");
                    cm.getPlayer().全服道具喇叭(cm.getPlayer().getName() + " : 恭喜玩家用枫叶成功兑换了", false, item);
                    cm.dispose();
                } else {
                    cm.sendOk("背包空间不足,兑换失败");
                    cm.dispose();
                }
            } else if (sel1 == 3) {
                if (cm.haveItem(1092030, false)) {
                    if (cm.canHold(selection)) {
                        var item = cm.gainItem(selection, 1, true, false);
                        cm.gainItem(4001126, -fee);
                        cm.gainItem(1092030, -1);
                        cm.sendOk("#z" + selection + "#已经发送到您的背包,请注意查收");
                        cm.getPlayer().全服道具喇叭(cm.getPlayer().getName() + " : 恭喜玩家用枫叶成功兑换了", false, item);
                        cm.dispose();
                    } else {
                        cm.sendOk("背包空间不足,兑换失败");
                        cm.dispose();
                    }
                } else {
                    cm.sendOk("你背包没有#z1092030#,无法完成兑换");
                    cm.dispose();
                }
            } else {
                if (cm.haveItem(4001126, fee)) {
                    var random = Math.floor(Math.random() * 抽奖.length * 5);
                    if (random < 抽奖.length) {
                        if (cm.canHold(抽奖[random])) {
                            var item = cm.gainItem(抽奖[random], 1, true, false);
                            cm.gainItem(4001126, -fee);
                            cm.sendOk("恭喜,这次抽中了#i" + 抽奖[random] + "#");
                            cm.getPlayer().全服道具喇叭(cm.getPlayer().getName() + " : 枫叶抽奖获得了", false, item);
                            status = -1;
                        } else {
                            cm.sendOk("背包空间不足,兑换失败");
                            cm.dispose();
                        }
                    } else {
                        cm.gainItem(4001126, -fee);
                        var meso = Math.floor(Math.random() * 200000);
                        cm.gainMeso(meso);
                        cm.sendOk("抱歉,这次什么也没抽到," + meso + "金币作为补偿");
                        status = -1;
                    }
                } else {
                    cm.sendOk("你没有足够的枫叶进行抽奖");
                    cm.dispose();
                }
            }
        } else {
            cm.sendOk("你没有足够的枫叶,在冒险岛里任何怪物都有可能掉落哟");
            cm.dispose();
        }
    }
}