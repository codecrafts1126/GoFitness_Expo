import React from 'react';
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import { Root } from "native-base";
import { StatusBar } from "react-native";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

import LoginNavigation from './application/navigations/LoginStack';
import OfflineBar from "./application/components/OfflineBar";

import firebaseConfig from './application/utils/Firebase';
import * as firebase from 'firebase';
firebase.initializeApp(firebaseConfig);

console.disableYellowBox = true;

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    }
  }

  async _loadassetsAsync() {
    const imageassets = cacheImages([

      // require('react-native-dropdownalert/assets/cancel.png'),
      // require('react-native-dropdownalert/assets/error.png'),
      // require('react-native-dropdownalert/assets/info.png'),
      // require('react-native-dropdownalert/assets/success.png'),
      // require('react-native-dropdownalert/assets/warn.png'),

      require('@images/logo.png'),
      require('@images/welcome.png'),
      require('@images/splash1.png'),
      require('@images/splash2.png'),
      require('@images/splash3.png'),
      require('@images/slide01.png'),
      require('@images/slide03.png'),
      require('@images/slide04.png'),
      require('@images/slide06.png'),
      require('@images/slide07.png'),
      require('@images/slide08.png'),
      require('@images/slide09.png'),
      require('@images/slide10.png'),
      require('@images/slide17.png'),
      require('@images/slide27.png'),
      require('@images/slider/slide81.png'),

      require('@images/bg_dark.jpg'),
      require('@images/bg_light.jpg'),
      require('@images/goals.jpg'),
      require('@images/levels.jpg'),
      require('@images/header.jpg'),
      require('@images/bodyparts.jpg'),
      require('@images/equipments.jpg'),
      require('@images/logo.png'),
      require('@images/logo_dark.png'),
      require('@images/workouts.png'),
      require('@images/exercises.png'),
      require('@images/calculator.png'),
      require('@images/diets.png'),
      require('@images/store.png'),
      require('@images/chrono.png'),
      require('@images/sets.png'),
      require('@images/reps.png'),
      require('@images/star.png'),
      require('@images/avatar.png'),
      require('@images/bookmarked.png'),
      require('@images/emptylist.png'),
      require('@images/avatar.jpg'),
      require('@images/profilebg.jpg'),
      require('@images/restday.png'),
      require('@images/blog.png'),
      require('@images/quotes.png'),
      require('@images/checked.png'),
      require('@images/nointernet.png'),
      require('@images/contact.png'),
      require('@images/profile.png'),
      require('@images/settings.png'),
      require('@images/signout.png'),
    ]);

    await Promise.all([...imageassets]);
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadassetsAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return (
      <Root>
        <OfflineBar />
        <StatusBar barStyle="light-content" backgroundColor="#ce8512" />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <LoginNavigation />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
}

