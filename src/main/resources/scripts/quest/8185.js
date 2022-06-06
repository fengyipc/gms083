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
/* 	Author: 		Blue
	Name:	 		加诺克斯
	Map(s): 		新叶城：市中心
	Description: 		探索-宠物进化2
*/

importPackage (Packages.net.server.channel.handlers);

var status = -1;

function end(mode, type, selection) {
	if (mode == -1) {
		qm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
                        if(qm.getMeso() < 10000) {
                            qm.sendOk("嘿！我需要10,000金币来完成你宠物的进化!");
                            qm.dispose();
                            return;
                        }
                    
			qm.sendNext("#e#b嘿，是你干的!#n#k \r\n#r哇噢!#k 现在我可以完成对你宠物的研究了!");
		} else if (status == 1) {
			if (mode == 0) {
				qm.sendOk("我懂了。。。你想做的时候就回来。我真的很兴奋.");
				qm.dispose();
			} else {
				qm.sendNextPrev("只是说，你的新龙的颜色是#e#r随机的#k#n！可能是#r绿色，可能是#b蓝色，可能是#r红色, #d或者是稀有的#k,黑色. \r\n\r\n#fUI/UIWindow.img/QuestIcon/5/0# \r\n\r\n如果你碰巧不喜欢你宠物的新颜色, 或者如果你想再次改变你的宠物的颜色, 你只需要#b再买一块进化之石,需要花费10,000金币#k。请准备好你的#b宠物#k然后与我对话。");
			}
		} else if (status == 2) {
			qm.sendYesNo("现在让我试着让你的宠物进化.准备好了吗？想看看你可爱的小龙变成成熟的深黑色，蓝色，平静的绿色，或火红的成年龙吗？如果你担心的话，它仍然会有同样的亲密度、等级、名字、丰满度、饥饿感和装备. \r\n\r\n#b#e你想继续还是想再考虑考虑?#k#n");
                } else if (status == 3) {
			qm.sendNextPrev("好吧，我们开始。。。! #r耶!#k");
		} else if (status == 4) {
			var rand = 1 + Math.floor(Math.random() * 10);
			var after = 0;
                        var i = 0;
                        
                        for(i = 0; i < 3; i++) {
                            if(qm.getPlayer().getPet(i) != null && qm.getPlayer().getPet(i).getItemId() == 5000029) {
                                var pet = qm.getPlayer().getPet(i);
                                break;
                            }
                        }
                        if(i == 3) {
                            qm.getPlayer().message("宠物无法进化.");
                            qm.dispose();
                            return;
                        }
                        
                        
			if (rand >= 1 && rand <= 3) {
				after = 5000030;
			} else if (rand >= 4 && rand <= 6) {
				after = 5000031;
			} else if (rand >= 7 && rand <= 9) {
				after = 5000032;
			} else if (rand == 10) {
				after = 5000033;
			} else {
				qm.sendOk("出现了意外，请再试一次.");
				qm.dispose();
                                return;
			}
                        
                        /* if (name.equals(MapleItemInformationProvider.getInstance().getName(id))) {
					name = MapleItemInformationProvider.getInstance().getName(after);
			} */
			
                        //qm.unequipPet(qm.getClient());
			qm.gainItem(5380000, -1);
                        qm.gainMeso(-10000);
                        qm.evolvePet(i, after);
			
                        //SpawnPetHandler.evolve(qm.getPlayer().getClient(), 5000029, after);
                        
                        qm.sendOk("#b太好了！它成功了!#k你的龙长得真不错呀!#r你可以在你的“商城道具”目录下找到你的新宠物.\r#k以前是 #b #i5000029##t5000029##k, 现在是\r a #b#i" + after + "##t" + after + "##k!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v"+after+"# #t"+after+"#");
		} else if (status == 5) {
                        qm.dispose();
                }
	}
}