
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
    
                if(status == 0) {
                        cm.sendYesNo("要进去挑战大蜈蚣王吗?");
                }else {
					cm.warp(701010321);
					cm.dispose();
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