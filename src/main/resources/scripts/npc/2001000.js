/*
 *  Cliff - Happy Ville NPC
 */

var status = -1;

function start() {
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status > 0) {
	    status--;
	} else {
	    cm.dispose();
	    return;
	}
    }
    if (status == 0) {
	cm.sendNext("你看见一群雪人站在那里吗？去和他们中的一个谈谈，它会带你去这棵非常有名的圣诞树。这棵树可以用各种装饰品装饰。你怎么认为？听起来很有趣，对吧？");
    } else if (status == 1) {
	cm.sendNextPrev("只有6个人能同时进入树所在的地方，而你不能在那里#b交易或开店#k.你扔下来的饰品只能自己捡回来，所以不要担心在这里丢了饰品。");
    } else if (status == 2) {
	cm.sendNextPrev("当然，扔在里面的东西永远不会消失。一旦你从里面的雪人那里出来，你在地图上扔下来的所有东西都会回到你身边，所以你不必在离开之前把所有的东西都捡起来。那不是很爽吗？");
    } else if (status == 3) {
	cm.sendPrev("那么，去看看#p2002001#, 在那里买些圣诞装饰品，然后用那些装饰圣诞树~哦耶！最大、最漂亮的装饰品是买不到的。可能是。。。被怪物带走。。。啊哈。。");
	cm.dispose();
    }
}