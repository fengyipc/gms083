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

/**
 * @author: Ronan
 * @npc: Investigation Result
 * @func: Gives MagatiaPQ stg1 item
*/

function start() {
    var eim = cm.getEventInstance();
    var book = "stg1_b" + (cm.getNpcObjectId() % 26);
    
    var res = eim.getIntProperty(book);
    if(res > -1) {
        /*eim.setIntProperty(book, -1);
        
        if(res == 0) {  // mesos
            var mgain = 500 * cm.getPlayer().getMesoRate();
            cm.sendNext("Earned " + mgain + " mesos!");
            cm.gainMeso(mgain);
        } else if(res == 1) {  // exp
            var egain = 500 * cm.getPlayer().getExpRate();
            cm.sendNext("Earned " + egain + " exp!");
            cm.gainExp(egain);
        } else if(res == 2) {  // letter
            var letter = 4001131;
            if(!cm.canHold(letter)) {
                cm.sendOk("你的背包满了.");
                cm.dispose();
                return;
            }
            
            cm.gainItem(letter, 1);
            cm.sendNext("你发现了一封信，像它看起来的那样放在这里.");
        } else if(res == 3) {  // pass
           */ cm.sendNext("你找到了下一阶段的线索.");
            
            var eim = cm.getEventInstance();
            eim.showClearEffect();
            eim.giveEventPlayersStageReward(1);
            eim.setIntProperty("statusStg1", 1);
            
            cm.getMap().getReactorByName("d00").hitReactor(cm.getClient());
       // }
    } else {
        cm.sendNext("这里什么都没有.");
    }
    
    cm.dispose();
}
