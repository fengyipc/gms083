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
//First version thanks to Moogra

/**
 * @author: Ronan
 * @npc: Flo
 * @map: Ludibrium - Path of Time (220050300)
 * @func: Elemental Thanatos room
*/

var status = 0;
var em = null;

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
                        if(!(cm.isQuestCompleted(6316) && (cm.isQuestStarted(6225) || cm.isQuestStarted(6315)))) {
                                cm.sendOk("你好像不需要去找黑甲凶灵啊.");
                                cm.dispose();
                                return;
                        }
                    
                        em = cm.getEventManager("ElementalBattle");
                        if(em == null) {
                                cm.sendOk("脚本错误.");
                                cm.dispose();
                                return;
                        } else if(cm.isUsingOldPqNpcStyle()) {
                                action(1, 0, 0);
                                return;
                        }
                    
                        cm.sendSimple("#e#b<组队任务:黑甲凶灵>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你在寻找黑甲凶灵的踪迹,是吗?如果你与一个和你的魔法完全相反的法师组队,你们就可以去抵抗黑甲凶灵.作为队长,准备好了请跟我说.#b\r\n#L0#我想开始任务.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "组队搜索.\r\n#L2#我想知道一些细节.");
                } else if (status == 1) {
                        if (selection == 0) {
                                if (cm.getParty() == null) {
                                        cm.sendOk("你必须组队参加这个任务.");
                                        cm.dispose();
                                } else if(!cm.isLeader()) {
                                        cm.sendOk("你不是队长.");
                                        cm.dispose();
                                } else {
                                        var eli = em.getEligibleParty(cm.getParty());
                                        if(eli.size() > 0) {
                                                if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                        cm.sendOk("其他队伍正在挑战了,等他们出来或者换个频道试试.");
                                                }
                                        }
                                        else {
                                                cm.sendOk("你的队伍不能参加,人数不足或者有人的等级不够.");
                                        }
                                        
                                        cm.dispose();
                                }
                        } else if (selection == 1) {
                                var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                cm.sendOk("你当前的队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.想改变的话跟我说.");
                                cm.dispose();
                        } else {
                                cm.sendOk("#e#b<组队任务:黑甲凶灵>#k#n\r\n 你需要和一个与你使用的魔法相反的法师组队参加.");
                                cm.dispose();
                        }
                }
        }
}
