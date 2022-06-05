 /* 
	NPC Name: 		Divine Bird
	Map(s): 		Erev
	Description: 		3rd job KoC Buff
*/
importPackage(Packages.constants.game);

function start() {
    if (cm.getPlayer().isCygnus() && GameConstants.getJobBranch(cm.getJob()) > 2) {
        cm.useItem(2022458);
        cm.sendOk("圣光之力护佑着你，我的勇士.请保护冒险岛世界....");
    } else {
        cm.sendOk("不要偷懒.你的每一丝力量都可以保护我们的世界....");
    }
    
    cm.dispose();
}