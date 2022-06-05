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
/* Author: Xterminator
	NPC Name: 		Pison
	Map(s): 		Victoria Road : Lith Harbor (104000000)
	Description: 		Florina Beach Tour Guide
 */
    var status = 0;

    function start() {
        cm.sendSimple("你听说过#b黄金海滩#k吗？, 这个地方在明珠港.我可以现在帮助你到那个地方，只需要#b10000金币#k, 或者如果你有一张#b#t4031134##k,那么就可以免费去.\r\n\r\n#L0##b 我愿意付10000金币.#l\r\n#L1# 我有#b#t4031134##k.#l\r\n#L2# 什么是#b#t4031134##k?#l");
    }
    
    function action(mode, type, selection) {
        status++;
        if (mode != 1)
            if((mode == 0 && type == 1) || mode == -1 || (mode == 0 && status == 1)){
                if(type == 1)
                    cm.sendNext("你一定有什么事要处理。你一定是旅行和打猎累了。去休息一下，如果你想改变主意，就来找我。");
                cm.dispose();
                return;
            } else
                status -= 2;
        if (selection == 0)
            status++;
        if(status == 1){
            if(selection == 1)
                cm.sendYesNo("所以你有#b#t4031134##k吗？你可以带着它去黄金海滩。好吧，但是你要知道你可能也会遇到一些怪物。好的，你现在想去黄金海滩吗?");
            else if (selection == 2)
                cm.sendNext("你一定对#b#t4031134##k很好奇。哈哈，只要你拥有你就可以免费前往黄金海滩。这是一件很少见的东西，我本来有一张，但不幸的是，几周前我弄丢了。");
        } else if (status == 2){
            if(type != 1 && selection != 0) {
                cm.sendNextPrev("我回来的时候没带，没带感觉很糟糕。希望有人把它捡起来放在安全的地方。不管怎样，这是我的故事，谁知道呢，你也许可以把它捡起来好好利用。");
                cm.dispose();
            } else{
                if (cm.getMeso() < 10000 && selection == 0)
                    cm.sendNext("你的钱不够。有很多方法可以筹集到一些钱，你知道，比如。。。卖你的装备。。。打败怪物。。。完成任务。。。你知道我在说什么.");
                else if(!cm.haveItem(4031134) && selection != 0){
                    cm.sendNext("你确定你有#b#t4031134##k吗？请再核对一下。");
                }else{
                    if(selection == 0)
                        cm.gainMeso(-10000);
                    cm.getPlayer().saveLocation("FLORINA");
                    cm.warp(110000000, "st00");
                }
                cm.dispose();
            }
        }
    }