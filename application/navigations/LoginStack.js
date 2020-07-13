import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";
import MainStack from './MainStack';
import Welcome from "@screens/Welcome";
import Splash from "@screens/Splash";
import Signin from "@screens/Signin";
import Signup from "@screens/Signup";
import ForgotPassword from "@screens/ForgotPassword";
import TermsGuest from "@screens/TermsGuest";

import colors from "@constants/colors";

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
		MainStack: {
			screen: MainStack,
			navigationOptions: {
				header: null,
				gesturesEnabled: false
			}
		}
	},
	{
		initialRouteName: 'Welcome',
		navigationOptions: {
			headerMode: 'none',
			header: null
		}

	}
)

export default createAppContainer(RootStack)
