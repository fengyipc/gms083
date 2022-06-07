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
/* Holy Stone
	Holy Ground at the Snowfield (211040401)
	3rd job advancement - Question trial.
 */

    var questionTree = [
        //Questions Related to CHARACTERS
        ["新手1级到2级需要的经验(EXP)是多少?", ["20", "15", "4", "12", "16"], 1],
        ["第一次转职需求中. 下面哪个是错误的?", ["魔法师 - 8级", "海盗 - 敏捷(DEX)最低需要20", "战士 - 敏捷(DEX)最低需要25", "海盗 - 运气(LUK)最低需要20", "弓箭手 - 力量(STR)最低需要35"], 3],
        ["当你被怪物击中后,下面哪个说法不正确?", ["封印 - 技能无法使用", "无敌 - 变成无敌状态并且恢复速度减半", "虚弱 - 降低移动速度", "诅咒 - 经验值降低", "眩晕 - 无法移动"], 2],
        ["第一次转职需求中. 下面哪个是正确的?", ["海盗 - 运气(LUK)最低需要25", "魔法师 - 等级(LV)需要10级别", "飞侠 - 运气(LUK)最低需要25", "战士 - 力量(STR)最低需要30", "弓箭手 - 敏捷(DEX)最低需要25"], 4],

        //Questions Related to ITEMS
        ["下面哪个怪物和掉落是正确的?", ["仙人掌- 针", "野猪- 野猪牙", "懒巴菲 - 巴菲特的午餐", "花栗鼠 - 螺帽", "蚊蝠 - 施蒂奇的翅膀"], 4],
        ["下面哪个怪物和掉落是错误的?", ["最伟大的老人 - 最伟大的老人", "海带 - 海带叶", "幽灵树桩 - 幼苗", "火花发生器 - 密封齿", "矿工僵尸 - 僵尸丢失的牙齿"], 1],
        //["In GM Event, how many FRUIT CAKE you can get as reward?", ["20", "200", "5", "25", "100"], 2],
        ["下面哪个药水的说明是正确的.?", ["攻击药水 - 攻击+5持续3分钟", "纯净水 - 恢复700MP", "蛋糕 - 恢复150HP&MP", "沙拉 - 恢复300MP", "披萨 - 恢复400HP"], 4],
        ["下面哪个药水的说明是错误的.?", ["活力神水 - 恢复300MP", "补药 - 恢复虚弱状态", "苹果 - 恢复30HP", "清晨之露 - 恢复3000MP", "拉面 - 恢复1000HP"], 3],

        //Questions Related to MONSTERS
        ["以下的怪物 绿蘑菇, 树妖, 绿水灵, 斧木妖, 三眼章鱼, 哪个等级最高?", ["树妖", "绿水灵", "斧木妖", "三眼章鱼", "绿蘑菇"], 2],
        ["魔法密林到天空之城的大船上能看到的怪物是?", ["狼人", "Slime", "蝙蝠怪", "扎昆", "星精灵"], 2],
        ["在彩虹岛看不到的的怪物是?", ["蘑菇仔", "蓝蜗牛", "蜗牛", "红蜗牛", "猪猪"], 4],    // to get conformant with website answers, thanks to Vcoc
        ["金银岛和林中之城不存在的怪物是?", ["风独眼龙", "牛魔王", "蝙蝠怪", "树妖王", "蜗牛"], 1],
        ["冰封雪域看不到的怪物是?", ["黑雪人", "黑鳄鱼", "企鹅王与白雪人", "白雪人", "僵尸"], 1],
        ["下面会飞的怪物是哪个?", ["疾病", "套扎器", "冰独眼龙", "猫鼬", "艾莉莎"], 0],
        ["在神秘岛看不到的怪物是?", ["月精灵", "幼黄独角狮", "幼红独角狮", "黑鳄鱼", "灰狼"], 3],
        ["在彩虹岛看不到的的怪物是?", ["蜗牛", "蘑菇仔", "风独眼龙", "花蘑菇", "蓝蜗牛"], 2],

        //Questions Related to QUESTS
        ["任务:英雄的旧战剑 不需要下面个材料?", ["火焰羽毛", "旧战剑", "冰块", "上古卷轴", "妖精之翼"], 4],
        ["下面哪个任务是可以重复完成的?", ["医院陌生的女人", "枫叶捐赠", "幽灵的痕迹", "艾雯的玻璃鞋", "玛丽和奇妙的药"], 3],
        ["下面哪个职业不是二转职业?", ["牧师", "射手", "刺客", "火枪手", "剑客"], 0],
        ["下面哪个任务的需求等级最高?", ["丘比特的信使", "迷失在海洋中", "阿尔卡斯特与黑水晶", "消灭打鼓的兔子", "庞庞之战"], 2],

        //Questions Related to TOWN/NPC
        ["下面不是金银岛城镇的是?", ["佛罗里达/诺特勒斯号", "彩虹村/南港", "废弃都市/广场", "勇士部落/魔法密林", "林中之城"], 1],
        ["彩虹岛你第一个见到的NPC是谁?", ["莎丽", "希娜", "路卡斯", "罗杰", "桑克斯"], 1],
        ["冰封雪域见不到的NPC是谁?", ["伯坚", "索非亚", "阿尔卡斯特", "珀斯上尉", "卢米"], 1],
        ["冰封雪域见不到的NPC是谁?", ["隐藏的岩石", "格里巴", "杰夫", "神圣的石头", "保姆艾玛"], 4],
        ["勇士部落看不到的NPC是谁?", ["伊安", "索非亚", "斯密斯", "易德", "麦吉"], 3],
        ["射手村看不到的NPC是谁?", ["特奥", "比休斯", "米雅", "科尔", "凯茜"], 0],
        ["魔法密林看不到的NPC是谁?", ["帕克", "妖精玛丽", "露尔", "瑞雅", "丽雅"], 2],
        ["废弃都市看不到的NPC是谁?", ["铭仁", "马龙", "阿勒斯", "鲁克", "内拉"], 3],
        ["哪个NPC与宠物没关系?", ["科尔", "比休斯", "帕特里沙", "威巴", "科洛伊"], 1],
        ["废弃都市中, 谁是阿勒斯的爹, 那个离家出走的孩子", ["长老斯坦", "后街吉姆", "铭仁", "比休斯", "鲁克"], 0],
        ["下面那个NPC不是阿尔法部队的成员?", ["查里中士", "巴伯下士", "伊吉上等兵", "珀斯上尉", "彼特"], 4],
        ["第二次转职让收集30个黑珍珠后NPC会给你什么?", ["旧戒指", "记忆粉末", "妖精的粉尘", "英雄的证明", "秘密卷轴"], 3],
        ["射手村的玛雅需要下面哪个物品来治疗她的病?", ["苹果", "活力神水", "奇妙的药", "菊花", "橙汁"], 2],
        ["下面哪个NPC无法提炼高级 水晶/矿石?", ["奈巴", "舍瑞利", "丽雅", "易德", "后街吉姆"], 2],
        ["彩虹岛看不到的NPC是谁?", ["白瑞德", "特奥", "皮奥", "赛德", "玛丽亚"], 1],
        ["在诺特勒斯号凯琳的门口站岗的NPC是谁?", ["路卡斯", "金博士", "长老斯坦", "斯卡德", "狐智教授"], 1],
        ["你知道射手村郝丽娜的吧,她的眼睛是什么颜色?", ["蓝色", "绿色", "棕色", "红色", "黑色"], 1],
        ["勇士部落的武术教官头上有多少根羽毛?", ["7", "8", "3", "13", "16"], 3],
        ["魔法密林的汉斯手中的魔法球是什么颜色的?", ["白色", "橙色", "蓝色", "紫色", "绿色"], 2]
    ];
    
var status;
var question;

var questionPool;
var questionPoolCursor;

var questionAnswer;

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
            if(cm.getPlayer().gotPartyQuestItem("JBQ") && !cm.haveItem(4031058, 1)) {
                if(cm.haveItem(4005004, 1)) {
                    if(!cm.canHold(4031058)) {
                        cm.sendNext("嗯,你确定你的背包其他栏有1个以上的空位?");
                        cm.dispose();
                    } else {
                        cm.sendNext("好吧... 我将开始测试你，回答正确我的问题, 你就可以顺利通过测试。如果你答错了, 那我们将重新开始测试, 我们开始吧.");
                    }
                } else {
                    cm.sendNext("先给我一个#b#t4005004##k才有资格来挑战我的问题.");
                    cm.dispose();
                }
            } else {
                cm.dispose();
            }
        } else if(status == 1) {
            cm.gainItem(4005004, -1);
            instantiateQuestionPool();
            
            question = fetchNextQuestion();
            var questionHead = generateQuestionHeading();
            var questionEntry = questionTree[question][0];
            
            var questionData = generateSelectionMenu(questionTree[question][1], questionTree[question][2]);
            var questionOptions = questionData[0];
            questionAnswer = questionData[1];
            
            cm.sendSimple(questionHead + questionEntry + "\r\n\r\n#b" + questionOptions + "#k");
        } else if(status >= 2 && status <= 5) {
            if(!evaluateAnswer(selection)) {
                cm.sendNext("挑战失败了，请重新尝试!");
                cm.dispose();
                return;
            }
            
            question = fetchNextQuestion();
            var questionHead = generateQuestionHeading();
            var questionEntry = questionTree[question][0];
            
            var questionData = generateSelectionMenu(questionTree[question][1], questionTree[question][2]);
            var questionOptions = questionData[0];
            questionAnswer = questionData[1];
            
            cm.sendSimple(questionHead + questionEntry + "\r\n\r\n#b" + questionOptions + "#k");
        } else if(status == 6) {
            if(!evaluateAnswer(selection)) {
                cm.sendNext("挑战失败了，请重新尝试!");
                cm.dispose();
                return;
            }
            
            cm.sendOk("恭喜你答对了所有的问题.\r\n带上这条项链回去吧.");
            cm.gainItem(4031058, 1);
            cm.dispose();
        } else {
            cm.sendOk("脚本出错了，请联系GM修复.");
            cm.dispose();
        }
    }
}

function evaluateAnswer(selection) {
    return selection == questionAnswer;
}

function generateQuestionHeading() {
    return "这是第 " + (status) + " 个问题. ";
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function instantiateQuestionPool() {
    questionPool = [];
    
    for(var i = 0; i < questionTree.length; i++) {
        questionPool.push(i);
    }
    
    shuffleArray(questionPool);
    questionPoolCursor = 0;
}

function fetchNextQuestion() {
    var next = questionPool[questionPoolCursor];
    questionPoolCursor++;
    
    return next;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function generateSelectionMenu(array, answer) {
    var answerStr = array[answer], answerPos = -1;
    
    shuffle(array);
    
    var menu = "";
    for (var i = 0; i < array.length; i++) {
        menu += "#L" + i + "#" + array[i] + "#l\r\n";
        if (answerStr == array[i]) {
            answerPos = i;
        }
    }
    return [menu, answerPos];
}