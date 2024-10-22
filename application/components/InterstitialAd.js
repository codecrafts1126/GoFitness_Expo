import React, {Component} from 'react';
import configs from '../utils/configs';
import {AdMobInterstitial} from 'expo-ads-admob';

class InterstitialAd extends React.Component {

  componentDidMount() {

    this._loadInitialState().done();
  }

  _loadInitialState = async () => {
    
    AdMobInterstitial.setAdUnitID(configs.INTERSTITIAL_ID); // Test ID, Replace with your-admob-unit-id
    AdMobInterstitial.setTestDeviceID('EMULATOR');
    await AdMobInterstitial.requestAdAsync();
    await AdMobInterstitial.showAdAsync();
  };

}

export default InterstitialAd;
