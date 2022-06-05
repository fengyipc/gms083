var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    cm.sendOk("请冷静, 叔叔.我们正在前往#b金银岛#k,到那里我们会得救的!");
    cm.dispose();
}