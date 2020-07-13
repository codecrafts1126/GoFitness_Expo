import React, { Component } from 'react';
import configs from '@utils/configs';
import { AdMobBanner } from 'expo-ads-admob';

class AthenaBannerAd extends React.Component {

  render() {
    return (
      <AdMobBanner
        bannerSize="banner"
        adUnitID={configs.BANNER_ID}
        testDeviceID={configs.TESTDEVICE_ID}
        onDidFailToReceiveAdWithError={this.bannerError} />
    )
  }
}

export default AthenaBannerAd;
