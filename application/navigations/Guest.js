import React, { Component } from 'react';
import colors from "@constants/colors";
import { createStackNavigator, createAppContainer } from "react-navigation";
import Welcome from "@screens/Welcome";
import Splash from "@screens/Splash";
import Signin from "@screens/Signin";
import Signup from "@screens/Signup";
import ForgotPassword from "@screens/ForgotPassword";
import TermsGuest from "@screens/TermsGuest";

const RootStack = createStackNavigator(

	{
		Welcome: {
			screen: Welcome
		},
		Splash: {
			screen: Splash
		},
		Signin: {
			screen: Signin
		},
		Signup: {
			screen: Signup
		},
		ForgotPassword: {
			screen: ForgotPassword
		},
		TermsGuest: {
			screen: TermsGuest
		},
	},
	{
		initialRouteName: 'Welcome',
		navigationOptions: {
			headerStyle: {
				backgroundColor: colors.white,
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
