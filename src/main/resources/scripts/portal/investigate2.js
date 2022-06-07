//笔芯制作
function enter(pi) {
if(pi.isQuestStarted(2322) && pi.getQuestProgressInt(2322) != 5) {
                        pi.playerMessage(5, "对城墙进行了调查。没有进入的方法。");
                        pi.setQuestProgress(2322, 5);
						return true;
                }
if(pi.isQuestStarted(2324) && pi.getQuestProgressInt(2324) != 5) {
                        pi.playerMessage(5, "在城墙附近使用尖刺消除剂，进入蘑菇城堡。");
                        //pi.setQuestProgress(2324, 5);
return false;
						
                }
return true;
}
