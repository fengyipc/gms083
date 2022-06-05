/*2101017.js
 *Cesar
 *@author Jvlaple
 */

 importPackage(Packages.server.expeditions);


 var status = 0;
 var toBan = -1;
 var choice;
 var arena;
 var arenaName;
 var type;
 var map;
 var exped;
 var expedicao;
 var expedMembers;
 
 function start() {
     action(1, 0, 0);
 }
 
 function action(mode, type, selection) {
     
     if (mode == -1) {
         cm.dispose();
     } else {
         if (mode == 0) {
             cm.dispose();
             return;
         }
 
         if (cm.getPlayer().getMapId() == 980010100 || cm.getPlayer().getMapId() == 980010200 || cm.getPlayer().getMapId() == 980010300) {
             if (cm.getPlayer().getMapId() == 980010100) {
                 exped = MapleExpeditionType.ARIANT;
                 expedicao = cm.getExpedition(exped);
 
             } else if (cm.getPlayer().getMapId() == 980010200) {
                 exped = MapleExpeditionType.ARIANT1;
                 expedicao = cm.getExpedition(exped);
             } else {
                 exped = MapleExpeditionType.ARIANT2;
                 expedicao = cm.getExpedition(exped);
             }
             
             if (expedicao == null) {
                 cm.dispose();
                 return;
             }
             
             expedMembers = expedicao.getMemberList();
             if (status == 0) {
                 if (cm.isLeaderExpedition(exped)) {
                     cm.sendSimple("你想干什么? #b\r\n#L1#查看人员#l\r\n#L2#移除人员#l\r\n#L3#开始战斗#l\r\n#L4#离开竞技场#l");
                     status = 1;
                 } else {
                     var toSend = "这个竞技场里有:\r\n#b";
                     toSend += cm.getExpeditionMemberNames(exped);
                     cm.sendOk(toSend);
                     cm.dispose();
                 }
             } else if (status == 1) {
                 if (selection == 1) {
                     var toSend = "当前有这些成员:\r\n#b";
                     toSend += cm.getExpeditionMemberNames(exped);
                     cm.sendOk(toSend);
                     cm.dispose();
                 } else if (selection == 2) {
                     var size = expedMembers.size();
                     if (size == 1) {
                         cm.sendOk("你是唯一的成员.");
                         cm.dispose();
                         return;
                     }
                     var text = "这些是人员名单 (点击可以移除):\r\n";
                     text += "\r\n\t\t1." + expedicao.getLeader().getName();
                     for (var i = 1; i < size; i++) {
                         text += "\r\n#b#L" + (i + 1) + "#" + (i + 1) + ". " + expedMembers.get(i).getValue() + "#l\n";
                     }
                     cm.sendSimple(text);
                     status = 6;
                 } else if (selection == 3) {
                     if (expedicao.getMembers().size() < 1) {
                         cm.sendOk("需要更多玩家.");
                         cm.dispose();
                     } else {
                         if (cm.getParty() != null) {
                             cm.sendOk("你不可以组队参加.");
                             cm.dispose();
                             return;
                         }
                         
                         var errorMsg = cm.startAriantBattle(exped, cm.getPlayer().getMapId());
                         if (errorMsg != "") {
                             cm.sendOk(errorMsg);
                         }
                         
                         cm.dispose();
                     }
                 } else if (selection == 4) {
                     cm.mapMessage(5, "队长离开了.");
                     expedicao.warpExpeditionTeam(980010000);
                     cm.endExpedition(expedicao);
                     cm.dispose();
                 }
             } else if (status == 6) {
                 if (selection > 0) {
                     var banned = expedMembers.get(selection - 1);
                     expedicao.ban(banned);
                     cm.sendOk("你移除了" + banned.getValue() + ".");
                     cm.dispose();
                 } else {
                     cm.sendSimple(list);
                     status = 2;
                 }
             }
         } else if (Packages.constants.game.GameConstants.isAriantColiseumArena(cm.getPlayer().getMapId())) {
             if (cm.getPlayer().getMapId() == 980010101) {
                 exped = MapleExpeditionType.ARIANT;
                 expedicao = cm.getExpedition(exped);
             } else if (cm.getPlayer().getMapId() == 980010201) {
                 exped = MapleExpeditionType.ARIANT1;
                 expedicao = cm.getExpedition(exped);
             } else {
                 exped = MapleExpeditionType.ARIANT2;
                 expedicao = cm.getExpedition(exped);
             }
             if (status == 0) {
                 var gotTheBombs = expedicao.getProperty("gotBomb" + cm.getChar().getId());
                 if (gotTheBombs != null) {
                     cm.sendOk("我已经给过你炸弹了,现在去杀死蝎子!");
                     cm.dispose();
                 } else if (cm.canHoldAll([2270002, 2100067], [50, 5])) {
                     cm.sendOk("我给你5个#b#e炸弹#k#n和50个#b#e速成石#k#n.\r\n使用炸弹攻击蝎子并用速成石收集蝎子的灵魂石!");
                     expedicao.setProperty("gotBomb" + cm.getChar().getId(), "1");
                     cm.gainItem(2270002, 50);
                     cm.gainItem(2100067, 5);
                     cm.dispose();
                 } else {
                     cm.sendOk("你的背包满了.");
                     cm.dispose();
                 }
             }
         } else {
             cm.sendOk("你好,你听说过阿里安特竞技场吗,这是20-30级之间玩家的一个竞赛项目!");
             cm.dispose();
         } 
     }
 }
 