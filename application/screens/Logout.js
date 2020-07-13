import React, {Component} from 'react';
import { AsyncStorage } from 'react-native';

export default class Logout extends Component {
	async componentDidMount () {
		await AsyncStorage.setItem('LOGIN_TOKEN', "false")
	}

	render () {
		return null;
	}
}