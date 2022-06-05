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
/* Oasis near Ariant Castle
 */

importPackage(Packages.client);

function isTigunMorphed(ch) {
        return ch.getBuffSource(MapleBuffStat.MORPH) == 2210005;
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0 && mode == 1) {
                if(cm.isQuestStarted(3900) && cm.getQuestProgressInt(3900) != 5) {
                        cm.sendOk("#b(你喝了绿洲里的水，感到精神振奋.)", 2);
                        cm.setQuestProgress(3900, 5);
                } else if(cm.isQuestCompleted(3938)) {
                        if(cm.canHold(2210005)) {
                                if(!cm.haveItem(2210005) && !isTigunMorphed(cm.getPlayer())) {
                                        cm.gainItem(2210005, 1);
                                        cm.sendOk("你发现了一缕头发(可能是缇贡的)漂浮在水面上,你抓了起来. 想到#bJano#k上次怎么制作的,你制作了新的#t2210005#", 2);
                                }
                        } else {
                                cm.sendOk("你没有可用的消耗栏空间.", 2);
                        }
                } else if(cm.isQuestStarted(3934) || (cm.isQuestCompleted(3934) && !cm.isQuestCompleted(3935))) {
                        if(cm.canHold(2210005)) {
                                if(!cm.haveItem(2210005) && !isTigunMorphed(cm.getPlayer())) {
                                        cm.gainItem(2210005, 1);
                                        cm.sendOk("你在水面上找到了一个奇怪的瓶子.它看着像某个守卫的模样,也许它可以让你自由进出这里.", 2);
                                }
                        } else {
                                cm.sendOk("你在水面上找到了一个奇怪的瓶子.但是消耗栏满了,你没法拿起来.", 2);
                        }
                }
                
                cm.dispose();
        }
    }
}