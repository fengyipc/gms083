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
 * @npc: Agent Meow
 * @map: 970030000 - Hidden Street - Exclusive Training Center
 * @func: Boss Rush PQ
*/

var status = 0;
var state;
var em = null;

function onRestingSpot() {
    return cm.getMapId() >= 970030001 && cm.getMapId() <= 970030010;
}

function isFinalBossDone() {
    return cm.getMapId() >= 970032700 && cm.getMapId() < 970032800 && cm.getMap().getMonsters().isEmpty();
}

function detectTeamLobby(team) {
    var midLevel = 0;
    
    for(var i = 0; i < team.size(); i++) {
        var player = team.get(i);
        midLevel += player.getLevel();
    }
    midLevel = Math.floor(midLevel / team.size());
    
    var lobby;  // teams low level can be allocated at higher leveled lobbys
    if(midLevel <= 20) lobby = 0;
    else if(midLevel <= 40) lobby = 1;
    else if(midLevel <= 60) lobby = 2;
    else if(midLevel <= 80) lobby = 3;
    else if(midLevel <= 90) lobby = 4;
    else if(midLevel <= 100) lobby = 5;
    else if(midLevel <= 110) lobby = 6;
    else lobby = 7;
        
    return lobby;
}

function start() {
	status = -1;
        state = (cm.getMapId() >= 970030001 && cm.getMapId() <= 970042711) ? (!onRestingSpot() ? (isFinalBossDone() ? 3 : 1) : 2) : 0;
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
                        if(state == 3) {
                                if(cm.getEventInstance().getProperty("clear") == null) {
                                        cm.getEventInstance().clearPQ();
                                        cm.getEventInstance().setProperty("clear", "true");
                                }
                            
                                if(cm.isEventLeader()) {
                                        cm.sendOk("你们的队伍完成了如此惊人的壮举,#b你打败了所有的BOSS#k,恭喜你们!现在我将送你们出去,之后会发放你们应得的奖励...");
                                }
                                else {
                                        cm.sendOk("恭喜你们#b击败了所有BOSS#k!你现在将获得一个与你在这里的表现相匹配的奖品.");
                                }
                        }
                        else if(state == 2) {
                                if(cm.isEventLeader()) {
                                        if(cm.getPlayer().getEventInstance().isEventTeamTogether()) {
                                                cm.sendYesNo("队伍准备好去下一关了吗?如果想结束挑战请进入前面的传送门.");
                                        }
                                        else {
                                                cm.sendOk("请等待您的队伍重组后再继续.");
                                                cm.dispose();
                                                return;
                                        }
                                }
                                else {
                                        cm.sendOk("请等待队长开始继续挑战.如果你现在就想离开,走进前面的传送门就可以出去了,你会获得当前的阶段奖励.");
                                        cm.dispose();
                                        return;
                                }
                        } else if(state == 1) {
                                cm.sendYesNo("真要放弃了吗?");
                        }
                        else {
                                em = cm.getEventManager("BossRushPQ");
                                if(em == null) {
                                        cm.sendOk("副本出错了.");
                                        cm.dispose();
                                        return;
                                } else if(cm.isUsingOldPqNpcStyle()) {
                                        action(1, 0, 0);
                                        return;
                                }
                                
                                cm.sendSimple("#e#b<组队挑战:刷Boss>\r\n#k#n" + em.getProperty("party") + "\r\n\r\n你愿意和队员们一起完成这次探险，还是勇敢地一个人前往？让#b队长#k与我对话或者自己组建一个队伍.#b\r\n#L0#我想尝试组队挑战.\r\n#L1#我想" + (cm.getPlayer().isRecvPartySearchInviteEnabled() ? "关闭" : "开启") + "队伍搜索.\r\n#L2#我想知道详情.");
                        }
                } else if (status == 1) {
                        if(state == 3) {
                                if(!cm.getPlayer().getEventInstance().giveEventReward(cm.getPlayer(), 6)) {
                                        cm.sendOk("请给背包每个栏位都留下至少一个空格.");
                                        cm.dispose();
                                        return;
                                }
                                
                                cm.warp(970030000);
                                cm.dispose();
                        } else if(state == 2) {
                                var restSpot = ((cm.getMapId() - 1) % 5) + 1;
                                cm.getPlayer().getEventInstance().restartEventTimer(restSpot * 4 * 60000);  // adds (restspot number * 4) minutes
                                cm.getPlayer().getEventInstance().warpEventTeam(970030100 + cm.getEventInstance().getIntProperty("lobby") + (500 * restSpot));
                                
                                cm.dispose();
                        } else if(state == 1) {
                                cm.warp(970030000);
                                cm.dispose();
                        }
                        else {
                                if (selection == 0) {
                                        if (cm.getParty() == null) {
                                                cm.sendOk("你只有组队才可以挑战.");
                                                cm.dispose();
                                        } else if(!cm.isLeader()) {
                                                cm.sendOk("只有队长才有资格发起挑战.");
                                                cm.dispose();
                                        } else {
                                                var eli = em.getEligibleParty(cm.getParty());
                                                if(eli.size() > 0) {
                                                        var lobby = detectTeamLobby(eli), i;
                                                        for(i = lobby; i < 8; i++) {
                                                                if(em.startInstance(i, cm.getParty(), cm.getPlayer().getMap(), 1)) break;
                                                        }
                                                        
                                                        if(i == 8) {
                                                                cm.sendOk("其他队伍正在进行挑战,请等待他们结束或者去其他频道看看.");
                                                        }
                                                }
                                                else {
                                                        cm.sendOk("由于你的队伍人数不足,或者有成员的等级或者挑战次数不满足条件,你无法开始挑战.");
                                                }
                                                
                                                cm.dispose();
                                        }
                                } else if (selection == 1) {
                                        var psState = cm.getPlayer().toggleRecvPartySearchInvite();
                                        cm.sendOk("你当前的队伍搜索状态: #b" + (psState ? "开启" : "关闭") + "#k.");
                                        cm.dispose();
                                } else {
                                        cm.sendOk("#e#b<组队挑战:刷Boss>#k#n\r\n你猜我翻不翻.");
                                        cm.dispose();
                                }
                        }
                }
        }
}