/**
-- Odin JavaScript --------------------------------------------------------------------------------
    Hak - Cabin <To Mu Lung>(200000141) / Mu Lung Temple(250000100) / Herb Town(251000000)
-- By ---------------------------------------------------------------------------------------------
    Information
-- Version Info -----------------------------------------------------------------------------------
    1.1 - Text and statement fix [Information]
    1.0 - First Version by Information
---------------------------------------------------------------------------------------------------
**/

var menu = new Array("武陵","天空之城","百草堂","武陵");
var cost = new Array(1500,1500,500,1500);
var hak;
var slct;
var display = "";
var btwmsg;
var method;


function start() {
    status = -1;
    hak = cm.getEventManager("Hak");
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if(mode == -1) {
        cm.dispose();
        return;
    } else {
        if(mode == 0 && status == 0) {
            cm.dispose();
            return;
        } else if(mode == 0) {
            cm.sendNext("好吧.什么时候改变主意了跟我说.");
            cm.dispose();
            return;
        }
        status++;
        if (status == 0) {
            for(var i=0; i < menu.length; i++) {
                if(cm.getPlayer().getMapId() == 200000141 && i < 1) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" mesos)#k";
                } else if(cm.getPlayer().getMapId() == 250000100 && i > 0 && i < 3) {
                    display += "\r\n#L"+i+"##b"+menu[i]+"("+cost[i]+" mesos)#k";
                }
            }
            if(cm.getPlayer().getMapId() == 200000141 || cm.getPlayer().getMapId() == 251000000) {
                btwmsg = "#b天空之城#k去#b武陵#k";
            } else if(cm.getPlayer().getMapId() == 250000100) {
                btwmsg = "#b武陵#k区#b天空之城#k";
            }
            if(cm.getPlayer().getMapId() == 251000000) {
                cm.sendYesNo("你好.最近过的怎么样?我给像你一样在#b"+menu[3]+"#k的旅行者提供交通运输,你有兴趣吗?你要抓紧我的后背.你付我#b"+cost[2]+"金币#k,我会带你去武陵#k.");
                status++;
            } else if(cm.getPlayer().getMapId() == 250000100) {
                cm.sendSimple("你好.最近过的怎么样?我给像你一样的旅行者提供交通运输,你有兴趣吗? 你想去哪里.\r\n"+display);
            } else {
                cm.sendSimple("你好.最近过的怎么样?我给像你一样的旅行者提供交通运输,你有兴趣吗?你想去哪里.\r\n"+display);
            }
        } else if(status == 1) {
            slct = selection;
            cm.sendYesNo("你想去#b"+menu[selection]+"#k吗?如果你有#b"+cost[selection]+" 金币#k,我现在就带你过去.");

        } else if(status == 2) {
            if(slct == 2) {
                if(cm.getMeso() < cost[2]) {
                    cm.sendNext("你的金币够吗?");
                    cm.dispose();
                } else {
                    cm.gainMeso(-cost[2]);
                    cm.warp(251000000, 0);
                    cm.dispose();
                }
            }
            
            else {
                if(cm.getMeso() < cost[slct]) {
                        cm.sendNext("你的金币够吗?");
                        cm.dispose();
                } else {
                        if(cm.getPlayer().getMapId() == 251000000) {
                            cm.gainMeso(-cost[2]);
                            cm.warp(250000100, 0);
                            cm.dispose();
                        } else {
                            var em = cm.getEventManager("Hak");
                            if (!em.startInstance(cm.getPlayer())) {
                                cm.sendOk("啊哈。。。我现在正在接受太多请求。。。请稍后再试。");
                                cm.dispose();
                                return;
                            }
                            
                            cm.gainMeso(-cost[slct]);
                            cm.dispose();
                        }
                }
            }
        }
    }
}  