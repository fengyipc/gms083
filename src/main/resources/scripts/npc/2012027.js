/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2019 RonanLana

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
/* Harp String C
        Hidden Street - Eliza鈥檚 Garden (200010303)
 */

        importPackage(Packages.tools);

        var status;
        var harpNote = 'C';
        var harpSounds = ["do", "re", "mi", "pa", "sol", "la", "si"];   // musical order detected thanks to Arufonsu
        var harpSong = "CCGGAAGFFEEDDC|GGFFEED|GGFFEED|CCGGAAGFFEEDDC|";
        
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
                                cm.getMap().broadcastMessage(MaplePacketCreator.playSound("orbis/" + harpSounds[cm.getNpc() - 2012027]));
        
                                if (cm.isQuestStarted(3114)) {
                                        var idx = -1 * cm.getQuestProgressInt(3114);  // infoEx without infoNumber, must use one progress only, critical hit!
        
                                        if (idx > -1) {
                                                var nextNote = harpSong[idx];
        
                                                if (harpNote != nextNote) {
                                                        cm.setQuestProgress(3114, 0);
        
                                                        cm.getPlayer().announce(MaplePacketCreator.showEffect("quest/party/wrong_kor"));
                                                        cm.getPlayer().announce(MaplePacketCreator.playSound("Party1/Failed"));
        
                                                        cm.message("你跑调了... 重新开始吧.");
                                                } else {
                                                        nextNote = harpSong[idx + 1];
        
                                                        if (nextNote == '|') {
                                                                idx++;
        
                                                                if (idx == 45) {     
                                                                        cm.message("一闪一闪，小星星，我真想知道你是什么。");
                                                                        cm.setQuestProgress(3114, 42);
        
                                                                        cm.getPlayer().announce(MaplePacketCreator.showEffect("quest/party/clear"));
                                                                        cm.getPlayer().announce(MaplePacketCreator.playSound("Party1/Clear"));
        
                                                                        cm.dispose();
                                                                        return;
                                                                } else {
                                                                        if (idx == 14) {
                                                                                cm.message("一闪一闪，小星星，我真想知道你是什么。");
                                                                        } else if (idx == 22) {
                                                                                cm.message("高高在上,");
                                                                        } else if (idx == 30) {
                                                                                cm.message("就像天上的钻石.");
                                                                        }
                                                                }
                                                        }
        
                                                        cm.setQuestProgress(3114, -1 * (idx + 1));
                                                }
                                        }
                                }
        
                                cm.dispose();
                        }
                }
        }
        