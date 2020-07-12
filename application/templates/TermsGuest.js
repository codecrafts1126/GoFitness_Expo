import React, { Component } from 'react';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { Container, Body, Footer, Header, Input, Item, Left, Text, Title, Right, View, Button, Toast, Label, Form } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "react-native";
import AppPreLoader from '../components/AppPreLoader';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import HTML from 'react-native-render-html';

var styles = require('../../assets/files/Styles');
import Strings from '../utils/Strings';
import i18n from "../utils/i18n";
import API from '../utils/API';

import ConfigApp from '../utils/ConfigApp';

export default class TermsGuest extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch(ConfigApp.URL + 'json/data_strings.php')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson
        }, function () {
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    const isRTL = i18n.isRTL();
    if (this.state.isLoading) {
      return (
        <AppPreLoader />
      );
    }

    return (
      <Container style={{ backgroundColor: '#fff' }}>
        <Header style={{ backgroundColor: '#fff', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0, }}>
          <Left style={{ flex: 1 }}>
            {!isRTL ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-start', width: 50, height: 40, paddingLeft: 5 }} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: 1 }], fontSize: 22 }} />
            </TouchableOpacity> : <View />}
          </Left>
          <Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
            <Title style={{ color: '#000000' }}>{i18n.translate(Strings.ST326)}</Title>
          </Body>
          <Right style={{ flex: 1 }} >
            {isRTL ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50, height: 40, paddingRight: 5 }} onPress={() => this.props.navigation.goBack()}>
              <Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: -1 }], fontSize: 22 }} />
            </TouchableOpacity> : <View />}
          </Right>
        </Header>
        <Body>
          <ScrollView>
            <View style={{ padding: 20 }}>
              <FlatList
                data={this.state.dataSource}
                refreshing="false"
                renderItem={({ item }) =>
                  <HTML html={item.st_termsofservice} />
                }
                keyExtractor={(item, index) => index.toString()}
              />
              <FlatList
                data={this.state.dataSource}
                refreshing="false"
                renderItem={({ item }) =>
                  <HTML html={item.st_privacypolicy} />
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </ScrollView>
        </Body>
      </Container>
    );
  }
}