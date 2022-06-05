/*
  Growlie (that fatass uhh.. hungry lion or whatever)

  @author FightDesign (RageZONE)
  @author Ronan
  */

var status = 0;
var chosen = -1;

function clearStage(stage, eim) {
    eim.setProperty(stage + "stageclear", "true");
    eim.showClearEffect(true);

    eim.giveEventPlayersStageReward(stage);
}

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
        return;
    } else {
        if (mode == 0 && status == 0) {
            cm.dispose();
            return;
        }
        if (mode == 0)
            status += ((chosen == 2) ? 1 : -1);
        else
            status++;

        if (status == 0) {
            if (cm.isEventLeader()) {
                cm.sendSimple("我是#p1012114#,长期保护这个位置.你带来了什么?\r\n#b#L0#这儿是干嘛的.#l\r\n#L1#我带来了#t4001101#.#l\r\n#L2#我要离开这里.#l");
            } else {
                cm.sendSimple("我是#p1012114#,长期保护这个位置.你带来了什么?\r\n#b#L0#这儿是干嘛的.#l\r\n#L2#我要离开这里.#l");
            }
        } else if (status == 1) {
            if (chosen == -1)
                chosen = selection;
            if (chosen == 0) {
                cm.sendNext("这个地方可以说是最好的地方你可以品尝到月妙做的美味年糕。");
            } else if (chosen == 1) {
                if (cm.haveItem(4001101, 10)) {
                    cm.sendNext("这不是月妙做的年糕吗?给我给我.太好吃了.下次请给我带来更多#b#t4001101##k.现在可以安全离开了!");
                } else {
                    cm.sendOk("请至少收集#b10个#t4001101##k.");
                    cm.dispose();
                }
            } else if (chosen == 2) {
                cm.sendYesNo("确定要离开吗?");
            }
            else {
                cm.dispose();
                return;
            }
        } else if (status == 2) {
            if (chosen == 0) {
                cm.sendNextPrev("把不同颜色的种子放在对应的平台上.当所有话都开出来,月妙就会出现,他会慢慢地制作年糕.在他制作过程中保护他的安全");
            } else if (chosen == 1) {
                cm.gainItem(4001101, -10);

                var eim = cm.getEventInstance();
                clearStage(1, eim);

                var map = eim.getMapInstance(cm.getPlayer().getMapId());
                map.killAllMonstersNotFriendly();

                eim.clearPQ();
                cm.dispose();
            } else {
                if (mode == 1) {
                    cm.warp(910010300);
                } else {
                    cm.sendOk("你最好给我带来美味的年糕,时间不多了");
                }
                cm.dispose();
            }
        } else if (status == 3) {
            if (chosen == 0) {
                cm.sendNextPrev("当花开满山丘,满月将会出现.月妙就会出来了");
            }
        } else if (status == 4) {
            if (chosen == 0) {
                cm.sendNextPrev("我想要十个年糕.");
            }
        } else {
            cm.dispose();
        }
    }
}