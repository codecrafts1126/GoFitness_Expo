import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Body, Left, Title, Right, View } from 'native-base';
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

export default class ForgetPass extends Component {
	static navigationOptions = {
		header: null
	};
	constructor() {
		super();;
		this.state = {
			isDisabled: false,
			email: '',
			nationalId: ''
		}
	}
	async restPassword() {
		const { email, nationalId } = this.state;
		if (email, nationalId) {
			if (!this.validateEmail(email)) {
				this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST334)}`, `${i18n.translate(Strings.ST335)}`);
			} else {
				this.setState({ isDisabled: true }); 
				let resetResult = await API.post('/user_reset.php', {
					"user": {
						"email": email,
						"id": nationalId
					}
				})
				if (resetResult.data.result == "success") {
					this.dropDownAlertRef.alertWithType('error', `${i18n.translate(Strings.ST316)}`, `${i18n.translate(Strings.ST318)}`);
				} else if (resetResult.data.result == "failure") {
					this.dropDownAlertRef.alertWithType('error', `${i18n.translate(Strings.ST314)}`, `${i18n.translate(Strings.ST319)}`);
				}
				this.setState({ isDisabled: false });
			}
		} else if (!email) {
			this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST320)}`);
		} else if (!nationalId) {
			this.dropDownAlertRef.alertWithType('warn', `${i18n.translate(Strings.ST313)}`, `${i18n.translate(Strings.ST327)}`);
		}
	}

	validateEmail = (value) => {
		var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if (emailRex.test(value)) {
			this.setState({ email: value });
			return true;
		}
		return false;
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
						<Title style={{ color: '#000000' }}>{i18n.translate(Strings.ST308)}</Title>
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
								label={i18n.translate(Strings.ST323)}
								labelTextStyle={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
								keyboardType={"email-address"}
								containerStyle={{ width: wp('80.0%') }}
								// containerStyle={[{ width: wp('80.0%') }, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]}
								onChangeText={email => this.setState({ email })} />
							<TextField
								isRTL={isRTL}
								label={i18n.translate(Strings.ST321)}
								labelTextStyle={!isRTL ? { textAlign: 'left' } : { textAlign: 'right' }}
								keyboardType={"numeric"}
								containerStyle={{ width: wp('80.0%') }}
								// containerStyle={[{ width: wp('80.0%') }, !isRTL ? { transform: [{ scaleX: 1 }] } : { transform: [{ scaleX: -1 }] }]}
								onChangeText={nationalId => this.setState({ nationalId })} />
							<AthenaButton
								isRTL={isRTL}
								isDisabled={this.state.isDisabled}
								title={i18n.translate(Strings.ST305)}
								color={"#E9717D"}
								fontColor={"#FFFFFF"}
								width={wp('80.0%')}
								height={40}
								marginTop={50}
								onPress={this.restPassword.bind(this)} />
						</View>
					</KeyboardAwareScrollView>
				</Body>
				<DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
			</Container>
		);
	}
}