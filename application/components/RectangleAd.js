import React, {Component} from 'react';
import configs from '../utils/configs';
import { AdMobBanner } from 'expo-ads-admob';

class RectangleAd extends React.Component {

  render () {

    return (

<AdMobBanner
  bannerSize="mediumRectangle"
  adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID, Replace with your-admob-unit-id
  testDeviceID="EMULATOR"
  onDidFailToReceiveAdWithError={this.bannerError} />

    )
  }

}

export default RectangleAd;
