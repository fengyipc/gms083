/* @Author SharpAceX
        Name: Maid
        Map(s): Foyer.
        Info: Maid
*/
var Ghostbaby = 50; //一天五場
var randTalk =1// Math.floor(Math.random() * 10) + 1;
var status;
function start() {
        status = -1;
        action(1, 0, 0);
}

function action(mode, type, selection) {
        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && type > 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if (status == 0) {
                        if (cm.getPlayer().getBossLog(0, "Ghostbaby") >= Ghostbaby) {
                                cm.sendOk("每天只能打1次鬼娃恰吉！");
                                cm.dispose();
                                return;
                        }
                        cm.sendNext("收集到解梦钥匙了吗？让我來帮你解梦吧！看看你在万圣节会出现什么样的梦，解梦钥匙就交给我吧！");
                } else if (status == 1) {
                        java.lang.System.out.println(randTalk+"xx");
                        if (randTalk >= 5) {
                                cm.sendNext("梦里面的南瓜正在睡觉呢~如果你帶一些南瓜碎片以及300万金币，他有可能会唤醒也说不定？");
                                cm.gainItem(4001337, -1);
                                cm.gainMeso(-3000000);
                                cm.dispose();
                        } else {
                                cm.sendNext("哦不~可怕的噩梦就要开始了，你梦见了鬼娃恰吉正在开始破坏万圣节派对，并抢走孩子们的糖果！好好教训他，并把他赶出去！");
                        }
                } else if (status == 2) {
                        if (cm.haveItem(4001337)) {
                                var em = cm.getEventManager("Ghostbaby");
                                java.lang.System.out.println("xx");
                                if (em == null) {
                                        cm.sendOk("當前副本有問題，請聯絡管理員....");
                                        cm.dispose();
                                } else {
                                        var prop = em.getProperty("state");
                                        if (prop.equals("0") || prop == null) {
                                                em.startInstance(cm.getPlayer());
                                                cm.getPlayer().setBossLog(0,"Ghostbaby");
                                                cm.gainItem(4001337, -1);
                                                cm.dispose();
                                                return;
                                        } else {
                                                cm.sendOk("里面已经有人在挑战鬼娃恰吉了...");
                                                cm.dispose();
                                        }
                                }
                        } else {
                                cm.sendOk("貌似沒有钥匙呢不能做梦了！");
                                cm.dispose();
                        }
                }
        }
}

function generateSelectionMenu(array) {     // nice tool for generating a string for the sendSimple functionality
        var menu = "";
        for (var i = 0; i < array.length; i++) {
                menu += "#L" + i + "#" + array[i] + "#l\r\n";
        }
        return menu;
}