/*
    This file is part of the HeavenMS MapleStory Server
    Copyleft (L) 2016 - 2018 RonanLana

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

importPackage(Packages.client);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if(mode == 0 && type > 0) {
            qm.dispose();
            return;
        }
        
        if (mode == 1)
            status++;
        else
            status--;
        
        if (status == 0) {
            qm.sendNext("如你现在所知，我是德朗博士。我曾经是阿尔卡多社会中有影响力的炼金术士，由于我失败的实验的后遗症，我与他们的社会脱节了，玛加提亚现在随处可见。");
        } else if (status == 1) {
            qm.sendNextPrev("类疱疹，我的发明，最初是为了满足国内，科学和军事的需要，但是他们的主要处理单元芯片上的一个严重的故障使他们变得不稳定和暴力，迅速引起了各地的动乱和破坏。因此，我被剥夺了阿尔卡多的炼金术士和研究员的身份，并获得了逮捕令。");
        } else if (status == 2) {
            qm.sendAcceptDecline("即便如此，现在也不能阻止我！我的创造物每天仍在四处游荡，造成破坏和伤亡，没有把他们赶出城市的希望！他们可以复制自己太快，普通武器无法阻止他们。从那以后，我一直在不懈地研究一种方法，让他们一下子关闭，试图找到一种方法来阻止这种疯狂。你一定能理解我的处境吗？");
        } else if (status == 3) {
            qm.sendNext("感谢您理解我的观点。你一定见过帕文，因为你知道我在哪儿。使他了解目前的情况。");
        } else if (status == 4) {
            qm.sendNext("哦，如果不是太多的话，我还有个人的事要问。我担心我的妻子， #b#p2111004##k. 自从赫鲁兹事件发生后，我可以给她捎个信，那一定让她付出了代价。。。拜托，如果可以的话，你能把#b银色吊坠#k从我#b家里#k找到,替我把它给她吗？我很遗憾没有马上把这个东西给她，那是她的生日。。。也许现在就给她，至少能让她睡个好觉。");
        } else if (status == 5) {
            qm.sendNext("#r一定要记住这个样子！#k 我把吊坠藏在家里的一个容器里#b在水管后面#k.管子必须转动#b整齐#k:上，下，中。然后，输入密码：#r我的爱人菲莉娅#k'.");
            qm.forceStartQuest();
        } else if (status == 6) {
            qm.dispose();
        }
    }
}