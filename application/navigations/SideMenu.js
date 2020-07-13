import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Left, Thumbnail, Body, Right, Switch } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { SimpleLineIcons } from '@expo/vector-icons';

import global from '@constants/styles';
import strings from '@constants/strings';
import colors from "@constants/colors";
import images from '@constants/images';
import i18n from "@utils/i18n";
import API from '@utils/API';


class SideMenu extends Component {

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route,
    });
    this.props.navigation.dispatch(navigateAction);
  }

  async logout() {
    await AsyncStorage.setItem('LOGIN_TOKEN', "false");
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Welcome' })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={global.sidemenu_container}>
        <View style={{ 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center', 
          backgroundColor: colors.white, 
          height: hp('30.0%'), 
          marginTop: 30, 
          padding: 30 }}
        >
          <Image
            source={images.logo_dark}
            style={{ flex: 1, width: 120, height: 120 }}
            resizeMode='contain' />
        </View>

        <ScrollView>
          <ListItem style={global.sidemenu_item} onPress={this.navigateToScreen('WorkoutsScreen')}>
            <Body>
              <Text style={global.sidemenu_text}>{i18n.translate(strings.ST001)}</Text>
            </Body>
            <Right>
              <SimpleLineIcons name="arrow-right" style={global.sidemenu_icon} />
            </Right>
          </ListItem>

          <ListItem style={global.sidemenu_item} onPress={this.navigateToScreen('ExercisesScreen')}>
            <Body>
              <Text style={global.sidemenu_text}>{i18n.translate(strings.ST002)}</Text>
            </Body>
            <Right>
              <SimpleLineIcons name="arrow-right" style={global.sidemenu_icon} />
            </Right>
          </ListItem>

          <ListItem style={global.sidemenu_item} onPress={this.navigateToScreen('DietsScreen')}>
            <Body>
              <Text style={global.sidemenu_text}>{i18n.translate(strings.ST003)}</Text>
            </Body>
            <Right>
              <SimpleLineIcons name="arrow-right" style={global.sidemenu_icon} />
            </Right>
          </ListItem>

          <ListItem style={global.sidemenu_item} onPress={this.navigateToScreen('PostsScreen')}>
            <Body>
              <Text style={global.sidemenu_text}>{i18n.translate(strings.ST004)}</Text>
            </Body>
            <Right>
              <SimpleLineIcons name="arrow-right" style={global.sidemenu_icon} />
            </Right>
          </ListItem>

          <ListItem style={global.sidemenu_item} onPress={this.navigateToScreen('QuotesScreen')}>
            <Body>
              <Text style={global.sidemenu_text}>{i18n.translate(strings.ST005)}</Text>
            </Body>
            <Right>
              <SimpleLineIcons name="arrow-right" style={global.sidemenu_icon} />
            </Right>
          </ListItem>

          <ListItem style={global.sidemenu_item} onPress={this.navigateToScreen('ProfileScreen')}>
            <Body>
              <Text style={global.sidemenu_text}>{i18n.translate(strings.ST006)}</Text>
            </Body>
            <Right>
              <SimpleLineIcons name="arrow-right" style={global.sidemenu_icon} />
            </Right>
          </ListItem>


          <ListItem style={global.sidemenu_item} onPress={this.navigateToScreen('SettingsScreen')}>
            <Body>
              <Text style={global.sidemenu_text}>{i18n.translate(strings.ST007)}</Text>
            </Body>
            <Right>
              <SimpleLineIcons name="arrow-right" style={global.sidemenu_icon} />
            </Right>
          </ListItem>

        </ScrollView>
        <View style={global.sidemenu_footer}>
          <TouchableOpacity onPress={this.logout.bind(this)}>
            <Text>{i18n.translate(strings.ST008)}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;