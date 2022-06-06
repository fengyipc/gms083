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
            em = qm.getEventManager("BalrogQuest");
            if (em == null) {
                qm.sendOk("很抱歉，巴尔格奎斯特酒店已经关门了.");
                return;
            }
            
            var em = qm.getEventManager("BalrogQuest");
            if (!em.startInstance(qm.getPlayer())) {
                qm.sendOk("地图上有人，请稍后再来.");
            } else {
                qm.forceStartQuest();
                qm.dispose();
            }
        } else if (status == 1) {
            qm.dispose();
        }
    }
}
