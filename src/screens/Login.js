import React, { Component } from 'react';
import { Keyboard } from 'react-native';

import { log } from '../utils/LogUtils'

import Logo from '../components/login/Logo';
import Form from '../components/login/Form';
import Wallpaper from '../components/login/Wallpaper';
import SignupSection from '../components/login/SignupSection';

export default class LoginScreen extends Component {
	static navigationOptions = {
		title: '用户登录',
	};

	constructor() {
		super();

		this.state = {
			keyboardPresent: false,
		};

		this._keyboardDidShow = this._keyboardDidShow.bind(this);

		this._keyboardDidHide = this._keyboardDidHide.bind(this);
	}


	componentWillMount() {
		log('登录屏组件被加载');

		this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
		this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
	}

	componentWillUnmount() {
		log('登录屏组件被卸载');

		this.keyboardDidShowListener.remove();
		this.keyboardDidHideListener.remove();
	}

	_keyboardDidShow() {
		log('键盘出现');
		this.setState({ keyboardPresent: true });
	}

	_keyboardDidHide() {
		log('键盘隐藏');
		this.setState({ keyboardPresent: false });
	}

	render() {
		return (
			<Wallpaper>
				{this.state.keyboardPresent ? null : <Logo />}
				<Form />
				{this.state.keyboardPresent ? null : <SignupSection />}
			</Wallpaper>
		);
	}
}
