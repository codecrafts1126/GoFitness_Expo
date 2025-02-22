import React, {Component} from 'react';
import * as firebase from 'firebase';
import { AppRegistry, StyleSheet, TextInput, View, Alert, Dimensions, Image } from 'react-native';
import {Grid, Row, Col } from 'react-native-easy-grid';
import Icon from 'react-native-vector-icons/Entypo';
import { Container, Form, Item, Input, Label, Textarea, Button, Text } from 'native-base';
import configs from '../utils/configs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import Strings from '../utils/Strings';

var styles = require('@utils/styles');
var {height, width} = Dimensions.get('window');

export default class ContactUs extends Component {
static navigationOptions = {
  title: `${Strings.ST73}`,
};

constructor(props) {
 
    super(props)
 
    this.state = {
 
      UserName: '',
      UserEmail: '',
      UserMessage: ''
 
    }
 }

 UserRegistrationFunction = () =>{
 
 
 const { UserName }  = this.state ;
 const { UserEmail }  = this.state ;
 const { UserMessage }  = this.state ;
 
fetch(configs.baseURL+'controller/contactform.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
 
    name: UserName,
 
    email: UserEmail,
 
    message: UserMessage
 
  })
 
}).then((response) => response.json())
      .then((responseJson) => {

        if (responseJson == 'false') {
          Toast.show(Strings.ST32, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER, shadow: false, animation: true})

        }else{
          Toast.show(Strings.ST74, {duration: Toast.durations.SHORT, position: Toast.positions.CENTER, shadow: false, animation: true})
          this.props.navigation.goBack()

        }

      }).catch((error) => {
        console.log(error);

      });
 
 
  }

  render () {

    return (

<Container style={styles.background_general}>
    <KeyboardAwareScrollView>

<View style={{flex: 1, margin: 15}}>

<View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image source={require('@assets/images/contact.png')} style={{width: 100, height: 100, marginTop: 10}} />
</View>

<Text style={{paddingLeft: 0, paddingBottom: 10, marginBottom: 5, marginTop: 15, fontSize: 22, fontWeight:'bold', textAlign: 'center' }}>
  {Strings.ST76}
</Text>

<Text style={{color: '#888888', fontSize: 14, textAlign: 'center'}}>
{Strings.ST77}
</Text>

<Form style={{marginBottom: 35, marginTop: 25}}>
            <Item stackedLabel last>
              <Label style={{color: '#888888',fontSize: 15}}>{Strings.ST78}</Label>
              <Input onChangeText={UserName => this.setState({UserName})} style={{fontSize: 15}} />
            </Item>

            <Item stackedLabel last>
              <Label style={{color: '#888888',fontSize: 15}}>{Strings.ST79}</Label>
              <Input onChangeText={UserEmail => this.setState({UserEmail})} style={{fontSize: 15}} autoCapitalize="none" />
            </Item>

            <Textarea rowSpan={3} bordered placeholder={Strings.ST80} placeholderTextColor="#888888" onChangeText={UserMessage => this.setState({UserMessage})} style={{fontSize: 15, marginTop: 15, borderTopWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}} />

</Form>


<Button block rounded onPress={this.UserRegistrationFunction} style={styles.button_auth}>
<Text>{Strings.ST81}</Text>
</Button>
</View>
    </KeyboardAwareScrollView>

</Container>

    )
  }

}