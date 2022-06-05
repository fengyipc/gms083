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
/* Yulete
	Traces of Yulete (926100500)
	Talking
 */

var status;

function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
        
                if (status == 0) {
                        cm.sendSimple("打败了...所以，犹泰的遗产就这样结束了，哦，这是多么悲哀。。。希望你们现在开心，因为我将在黑暗的地窖里度过我腐烂的日子。我所做的一切都是为了玛加提亚！！\r\n#Ll#嘿，伙计，过来，振作起来！没有多少损失不能在这里解决。玛加提亚制定了这些禁止性的法律，以保护其人们不受毁灭性的伤害，如果一个更强大的国家落入坏人之手，它就会这样做。对你来说，这不是终点，接受社会的改造，一切都会好起来的!#l");
                } else if (status == 1){
                        cm.sendNext("...你们原谅我做了这么多吗？好吧，我想我被那种可以被发现的伟大力量的来源蒙蔽了双眼，也许他们说的对，一个人不能简单地理解这些力量的使用，而不会一路腐蚀自己。。。我非常抱歉，为了补偿每一个人，我愿意在炼金术的进步上尽我所能再次帮助村子。谢谢您.");
                } else {
                        if(!cm.isQuestCompleted(7770)) cm.completeQuest(7770);
                        
                        cm.warp(926100600);
                        cm.dispose();
                }
        }
}