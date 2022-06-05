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
/* Dalair
    Medal NPC.

        NPC Equipment Merger:
        * @author Ronan Lana
 */

        importPackage(Packages.client.processor.action);
        importPackage(Packages.config);
        
        var status;
        var mergeFee = 5;
        var name;
        
        function start() {
            status = -1;
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
                    /* if (!Packages.config.YamlConfig.config.server.USE_ENABLE_CUSTOM_NPC_SCRIPT) {
                         cm.sendOk("奖牌系统当前不可用...");
                         cm.dispose();
                         return;
                     }*/
        
                    var levelLimit = !cm.getPlayer().isCygnus() ? 160 : 110;
                    var selStr = "奖牌系统当前不可用...  因此，我提供#b装备合并#k服务! ";
        
                    if (!YamlConfig.config.server.USE_STARTER_MERGE && (cm.getPlayer().getLevel() < levelLimit || MakerProcessor.getMakerSkillLevel(cm.getPlayer()) < 3)) {
                        selStr += "然而, 你必须拥有#r3级锻造#k并且#r160级(骑士团110级)#k以上,支付#r" + cm.numberWithCommas(mergeFee) + "抵用券#k才可以使用这个服务.";
                        cm.sendOk(selStr);
                        cm.dispose();
                    } else if (cm.getPlayer().getCashShop().getCash(1) < mergeFee) {
                        selStr += "你没有#r" + cm.numberWithCommas(mergeFee) + "点券#k.";
                        cm.sendOk(selStr);
                        cm.dispose();
                    } else {
                        selStr += "用了#r" + cm.numberWithCommas(mergeFee) + "#点券,将你的背包中不需要的装备合成到当前装备中，以获得属性提升!";
                        cm.sendNext(selStr);
                    }
                } else if (status == 1) {
                    selStr = "#r警告#b:确保在选定要合并的道具之后，在背包中准备好用来合并的道具。#k 所有被选择的道具都会被合并.\r\n\r\n请注意，从合并中获得奖金的设备将无法进行交易，已获得合并奖励的装备不能用于合并.\r\n\r\n";
                    cm.sendGetText(selStr);
                } else if (status == 2) {
                    name = cm.getText();
        
                    if (cm.getPlayer().mergeAllItemsFromName(name)) {
                        //cm.gainMeso(-mergeFee);
                        cm.getPlayer().gainMp(-mergeFee);
                        cm.sendOk("合并完成! 谢谢使用我的服务.");
                    } else {
                        cm.sendOk("你的装备栏里面没有#b'" + name + "'#k!");
                    }
        
                    cm.dispose();
                }
            }
        }
        