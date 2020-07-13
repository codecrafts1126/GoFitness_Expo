import React, {Component} from 'react';

import {Alert, Dimensions, Image, TouchableOpacity, FlatList, ScrollView, StatusBar} from 'react-native';
import { Container, Body, Footer, Header, Input, Item, Left, Text, Title, Right, View, Button, Toast, Form} from 'native-base';
import { SimpleLineIcons, Ionicons } from '@expo/vector-icons';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ConfigApp from '../utils/ConfigApp';
import HTML from 'react-native-render-html';
import Strings from '../utils/Strings';
import { LinearGradient } from 'expo-linear-gradient';
import {Grid, Row, Col } from 'react-native-easy-grid';

import * as firebase from 'firebase';

var styles = require('../../assets/files/Styles');
var width = Dimensions.get('window').width;

export default class Register extends Component {
static navigationOptions = {
	header: null
};
	constructor () {
		super();

		this.state = {
			name: '',
			email: '',
			password: '',
			isLoading: true,
      		isVisible: false,
      		isOpen: false,
      		isDisabled: false,
      		swipeToClose: false,
      		sliderValue: 0.3
		};

	}

  componentDidMount() {
    
       return fetch(ConfigApp.URL+'json/data_strings.php')
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

	register () {

		const { name }  = this.state;
		const { email }  = this.state;
		const { password }  = this.state;

		if(name, email, password) {
		    const errorHandler = ((e)=>{
            console.log(e);
            if(e.code == 'auth/email-already-in-use'){
				Toast.show({ text: `${Strings.ST36}`, position: 'bottom', buttonText: `${Strings.ST33}` })
               
            } else {
				Toast.show({ text: `${Strings.ST32}`, position: 'bottom', buttonText: `${Strings.ST33}` })
            }

        })
        firebase.auth().createUserWithEmailAndPassword(email, password).then((response) => {
            firebase.auth().currentUser.updateProfile({
                displayName : name,
            }).then(()=>{
            }).catch(errorHandler);

        }).catch(errorHandler)
	}}

validateEmail = (email) => {
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
if(reg.test(email) === false)
{
this.setState({email:email})
return false;
  }
else {
  this.setState({email:email})
}
}

validatePass = (password) => {
let PassLength = password.length.toString() ;
if(PassLength >= 6){
this.setState({password:password})
return false;
  }
else {
  this.setState({password:password})
}
}

  terms() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'TermsGuest'
    });
    this.props.navigation.dispatch(navigateAction);
  }

	render () {
		return (

      <Container style={{backgroundColor: '#fff'}}>
      <Header style={{backgroundColor: '#fff', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0,}}>
      <Left style={{ flex: 1 }}>
            <Button transparent>
              <SimpleLineIcons name='arrow-left' style={{fontSize: 18}} onPress={() => this.props.navigation.goBack()} />
            </Button>
          </Left>
          <Body style={{ flex: 4,  justifyContent: 'center', alignItems: 'center'  }}>
            <Title style={{color: '#000000'}}>{Strings.ST27}</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
    <Body>
    <KeyboardAwareScrollView>


    <View style={{flex: 0.8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 30}}>
      <Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain"/>
			
						<Form ref="formId">

			<Item rounded style={styles.inputLogin}>
			<Ionicons name="md-person" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}} />
           	<Input onChangeText={name => this.setState({name})} placeholder={Strings.ST106} placeholderTextColor="#a4a4a4" style={{fontSize: 16, color: '#a4a4a4'}}/>
          	</Item>

			<Item rounded style={styles.inputLogin}>
			<Ionicons name="md-mail" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}} />
           	<Input onChangeText={(email) => this.validateEmail(email)} value={this.state.email} placeholder={Strings.ST104} placeholderTextColor="#a4a4a4" style={{fontSize: 16, color: '#a4a4a4'}} autoCapitalize="none"/>
          	</Item>

          	<Item rounded style={styles.inputLogin}>
          	<Ionicons name="md-lock" style={{fontSize: 18, marginLeft: 18, marginRight: 5, color: '#a4a4a4'}} />
          	<Input onChangeText={(password) => this.validatePass(password)} value={this.state.password} placeholder={Strings.ST105} placeholderTextColor="#a4a4a4" style={{fontSize: 16, color: '#a4a4a4'}} secureTextEntry={true} autoCapitalize="none"/>
          	</Item>

			</Form>


        <Button rounded block onPress={this.register.bind(this)} style={styles.button_auth}>
        <Text>{Strings.ST28}</Text>
        </Button>

        <TouchableOpacity onPress={this.terms.bind(this)} style={styles.text_auth} activeOpacity={1}>
        <Text style={styles.text_auth}>{Strings.ST82}</Text>
        </TouchableOpacity>




      </View>
      </KeyboardAwareScrollView>
      </Body>
    </Container>
		)
	}
}