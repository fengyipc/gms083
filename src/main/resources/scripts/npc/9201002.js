/*
 This file is part of the HeavenMS MapleStory Server
 Copyleft (L) 2017 RonanLana
 
 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation version 3 as published by
 the Free Software Foundation. You may not use, modify or distribute
 this program under any other version of the GNU Affero General Public
 License.
 
 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.
 
 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/* High Priest John
 Marriage NPC
 */

 importPackage(Packages.config);
 importPackage(Packages.net.server.channel.handlers);
 importPackage(Packages.tools);
 importPackage(Packages.tools.packets);
 
 var status;
 var state;
 var eim;
 var weddingEventName = "WeddingCathedral";
 var cathedralWedding = true;
 var weddingIndoors;
 var weddingBlessingExp = YamlConfig.config.server.WEDDING_BLESS_EXP;
 
 function isWeddingIndoors(mapid) {
     return mapid >= 680000100 && mapid <= 680000500;
 }
 
 function getMarriageInstance(player) {
     var em = cm.getEventManager(weddingEventName);
 
     for (var iterator = em.getInstances().iterator(); iterator.hasNext(); ) {
         var eim = iterator.next();
         if (eim.isEventLeader(player)) {
             return eim;
         }
     }
 
     return null;
 }
 
 function detectPlayerItemid(player) {
     for (var x = 4031357; x <= 4031364; x++) {
         if (player.haveItem(x)) {
             return x;
         }
     }
 
     return -1;
 }
 
 function getRingId(boxItemId) {
     return boxItemId == 4031357 ? 1112803 : (boxItemId == 4031359 ? 1112806 : (boxItemId == 4031361 ? 1112807 : (boxItemId == 4031363 ? 1112809 : -1)));
 }
 
 function isSuitedForWedding(player, equipped) {
     var baseid = (player.getGender() == 0) ? 1050131 : 1051150;
 
     if (equipped) {
         for (var i = 0; i < 4; i++) {
             if (player.haveItemEquipped(baseid + i)) {
                 return true;
             }
         }
     } else {
         for (var i = 0; i < 4; i++) {
             if (player.haveItemWithId(baseid + i, true)) {
                 return true;
             }
         }
     }
 
     return false;
 }
 
 function getWeddingPreparationStatus(player, partner) {
     if (!player.haveItem(4000313))
         return -3;
     if (!partner.haveItem(4000313))
         return 3;
 
     if (!isSuitedForWedding(player, true))
         return -4;
     if (!isSuitedForWedding(partner, true))
         return 4;
 
     var hasEngagement = false;
     for (var x = 4031357; x <= 4031364; x++) {
         if (player.haveItem(x)) {
             hasEngagement = true;
             break;
         }
     }
     if (!hasEngagement)
         return -1;
 
     hasEngagement = false;
     for (var x = 4031357; x <= 4031364; x++) {
         if (partner.haveItem(x)) {
             hasEngagement = true;
             break;
         }
     }
     if (!hasEngagement)
         return -2;
 
     if (!player.canHold(1112803))
         return 1;
     if (!partner.canHold(1112803))
         return 2;
 
     return 0;
 }
 
 function giveCoupleBlessings(eim, player, partner) {
     var blessCount = eim.gridSize();
 
     player.gainExp(blessCount * weddingBlessingExp);
     partner.gainExp(blessCount * weddingBlessingExp);
 }
 
 function start() {
     weddingIndoors = isWeddingIndoors(cm.getMapId());
     if (weddingIndoors)
         eim = cm.getEventInstance();
 
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
 
         if (!weddingIndoors) {
             if (status == 0) {
                 var hasEngagement = false;
                 for (var x = 4031357; x <= 4031364; x++) {
                     if (cm.haveItem(x, 1)) {
                         hasEngagement = true;
                         break;
                     }
                 }
 
                 if (hasEngagement) {
                     var text = "有什么事吗?";
                     var choice = new Array("我们要结婚了");
                     for (x = 0; x < choice.length; x++) {
                         text += "\r\n#L" + x + "##b" + choice[x] + "#l";
                     }
                     cm.sendSimple(text);
                 } else {
                     cm.sendOk("嗯，今天两颗飘动的心即将在爱的祝福下结合在一起！");
                     cm.dispose();
                 }
             } else if (status == 1) {
                 var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                 var cserv = cm.getClient().getChannelServer();
 
                 if (cserv.isWeddingReserved(wid)) {
                     if (wid == cserv.getOngoingWedding(cathedralWedding)) {
                         var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                         if (!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                             if (!cm.canHold(4000313)) {
                                 cm.sendOk("其他栏腾出放#b#t4000313##k的位置.");
                                 cm.dispose();
                                 return;
                             } else if (!partner.canHold(4000313)) {
                                 cm.sendOk("请让你的伴侣其他栏腾出空间放#b#t4000313##k.");
                                 cm.dispose();
                                 return;
                             } else if (!isSuitedForWedding(cm.getPlayer(), false)) {
                                 cm.sendOk("请购买仪式使用的#r结婚礼服#k,赶快.");
                                 cm.dispose();
                                 return;
                             } else if (!isSuitedForWedding(partner, false)) {
                                 cm.sendOk("请都穿上#r结婚礼服#k参加仪式.");
                                 cm.dispose();
                                 return;
                             }
 
                             cm.sendOk("好,准备完毕了.今天真是美好的一天。让我们开始仪式吧!!");
                         } else {
                             cm.sendOk("嗯，你的爱人好像在别处。。。请让他们在仪式开始前到这里来.");
                             cm.dispose();
                         }
                     } else {
                         var placeTime = cserv.getWeddingReservationTimeLeft(wid);
 
                         cm.sendOk("请注意. 你的婚礼就在#r" + placeTime + "#k举行.");
                         cm.dispose();
                     }
                 } else {
                     cm.sendOk("嗯，对不起，这个频道暂时没有预订.");
                     cm.dispose();
                 }
             } else if (status == 2) {
                 var cserv = cm.getClient().getChannelServer();
                 var wtype = cserv.getOngoingWeddingType(cathedralWedding);
 
                 var partner = cserv.getPlayerStorage().getCharacterById(cm.getPlayer().getPartnerId());
                 if (!(partner == null || !cm.getMap().equals(partner.getMap()))) {
                     if (cserv.acceptOngoingWedding(cathedralWedding)) {
                         var wid = cm.getClient().getWorldServer().getRelationshipId(cm.getPlayer().getId());
                         if (wid > 0) {
                             var em = cm.getEventManager(weddingEventName);
                             if (em.startInstance(cm.getPlayer())) {
                                 eim = getMarriageInstance(cm.getPlayer());
                                 if (eim != null) {
                                     eim.setIntProperty("weddingId", wid);
                                     eim.setIntProperty("groomId", cm.getPlayer().getId());
                                     eim.setIntProperty("brideId", cm.getPlayer().getPartnerId());
                                     eim.setIntProperty("isPremium", wtype ? 1 : 0);
 
                                     eim.registerPlayer(partner);
                                 } else {
                                     cm.sendOk("出错了.");
                                 }
 
                                 cm.dispose();
                             } else {
                                 cm.sendOk("出错了.");
                                 cm.dispose();
                             }
                         } else {
                             cm.sendOk("出错了.");
                             cm.dispose();
                         }
                     } else {    // partner already decided to start
                         cm.dispose();
                     }
                 } else {
                     cm.sendOk("嗯，你的搭档好像在别处。。。请让他们在仪式开始前到这里来.");
                     cm.dispose();
                 }
             }
         } else {
             if (status == 0) {
                 if (eim == null) {
                     cm.warp(680000000, 0);
                     cm.dispose();
                     return;
                 }
 
                 var playerId = cm.getPlayer().getId();
                 if (playerId == eim.getIntProperty("groomId") || playerId == eim.getIntProperty("brideId")) {
                     var wstg = eim.getIntProperty("weddingStage");
 
                     if (wstg == 2) {
                         cm.sendYesNo("很好，客人们现在已经把他们所有的祝福都给你了。时间到了，现在要结婚吗？");
                         state = 1;
                     } else if (wstg == 1) {
                         cm.sendOk("当你们两个在彼此许下结婚誓言的时候，你们的客人正在给你们祝福。这是你们两个幸福的时刻，请欢庆仪式.");
                         cm.dispose();
                     } else {
                         cm.sendOk("祝贺你的婚礼！我们的仪式结束了,现在去找#b#p9201007##k,她会带你和你的客人去参加宴会.");
                         cm.dispose();
                     }
                 } else {
                     var wstg = eim.getIntProperty("weddingStage");
                     if (wstg == 1) {
                         if (eim.gridCheck(cm.getPlayer()) != -1) {
                             cm.sendOk("每个人都祝福这对可爱的新人!");
                             cm.dispose();
                         } else {
                             if (eim.getIntProperty("guestBlessings") == 1) {
                                 cm.sendYesNo("你想祝福这对新人吗?");
                                 state = 0;
                             } else {
                                 cm.sendOk("今天我们聚在这里，让这对活泼的新人重聚在一起！");
                                 cm.dispose();
                             }
                         }
                     } else if (wstg == 3) {
                         cm.sendOk("这对可爱的新人结婚了。多热闹的一天啊！请#r准备之后的宴会#k,应该马上就开始了.");
                         cm.dispose();
                     } else {
                         cm.sendOk("客人的祝福时间已经结束。等等，这对新人很快就要正式结婚了。");
                         cm.dispose();
                     }
                 }
             } else if (status == 1) {
                 if (state == 0) {    // give player blessings
                     eim.gridInsert(cm.getPlayer(), 1);
 
                     if (YamlConfig.config.server.WEDDING_BLESSER_SHOWFX) {
                         var target = cm.getPlayer();
                         target.announce(MaplePacketCreator.showSpecialEffect(9));
                         target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);
                     } else {
                         var target = eim.getPlayerById(eim.getIntProperty("groomId"));
                         target.announce(MaplePacketCreator.showSpecialEffect(9));
                         target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);
 
                         target = eim.getPlayerById(eim.getIntProperty("brideId"));
                         target.announce(MaplePacketCreator.showSpecialEffect(9));
                         target.getMap().broadcastMessage(target, MaplePacketCreator.showForeignEffect(target.getId(), 9), false);
                     }
 
                     cm.sendOk("你的祝福加在他们的爱里！");
                     cm.dispose();
                 } else {            // couple wants to complete the wedding
                     var wstg = eim.getIntProperty("weddingStage");
 
                     if (wstg == 2) {
                         var pid = cm.getPlayer().getPartnerId();
                         if (pid <= 0) {
                             cm.sendOk("似乎你不想和你的伴侣订婚了，就在祭坛前。。。你们两个刚才玩过的快乐都去哪儿了？");
                             cm.dispose();
                             return;
                         }
 
                         var player = cm.getPlayer();
                         var partner = cm.getMap().getCharacterById(cm.getPlayer().getPartnerId());
                         if (partner != null) {
                             state = getWeddingPreparationStatus(player, partner);
 
                             switch (state) {
                                 case 0:
                                     var pid = eim.getIntProperty("confirmedVows");
                                     if (pid != -1) {
                                         if (pid == player.getId()) {
                                             cm.sendOk("你已经确认了你的誓言。剩下的就是让你的搭档确认了.");
                                         } else {
                                             eim.setIntProperty("weddingStage", 3);
                                             var cmPartner = partner.getAbstractPlayerInteraction();
 
                                             var playerItemId = detectPlayerItemid(player);
                                             var partnerItemId = (playerItemId % 2 == 1) ? playerItemId + 1 : playerItemId - 1;
 
                                             var marriageRingId = getRingId((playerItemId % 2 == 1) ? playerItemId : partnerItemId);
 
                                             cm.gainItem(playerItemId, -1);
                                             cmPartner.gainItem(partnerItemId, -1);
 
                                             RingActionHandler.giveMarriageRings(player, partner, marriageRingId);
                                             player.setMarriageItemId(marriageRingId);
                                             partner.setMarriageItemId(marriageRingId);
 
                                             //var marriageId = eim.getIntProperty("weddingId");
                                             //player.announce(Wedding.OnMarriageResult(marriageId, player, true));
                                             //partner.announce(Wedding.OnMarriageResult(marriageId, player, true));
 
                                             giveCoupleBlessings(eim, player, partner);
 
                                             cm.getMap().dropMessage(6, "大祭司约翰：我现在宣布你们结为夫妻，这是我通过这棵巨大的枫树所赋予的权力。你可以吻新娘！");
                                             eim.schedule("showMarriedMsg", 2 * 1000);
                                         }
                                     } else {
                                         eim.setIntProperty("confirmedVows", player.getId());
                                         cm.getMap().dropMessage(6, "婚礼助手: " + player.getName() + "已经确认了誓言！ 好吧，再往前走一步就正式了。系紧安全带！");
                                     }
 
                                     break;
 
                                 case -1:
                                     cm.sendOk("你似乎不再拥有订婚时和你的伴侣共用的戒指/戒指盒。抱歉，但那是婚礼需要的。。。");
                                     break;
 
                                 case -2:
                                     cm.sendOk("你的伴侣似乎不再拥有你们订婚时共用的戒指/戒指盒。抱歉，但那是婚礼需要的。。。");
                                     break;
 
                                 case -3:
                                     cm.sendOk("你没有我在入口给你的#r#t4000313##k...");
                                     break;
 
                                 case -4:
                                     cm.sendOk("请原谅我的粗鲁，但服装是仪式必不可少的一部分。请适合参加婚礼。");
                                     break;
 
                                 case 1:
                                     cm.sendOk("装备栏空间不足");
                                     break;
 
                                 case 2:
                                     cm.sendOk("装备栏空间不足");
                                     break;
 
                                 case 3:
                                     cm.sendOk("你的伴侣没有我在入口给你的#r#t4000313##k...");
                                     break;
 
                                 case 4:
                                     cm.sendOk("看来你的搭档在婚礼上穿得不合适。。。请原谅我的粗鲁，但服装是仪式必不可少的一部分。");
                                     break;
                             }
 
                             cm.dispose();
                         } else {
                             cm.sendOk("嗯，看来你的搭档不在这里，在祭坛前。。。很遗憾，如果你的伴侣不在，我就不能完成婚礼。");
                             cm.dispose();
                         }
                     } else {
                         cm.sendOk("你们现在是夫妻了。祝贺 你！");
                         cm.dispose();
                     }
                 }
             }
         }
     }
 }