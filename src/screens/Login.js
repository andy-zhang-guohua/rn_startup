import React, { Component } from 'react';
import {
	Keyboard,
	Alert
} from 'react-native';

import { log } from '../utils/LogUtils'
import { userService } from '../services/UserService'
import { appPreference } from '../services/AppPreferenceService'

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
		this._processUserLogin = this._processUserLogin.bind(this);
	}


	componentWillMount() {
		log('登录屏组件被装载');

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

	/**
	 * 处理登录表单提交时的用户验证和屏幕跳转逻辑
	 * 1.如果遇到错误提示错误并不离开当前登录屏幕
	 * 2.如果登录成功跳转到用户个人信息屏幕
	 * @param {*} username 用户名 
	 * @param {*} password 密码
	 * @return void
	 */
	_processUserLogin(username, password) {
		const exist = userService.existUserWithUsername(username);
		if (!exist) {
			Alert.alert("用户名错误:" + username);
			return;
		}

		const match = userService.checkUser(username, password);
		if (!match) {
			Alert.alert("密码不匹配");
			return;
		}


		appPreference.setUsername(username);

		// 将当前屏关闭,回到堆栈中未被删除的上一个屏
		// 调用此 goBack()或者pop()方法，会引起当前屏幕组件实例被释放，
		// 也就是会导致当前登录屏的卸载，这正是预期的效果
		this.props.navigation.goBack();//pop()
		this.props.navigation.navigate('UserProfile', { username: username });
	};

	render() {
		return (
			<Wallpaper>
				{this.state.keyboardPresent ? null : <Logo />}
				<Form onSubmit={this._processUserLogin} />
				{this.state.keyboardPresent ? null : <SignupSection />}
			</Wallpaper>
		);
	}
}
