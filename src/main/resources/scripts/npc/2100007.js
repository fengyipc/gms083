/* Author: aaroncsn <MapleSea Like, Incomplete, Needs skin id>
	NPC Name: 		Laila
	Map(s): 		The Burning Road: Ariant(2600000000)
	Description: 	Skin Care Specialist
*/

var status = 0;
var skin = Array(0, 1, 2, 3, 4);

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode < 1) {  // disposing issue with stylishs found thanks to Vcoc
		cm.dispose();
	} else {
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {
			cm.sendNext("欢迎来到阿里安特皮肤护理中心.这里可是给阿里阿特王妃护理皮肤的护肤中心. 如果你有#b#z5153007##i5153007##k, 剩下的就交给我们了.今天就来做个皮肤护理怎么样?");
		} else if (status == 1) {
			cm.sendStyle("使用我们这台先进的机器,你可以提前知道你护肤之后的效果.你想要什么样的效果呢...", skin);
		} else if (status == 2) {
			cm.dispose();
			if (cm.haveItem(5153007) == true) {
				cm.gainItem(5153007, -1);
				cm.setSkin(skin[selection]);
				cm.sendOk("好了,看看喜不喜欢!");
			} else {
				cm.sendNext("哼,我想你没有我们的会员卡,你可以去商城购买");
			}
		}
	}
}