function start() {
    cm.sendSimple("如果你有翅膀,我肯定你可以去那边.但是这还不够.如果你想在比刀刃锋利的风中飞行，你也需要坚硬的鳞片。我是知道回来方法的那一波人.如果你想去那边,我可以为你变身.不管你是谁,我会让你变身成龙...\r\n #L0##b我要化身为龙.#k#l");
}

function action(m, t, s) {
   if (m > 0){
      cm.useItem(2210016);
      cm.warp(200090500, 0);
   }
   cm.dispose();
}  