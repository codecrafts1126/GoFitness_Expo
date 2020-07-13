import React, {Component} from 'react';
import {Alert, Dimensions, Image, TouchableOpacity} from 'react-native';
import { Container, Body, Footer, Header, Input, Item, Left, Text, Title, Right, View, Button, Toast, Label, Form} from 'native-base';
import * as firebase from 'firebase';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from "react-native";
import {Grid, Row, Col } from 'react-native-easy-grid';
import Strings from '../utils/Strings';

var styles = require('../../assets/files/Styles');
var width = Dimensions.get('window').width;

export default class ForgetPass extends Component {
	static navigationOptions = {
	header: null
};

constructor() {
    super();;
    this.state = {
 
      email: ''
    }
 }
	restpass (){

		const { email }  = this.state;
		if (email) {
        firebase.auth().sendPasswordResetEmail(email).then(()=>{
				Toast.show({ text: `${Strings.ST34}`, position: 'bottom'})
        }).catch((e)=>{
            console.log(e);

            if(e.code == 'auth/user-not-found'){
				Toast.show({ text: `${Strings.ST31}`, position: 'bottom', buttonText: `${Strings.ST33}` })
               
            }else{
				Toast.show({ text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}` })
            }
            
        	});
        }
	}

	render() {
		return (
      <Container style={{backgroundColor: '#fff'}}>
      <Header style={{backgroundColor: '#fff', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0,}}>
      <Left style={{ flex: 1 }}>
            <Button transparent>
              <SimpleLineIcons name='arrow-left' style={{fontSize: 18}} onPress={() => this.props.navigation.goBack()} />
            </Button>
          </Left>
          <Body style={{ flex: 4,  justifyContent: 'center', alignItems: 'center'  }}>
            <Title style={{color: '#000000'}}>{Strings.ST29}</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
    <Body>
    <KeyboardAwareScrollView>


		<View style={{flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 30}}>
			<Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain"/>

			<Form ref="formId">

			<Item rounded style={styles.inputLogin}>
			<Ionicons name="md-mail" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}} />
           	<Input onChangeText={email => this.setState({email})} placeholder={Strings.ST104} placeholderTextColor="#a4a4a4" style={{fontSize: 16, color: '#a4a4a4'}} autoCapitalize="none"/>
          	</Item>

			</Form>

				<Button rounded block onPress={this.restpass.bind(this)} style={styles.button_auth}>
				<Text>{Strings.ST28}</Text>
				</Button>

				<TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.text_auth} activeOpacity={1}>
				<Text style={styles.text_auth}>{Strings.ST35}</Text>
				</TouchableOpacity>


			</View>

      </KeyboardAwareScrollView>
      </Body>
    </Container>
			);
	}
}