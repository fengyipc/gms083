/* Author: aaroncsn <MapleSea Like>
	NPC Name: 		Karcasa
	Map(s): 		The Burning Sands: Tents of the Entertainers(260010600)
	Description: 		Warps to Victoria Island
*/
var towns = new Array(100000000,101000000,102000000,103000000,104000000);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0) {
		cm.sendNext("阿耶...你害怕高速或者高空吗? 你怀疑我的技术吗? 相信我, 这些都不是问题!");
		cm.dispose();
		return;
	}
	if (mode == 1)
		status++;
	else
		status--;
	if(status == 0){
		cm.sendNext("我不知道你怎么知道的，但你来对地方了！对于那个些在尼哈沙漠游荡、想家的人，我提供直飞金银岛的航班，直达！别担心那只会飞的船——它只掉了一两次！在那艘小船上长途飞行，你不觉得幽闭恐怖吗？");
	} else if(status == 1){
		cm.sendYesNo("请记住两件事。第一，这条线实际上是为了海外运输，所以我不能保证你到底要在哪个城镇着陆。第二，既然我把你安排在这架特别航班上，那就有点贵了。服务费是10000金币。有一班飞机就要起飞了。你对这趟直达航班感兴趣吗？");
	} else if(status == 2){
		cm.sendNext("好了，准备起飞~");
	} else if(status == 3){
		if(cm.getMeso() >= 10000){
			cm.gainMeso(-10000);
			cm.warp(towns[Math.floor(Math.random() * towns.length)]);
		} else{
			cm.sendNextPrev("现金短缺?我需要#b10,000#k金币才能让你上飞机.");
			cm.dispose();
			}
		}
	}
}