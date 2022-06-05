var status = -1;
var sel;

var destinations = new Array("魔法密林", "玩具城", "神木村", "武陵", "阿里安特", "圣地");
var boatType = new Array("船", "列车", "鸟", "鹤", "精灵", "船");

function start() {
	var message = "天空之城可以去往很多地方. 你需要选择以要去的目的地.你想去哪里?\r\n";
	for(var i = 0; i < destinations.length; i++){
		message += "\r\n#L" + i + "##b去往" +destinations[i]+ ".#l";
	}
	cm.sendSimple(message);
}

function action(mode, type, selection) {
    if (mode < 1) {
        cm.dispose();
        return;
    }
    status++;
    if (status == 0){
        sel = selection;
        cm.sendNext("好#h #,我会送你去#b#m" + (200000110 + (sel * 10)) + "##k.");
    }else if (status == 1) {
        cm.warp(200000110 + (sel * 10), "west00");
        cm.dispose();
    }
}