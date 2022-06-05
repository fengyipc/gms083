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
/* Delli
	Looking for Delli 3 (925010200)
	Hypnotize skill quest NPC.
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
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;
        
                if (status == 0) {
                        if (cm.getMapId() != 925010400) {
                                em = cm.getEventManager("DelliBattle");
                                if(em == null) {
                                        cm.sendOk("拯救粉红天书任务有问题.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }

                                cm.sendSimple("#e#b<组队任务:拯救粉红天书>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n啊, #r#p1095000##k 让你过来的吗? 她在担心我? ... 听到这个消息我非常抱歉，但我现在还不能回去，黑魔法师的手下在这边使坏,我需要过去帮忙 ... 你愿意帮我吗?#b\r\n#L0#我是来帮忙的.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "启用") + "队伍搜索.\r\n#L2#我想知道一些细节.");
                        } else {
                                cm.sendYesNo("任务完成了,谢谢你帮忙!我现在带你去#b#m120000104##k,准备好了吗?");
                        }
                } else if (status == 1) {
                        if (cm.getMapId() != 925010400) {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("你必须组队参加");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("让队长来和我对话开始任务.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        if(!em.startInstance(cm.getParty(), cm.getPlayer().getMap(), 1)) {
                                                                cm.sendOk("其他队伍正在挑战了,请等他们出来或者换其他频道看看.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("你队伍的人数或者有人等级不在要求范围之内.");
                                                }

                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你当前的队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队任务:拯救粉红天书>#k#n\r\n 埋伏正在进行！为了保护我的任务，我必须在6分钟内完成。");
                                        cm.dispose();
                                }
                        } else {
                                cm.warp(120000104);
                                cm.dispose();
                        }
                }
        }
}