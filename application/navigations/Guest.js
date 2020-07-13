import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import StartScreen from "../screens/Start";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import ForgetPassScreen from "../screens/ForgetPass";
import TermsGuestScreen from "../screens/TermsGuest";

const RootStack = createStackNavigator(

	{
		Start: {
			screen: StartScreen
		},

		Login: {
			screen: LoginScreen
		},
		Register: {
			screen: RegisterScreen
		},
		ForgetPass: {
			screen: ForgetPassScreen
		},
		TermsGuest: {
			screen: TermsGuestScreen
		},
	},
	{
		initialRouteName: 'Start',
		navigationOptions: {
			headerStyle: {
				backgroundColor: '#ffffff',
				borderWidth: 0,
				borderBottomWidth: 0
				},
			headerTintColor: '#4284d5',
			headerTitleStyle: {
				textAlign: 'center',
				alignSelf: 'center',
				fontSize: 20,
				color: '#333333',
				fontWeight: 'bold',
			}
		}

	}
)

export default createAppContainer(RootStack)
