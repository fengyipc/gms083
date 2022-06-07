function enter(pi) {
    if (pi.isQuestCompleted(20730) || pi.isQuestCompleted(21734)) {  // puppeteer defeated, newfound secret path
        pi.playPortalSound(); pi.warp(105040201, 2);
        return true;
    }
    if (pi.getQuestProgress(21728, 0) == 0) {
        pi.setQuestProgress(21728, 0, 1);
    }
    pi.openNpc(1063011, "PupeteerPassword");
    return false;
}