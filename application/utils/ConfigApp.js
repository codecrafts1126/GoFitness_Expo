
//////////////////// CONFIG APP

import Constants from 'expo-constants';

const isStandAloneApp = Constants.appOwnership == "standalone";

const ConfigApp = {

    // backend url
    URL: "https://zobaba.com/fitness/",

    // banner admob unit id - Springo Admob ID -- 21/8/2019
    BANNER_ID: "ca-app-pub-0631650804312375/3631377269",

    // interstitial admob unit id - DON'T CHANGE IT
    INTERSTITIAL_ID: "ca-app-pub-0631650804312375/6087672720",
    //     ca-app-pub-0631650804312375/6087672720
    //Test=ca-app-pub-3940256099942544/1033173712

    // testdevice id, DON'T CHANGE IT
    TESTDEVICE_ID : isStandAloneApp?"EMULATOR" : "EMULATOR"
};

export default ConfigApp;
