import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Left, Text, Title, Right, View } from 'native-base';
import { NavigationActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DropdownAlert from 'react-native-dropdownalert';
import { TextField } from 'react-native-material-textfield';

var styles = require('../../assets/files/Styles');
import Strings from '../utils/Strings';
import i18n from "../utils/i18n";
import API from '../utils/API';

import AthenaButton from '../components/AthenaButton';

export default class Login extends Component {
	static navigationOptions = {
		header: null
	};
	constructor() {
		super();
		this.state = {
			isDisabled: false,
			email: '',
			password: ''
		}
	}
	async login() {
		const { email, password } = this.state;
		if (email, password) {
			this.setState({ isDisabled: true });
			let loginResult = await API.post('/user_login.php', {
				"user": {
					"email": email,
					"password": password
				}
			})
			if (loginResult.data.result == "success") {
				this.dropDownAlertRef.alertWithType('success', `${i18n.translate(Strings.ST316)}`, `${i18n.translate(Strings.ST317)}`);
				const navigateAction = NavigationActions.navigate({
					routeName: 'HomeScreen'
				});
				this.props.navigation.dispatch(navigateAction);

			} else if (loginResult.data.result == "failure") {
				this.dropDownAlertRef.alertWithType('error', `${i18n.translate(Strings.ST314)}`, `${i18n.translate(Strings.ST315)}`);
			}
			this.setState({ isDisabled: false });
		} else if (!email) {
			this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST310)}`);
		} else if (!password) {
			this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST311)}`);
		} else {
			this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST312)}`);
		}
	}

	validateEmail = (email) => {
		let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		if (reg.test(email) === false) {
			this.setState({ email: email })
			return false;
		}
		else {
			this.setState({ email: email })
		}
	}

	validatePass = (password) => {
		let PassLength = password.length.toString();
		if (PassLength >= 6) {
			this.setState({ password: password })
			return false;
		}
		else {
			this.setState({ password: password })
		}
	}

	forgotPassword() {
		const navigateAction = NavigationActions.navigate({
			routeName: 'ForgetPass'
		});
		this.props.navigation.dispatch(navigateAction);
	}

	signUp() {
		const navigateAction = NavigationActions.navigate({
			routeName: 'Register'
		});
		this.props.navigation.dispatch(navigateAction);
	}

	render() {
		const isRTL = i18n.isRTL();
		return (
			<Container style={{ backgroundColor: '#fff' }}>
				<Header style={{ backgroundColor: '#fff', borderBottomWidth: 0, shadowOpacity: 0, elevation: 0, }}>
					<Left style={{ flex: 1 }}>
						{!isRTL ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-start', width: 50, height: 40, paddingLeft: 5 }} onPress={() => this.props.navigation.goBack()}>
							<Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: 1 }], fontSize: 22 }} />
						</TouchableOpacity> : <View />}
					</Left>
					<Body style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
						<Title style={{ color: '#000000' }}>{i18n.translate(Strings.ST301)}</Title>
					</Body>
					<Right style={{ flex: 1 }} >
						{isRTL ? <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'flex-end', width: 50, height: 40, paddingRight: 5 }} onPress={() => this.props.navigation.goBack()}>
							<Ionicons name='md-arrow-round-back' style={{ transform: [{ scaleX: -1 }], fontSize: 22 }} />
						</TouchableOpacity> : <View />}
					</Right>
				</Header>
				<Body>
					<KeyboardAwareScrollView>
						<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, marginTop: 30, width: wp('100.0%') }}>
							<Image source={require('../../assets/images/logo_dark.png')} style={styles.logo_start} resizeMode="contain" />
							<TextField
								isRTL={isRTL}
								label={i18n.translate(Strings.ST303)}
								labelTextStyle={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
								keyboardType={"email-address"}
								containerStyle={{ width: wp('80.0%') }}
								// containerStyle={[{ width: wp('80.0%')}, !isRTL ? {transform: [{scaleX: 1}]} : {transform: [{scaleX: -1}]}]}
								onChangeText={email => this.setState({ email })} />
							<TextField
								isRTL={isRTL}
								label={i18n.translate(Strings.ST304)}
								labelTextStyle={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
								containerStyle={{ width: wp('80.0%') }}
								// containerStyle={[{ width: wp('80.0%')}, !isRTL ? {transform: [{scaleX: 1}]} : {transform: [{scaleX: -1}]}]}
								secureTextEntry={true}
								onChangeText={password => this.setState({ password })} />
							<View style={[!isRTL ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }, { flexDirection: 'row', width: wp('80.0%') }]}>
								<TouchableOpacity onPress={this.forgotPassword.bind(this)} activeOpacity={1}>
									<Text style={{ textDecorationLine: 'underline', fontSize: 13, color: '#3B46B9' }}>{i18n.translate(Strings.ST308)}</Text>
								</TouchableOpacity>
							</View>
							<AthenaButton
								isRTL={isRTL}
								isDisabled={this.state.isDisabled}
								title={i18n.translate(Strings.ST306)}
								color={"#E9717D"}
								fontColor={"#FFFFFF"}
								width={wp('80.0%')}
								height={40}
								marginTop={50}
								onPress={this.login.bind(this)} />
							<View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: wp('80.0%'), height: 50 }}>
								<View style={{ width: wp('30.0%'), borderBottomWidth: 1, borderBottomColor: '#B3B2B7' }} />
								<Text style={{ fontSize: 12, color: '#B3B2B7' }}>{"Or"}</Text>
								<View style={{ width: wp('30.0%'), borderBottomWidth: 1, borderBottomColor: '#B3B2B7' }} />
							</View>
							<View style={[!isRTL ? { flexDirection: 'row' } : { flexDirection: 'row-reverse' }, { justifyContent: 'center', alignItems: 'center', width: wp('80.0%') }]}>
								<Text style={{ fontSize: 13, color: '#B3B2B7' }}>{i18n.translate(Strings.ST309)}</Text>
								<TouchableOpacity onPress={this.signUp.bind(this)} activeOpacity={1}>
									<Text style={{ textDecorationLine: 'underline', fontSize: 13, color: '#3B46B9', marginLeft: 5, marginRight: 5 }}>{i18n.translate(Strings.ST302)}</Text>
								</TouchableOpacity>
							</View>
						</View>
					</KeyboardAwareScrollView>
				</Body>
				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
			</Container>
		);
	}
}