/*
 * Time Temple - Kirston
 * Twilight of the Gods
 */

function start() {
    cm.sendAcceptDecline("只有我有善良的镜子才能再次召唤黑魔法师! \r\n等等!有些不对劲!为什么黑魔法师没有被召唤出来?等等,这是什么力量?我感觉... 这和黑魔法师完全不一样啊 Ahhhhh!!!!! \r\n\r\n #b(把一只手放在奇拉的肩膀上.)");
}

function action(mode, type, selection) {
    if (mode == 1) {
	cm.removeNpc(270050100, 2141000);
	cm.forceStartReactor(270050100, 2709000);
    }
    cm.dispose();

// If accepted, = summon PB + Kriston Disappear + 1 hour timer
// If deny = NoTHING HAPPEN
}