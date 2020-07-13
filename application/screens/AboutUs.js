import React, {Component} from 'react';
import * as firebase from 'firebase';
import AppPreLoader from '../components/AppPreLoader';
import{TouchableOpacity, Dimensions, View, Image, FlatList, ScrollView} from 'react-native';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Entypo';
import { Container, Text} from 'native-base';
import configs from '../utils/configs';
import HTML from 'react-native-render-html';

import Strings from '../utils/Strings';


var styles = require('@utils/styles');
var {height, width} = Dimensions.get('window');

export default class AboutUs extends Component {
static navigationOptions = {
  title: `${Strings.ST9}`,
};


constructor(props) {

    super(props);

    this.state = {
      isLoading: true
    }

  }

  componentDidMount() {
    
       return fetch(configs.baseURL+'json/data_strings.php')
         .then((response) => response.json())
         .then((responseJson) => {
           this.setState({
             isLoading: false,
             dataSource: responseJson
           }, function() {
           });
         })
         .catch((error) => {
           console.error(error);
         });
     }


  render () {

      if (this.state.isLoading) {
      return (
        <AppPreLoader/>
      );
    }

    return (

<Container style={styles.background_general}>
<ScrollView>

<View style={{padding: 20}}>

<FlatList
          data={ this.state.dataSource }
          refreshing="false"
          renderItem={({item}) => 
<HTML html={item.st_aboutus} />            
}
        keyExtractor={(item, index) => index.toString()}
        

        />

</View>
</ScrollView>

</Container>

    )
  }

}