/*
        This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>

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

/**
 * @author: Stereo, Moogra, Ronan
 * @npc: Cloto
 * @map: 1st Accompaniment - KPQ
 * @func: Kerning PQ
*/

importPackage(Packages.tools);
importPackage(java.awt);

var 积分 = 1;
var PQtype = "废弃下水道完成";
var stage1Questions = Array(
        "请听题.战士一转需要的最低等级是多少,请搜集那么多的通行证给我.",
        "请听题.战士一转需要的最低力量是多少,请搜集那么多的通行证给我.",
        "请听题.法师一转需要的最低智力是多少,请搜集那么多的通行证给我.",
        "请听题.弓箭手一转需要的最低敏捷是多少,请搜集那么多的通行证给我.",
        "请听题.飞侠一转需要的最低敏捷是多少,请搜集那么多的通行证给我.",
        "请听题.二转需要的等级是多少,请搜集那么多的通行证给我.",
        "请听题.法师一转需要的最低等级是多少,请搜集那么多的通行证给我.");
var stage1Answers = Array(10, 35, 20, 25, 25, 30, 8);

var stage2Rects = Array(new Rectangle(-755, -132, 4, 218), new Rectangle(-721, -340, 4, 166), new Rectangle(-586, -326, 4, 150), new Rectangle(-483, -181, 4, 222));
var stage3Rects = Array(new Rectangle(608, -180, 140, 50), new Rectangle(791, -117, 140, 45),
        new Rectangle(958, -180, 140, 50), new Rectangle(876, -238, 140, 45),
        new Rectangle(702, -238, 140, 45));
var stage4Rects = Array(new Rectangle(910, -236, 35, 5), new Rectangle(877, -184, 35, 5),
        new Rectangle(946, -184, 35, 5), new Rectangle(845, -132, 35, 5),
        new Rectangle(910, -132, 35, 5), new Rectangle(981, -132, 35, 5));

var stage2Combos = Array(Array(0, 1, 1, 1), Array(1, 0, 1, 1), Array(1, 1, 0, 1), Array(1, 1, 1, 0));
var stage3Combos = Array(Array(0, 0, 1, 1, 1), Array(0, 1, 0, 1, 1), Array(0, 1, 1, 0, 1),
        Array(0, 1, 1, 1, 0), Array(1, 0, 0, 1, 1), Array(1, 0, 1, 0, 1),
        Array(1, 0, 1, 1, 0), Array(1, 1, 0, 0, 1), Array(1, 1, 0, 1, 0),
        Array(1, 1, 1, 0, 0));
var stage4Combos = Array(Array(0, 0, 0, 1, 1, 1), Array(0, 0, 1, 0, 1, 1), Array(0, 0, 1, 1, 0, 1),
        Array(0, 0, 1, 1, 1, 0), Array(0, 1, 0, 0, 1, 1), Array(0, 1, 0, 1, 0, 1),
        Array(0, 1, 0, 1, 1, 0), Array(0, 1, 1, 0, 0, 1), Array(0, 1, 1, 0, 1, 0),
        Array(0, 1, 1, 1, 0, 0), Array(1, 0, 0, 0, 1, 1), Array(1, 0, 0, 1, 0, 1),
        Array(1, 0, 0, 1, 1, 0), Array(1, 0, 1, 0, 0, 1), Array(1, 0, 1, 0, 1, 0),
        Array(1, 0, 1, 1, 0, 0), Array(1, 1, 0, 0, 0, 1), Array(1, 1, 0, 0, 1, 0),
        Array(1, 1, 0, 1, 0, 0), Array(1, 1, 1, 0, 0, 0));

function clearStage(stage, eim, curMap) {
        eim.setProperty(stage + "stageclear", "true");
        eim.showClearEffect(true);

        eim.linkToNextStage(stage, "kpq", curMap);  //opens the portal to the next map
        if (curMap == 103000804) {//完成最终关卡奖励组队挑战积分并记录挑战成功
                var map = cm.getPlayer().getMap();
                var party = cm.getParty().getPartyMembers();
                for (var i = 0; i < party.size(); i++) {
                        if (map.getMapAllPlayers().get(party.get(i).getId()).getBossLog(0, PQtype) == 0) {
                                map.getMapAllPlayers().get(party.get(i).getId()).setBossLog(0, PQtype);
                                map.getMapAllPlayers().get(party.get(i).getId()).setBossLog(-1, "组队挑战积分", 积分);
                        }
                }
        }
}

function rectangleStages(eim, property, areaCombos, areaRects) {
        var c = eim.getProperty(property);
        if (c == null) {
                c = Math.floor(Math.random() * areaCombos.length);
                eim.setProperty(property, c.toString());
        }
        else c = parseInt(c);

        // get player placement
        var players = eim.getPlayers();
        var playerPlacement = new Array(0, 0, 0, 0, 0, 0);

        for (var i = 0; i < eim.getPlayerCount(); i++) {
                for (var j = 0; j < areaRects.length; j++) {
                        if (areaRects[j].contains(players.get(i).getPosition())) {
                                playerPlacement[j] += 1;
                                break;
                        }
                }
        }

        var curCombo = areaCombos[c];
        var accept = true;
        for (var j = 0; j < curCombo.length; j++) {
                if (curCombo[j] != playerPlacement[j]) {
                        accept = false;
                        break;
                }
        }

        return accept;
}

var status = -1;
var eim;

function start() {
        action(1, 0, 0);
}

function action(mode, type, selection) {
        eim = cm.getEventInstance();

        if (mode == -1) {
                cm.dispose();
        } else {
                if (mode == 0 && status == 0) {
                        cm.dispose();
                        return;
                }
                if (mode == 1)
                        status++;
                else
                        status--;

                if (status == 0) {
                        var curMap = cm.getMapId();
                        var stage = curMap - 103000800 + 1;
                        if (eim.getProperty(stage.toString() + "stageclear") != null) {
                                if (stage < 5) {
                                        cm.sendNext("传送门开了,快进去挑战下一关吧!");
                                        cm.dispose();
                                }
                                else {
                                        cm.sendNext("难以置信!你们通过了全部的关卡. 这是属于你的小奖励.在你接收之前,请确保你的背包有足够的空间.");
                                }
                        }
                        else if (curMap == 103000800) {   // stage 1
                                if (cm.isEventLeader()) {
                                        var numpasses = eim.getPlayerCount() - 1;     // minus leader

                                        if (cm.hasItem(4001008, numpasses)) {
                                                cm.sendNext("你收集到了" + numpasses + "张通行证!恭喜你们通过了这一关!我会打开通往下一关的传送门!");
                                                clearStage(stage, eim, curMap);
                                                eim.gridClear();
                                                cm.gainItem(4001008, -numpasses);
                                        }
                                        else {
                                                cm.sendNext("抱歉,但是你们的通行证数量不对.你需要给我正确的数量;这个数量应该是你们队伍除去队长的人数.请让每个队员都完整我交代的任务来获得通行证,然后把通行证交给队长.");
                                        }
                                }
                                else {
                                        var data = eim.gridCheck(cm.getPlayer());

                                        if (data == 0) {
                                                cm.sendNext("谢谢你们给我带来的通行证. 请把这个通行证交给你的队长.");
                                        } else if (data == -1) {
                                                data = Math.floor(Math.random() * stage1Questions.length) + 1;   //data will be counted from 1
                                                eim.gridInsert(cm.getPlayer(), data);

                                                var question = stage1Questions[data - 1];
                                                cm.sendNext(question);
                                        } else {
                                                var answer = stage1Answers[data - 1];

                                                if (cm.itemQuantity(4001007) == answer) {
                                                        cm.sendNext("回答正确!这是给你#b通行证#k.请把它交给队长.");
                                                        cm.gainItem(4001007, -answer);
                                                        cm.gainItem(4001008, 1);
                                                        eim.gridInsert(cm.getPlayer(), 0);
                                                }
                                                else {
                                                        var question = stage1Questions[eim.gridCheck(cm.getPlayer()) - 1];
                                                        cm.sendNext("抱歉,但是数量不对!\r\n" + question);
                                                }
                                        }
                                }

                                cm.dispose();
                        } else if (curMap == 103000801) {   // stage 2
                                var stgProperty = "stg2Property";
                                var stgCombos = stage2Combos;
                                var stgAreas = stage2Rects;

                                var nthtext = "二", nthobj = "绳索", nthverb = "爬上", nthpos = "爬的太低";
                                var nextStgId = 103000802;

                                if (!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请根据队长的指示进行这一关挑战.");
                                }
                                else if (eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("嗨.欢迎来到第" + nthtext + "关. 你会发现一些" + nthobj + ".这些" + nthobj + "#b有三个连接着通往下一关的传送门#k.你们需要做的是#b让三名队员爬上正确的绳子.#k\r\n注意,如果爬得太低,将得不到正确答案;请爬到绳索中间,当队员爬到了位置,请队长与我对话!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if (accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("请快进入传送门开始下一关挑战吧!");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("你们没有找到全部3根正确的" + nthobj + ".请想想换一个绳索的组合!");
                                        }
                                }

                                cm.dispose();
                        } else if (curMap == 103000802) {
                                var stgProperty = "stg3Property";
                                var stgCombos = stage3Combos;
                                var stgAreas = stage3Rects;

                                var nthtext = "三", nthobj = "平台", nthverb = "站", nthpos = "站的太接近边缘";
                                var nextStgId = 103000803;

                                if (!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请根据队长的指示进行这一关挑战");
                                }
                                else if (eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("嗨.欢迎来到第" + nthtext + "关. 你会发现一些" + nthobj + ".这些" + nthobj + ",#b有三个连接着通往下一关的传送门#k.你们需要做的是#b让三个成员站到正确的平台上.#k\r\n注意,如果站的太接近边缘,将得不到正确答案;当三名成员站到了正确的平台上,队长与我对话就可以打开下一关的传送门!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if (accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("请快进入传送门开始下一关挑战吧!");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext(" 不是三个正确的平台上都有人,组合错误!");
                                        }
                                }

                                cm.dispose();
                        } else if (curMap == 103000803) {
                                var stgProperty = "stg4Property";
                                var stgCombos = stage4Combos;
                                var stgAreas = stage4Rects;

                                var nthtext = "第四", nthobj = "酒桶", nthverb = "站", nthpos = "站的太接近边缘";
                                var nextStgId = 103000804;

                                if (!eim.isEventLeader(cm.getPlayer())) {
                                        cm.sendOk("请根据队长的指示进行这一关挑战.");
                                }
                                else if (eim.getProperty(stgProperty) == null) {
                                        cm.sendNext("你好,欢迎进入" + nthtext + "关.这里有好多酒桶,其中有三个连接到了通往下一关的传送门.你们需要做的是让三名队长各自站到这三个正确的酒桶上面.如果你们组合正确了,传送门就会打开!");
                                        var c = Math.floor(Math.random() * stgCombos.length);
                                        eim.setProperty(stgProperty, c.toString());
                                }
                                else {
                                        var accept = rectangleStages(eim, stgProperty, stgCombos, stgAreas);

                                        if (accept) {
                                                clearStage(stage, eim, curMap);
                                                cm.sendNext("请快进入传送门开始下一关挑战吧!");
                                        }
                                        else {
                                                eim.showWrongEffect();
                                                cm.sendNext("组合是错误的!");
                                        }
                                }

                                cm.dispose();
                        } else if (curMap == 103000804) {
                                if (eim.isEventLeader(cm.getPlayer())) {
                                        if (cm.haveItem(4001008, 10)) {
                                                cm.sendNext("这个传送门通往最终的奖励关卡.里面的怪物比普通的更容易打败.你会有一段时间尽可能多的狩猎，也可以与NPC对话提前结束. 恭喜你们完成了所有挑战.让你们的队长和我谈谈，领取你们的奖励.当心...");
                                                cm.gainItem(4001008, -10);
                                                clearStage(stage, eim, curMap);
                                                eim.clearPQ();
                                        } else {
                                                cm.sendNext("你好。欢迎进入第五阶段，也是最后阶段。绕着地图走一圈，你就能找到一些怪物。击败所有怪物，收集通行证给我。吧全部的通行证都请交给你们队长！");
                                        }
                                } else {
                                        cm.sendNext("你好。欢迎进入第五阶段，也是最后阶段。绕着地图走一圈，你就能找到一些怪物。击败所有怪物，收集通行证给我。吧全部的通行证都请交给你们队长！.");
                                }

                                cm.dispose();
                        }
                }
                else if (status == 1) {
                        if (!eim.giveEventReward(cm.getPlayer())) {
                                cm.sendNext("背包太满了!");
                                if (cm.getPlayer().getBossLog(0, "废弃下水道完成") == 0) {
                                        cm.getPlayer().dropMessage("今日已完成废弃都市组队副本,获得1点组队挑战积分");
                                        cm.getPlayer().setBossLog(0, "废弃下水道完成");
                                        cm.getPlayer().setBossLog(-1, "组队挑战积分", 1);
                                }
                        } else {
                                cm.warp(103000805, "st00");
                        }

                        cm.dispose();
                }
        }
}
