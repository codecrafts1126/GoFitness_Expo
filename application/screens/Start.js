import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Body, Text, View, Button } from 'native-base';
import { NavigationActions } from 'react-navigation';

import Swiper from "react-native-custom-swiper";

var styles = require('@utils/styles');
import Strings from '../utils/Strings';
import i18n from "../utils/i18n";
i18n.setI18nConfig()

import BackgroundImage from "../components/BackgroundImage";

export default class Start extends Component {
	
	static navigationOptions = {
		header: null
	};

	constructor(props) {
		super(props);
		this.state = {
			languageList: [
				{ key: 'language1', title: 'English', code: 'en' },
				{ key: 'language2', title: 'عربى', code: 'ar' },
				{ key: 'language3', title: 'עברית', code: 'he' },
				{ key: 'language4', title: 'русский', code: 'ru' },
				{ key: 'language5', title: '中文', code: 'cn' }],
			currentlanguage: 'en'
		};
	}

	renderLanguageSwiperItem = item => {
		return (
			<View style={{ height: 30 }}><TouchableOpacity><Text style={{ color: "#FFF" }}>{item.title}</Text></TouchableOpacity></View>
		)
	}

	changeLanguage = index => {
		i18n.setLocale(this.state.languageList[index].code)
		this.setState({ currentlanguage: index });
	}

	login() {
		const navigateAction = NavigationActions.navigate({ routeName: 'Login' });
		this.props.navigation.dispatch(navigateAction);
	}

	register() {
		const navigateAction = NavigationActions.navigate({ routeName: 'Register' });
		this.props.navigation.dispatch(navigateAction);
	}

	render() {
		return (
			<BackgroundImage source={require('@assets/images/bg.jpg')}>
				<Body>
					<View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 95 }}>
						<Image source={require('@assets/images/logo.png')} style={styles.logo_start} resizeMode="contain" />
						<View style={{ height: 30 }} />
						<Swiper style={{ flex: 1 }}
							currentSelectIndex={0}
							swipeData={this.state.languageList}
							renderSwipeItem={this.renderLanguageSwiperItem}
							onScreenChange={this.changeLanguage}
							style={{ height: 50, marginBottom: 10 }}
							containerWidth={250}
						/>
						<Button rounded block onPress={this.login.bind(this)} style={styles.button_start} activeOpacity={1}>
							<Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>{i18n.translate(Strings.ST26).toUpperCase()}</Text>
						</Button>
						<Button rounded block onPress={this.register.bind(this)} style={styles.button_start} activeOpacity={1}>
							<Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>{i18n.translate(Strings.ST27).toUpperCase()}</Text>
						</Button>
					</View>
				</Body>
			</BackgroundImage>
		);
	}
}