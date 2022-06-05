var ticket = new Array(4031047, 4031074, 4031331, 4031576);
var cost = new Array(5000, 6000, 30000, 6000);
var mapNames = new Array("金银岛-魔法密林", "玩具城", "神木村", "阿里安特");
var mapName2 = new Array("金银岛-魔法密林", "玩具城", "神木村", "阿里安特");
var select;
var status = 0;

function start() {
    var where = "你好,我是天空之城旅行售票员. 你要去什么地方吗?";
    for (var i = 0; i < ticket.length; i++)
        where += "\r\n#L" + i + "##b" + mapNames[i] + "#k#l";
    cm.sendSimple(where);
}

function action(mode, type, selection) {
    if(mode < 1) {
        cm.dispose();
    } else {
        status++;
        if (status == 1) {
            select = selection;
            cm.sendYesNo("去往 " + mapName2[select] + "的路线每" + (select == 0 ? 15 : 10) + "分钟一班,费用是#b"+cost[select]+"金币#k.要购买#b#t"+ticket[select]+"##k吗?");
        } else if(status == 2) {
            if (cm.getMeso() < cost[select] || !cm.canHold(ticket[select]))
                cm.sendOk("你的金币不够,或者背包装不下了.");
            else {
                cm.gainMeso(-cost[select]);
                cm.gainItem(ticket[select],1);
            }
            cm.dispose();
        }
    }
}
