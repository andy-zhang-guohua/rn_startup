import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import * as S from 'underscore.string';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
	Alert,
} from 'react-native';

import UserInput from './UserInput';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';

import { log } from '../../utils/LogUtils'

import imageUsername from '../../images/username.png';
import imagePassword from '../../images/password.png';
import imageEye from '../../images/eye_black.png';


export default class Form extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showPassword: false,//缺省隐藏密码
			username: '',
			password: '',
			isProcessing: false // 缺省处于未提交和非处理中状态
		};

		this._toggleShowPassword = this._toggleShowPassword.bind(this);
		this._onUsernameChange = this._onUsernameChange.bind(this);
		this._onPasswordChange = this._onPasswordChange.bind(this);
		this._onSubmit = this._onSubmit.bind(this);
	};

	_toggleShowPassword() {
		let toShowPassword = this.state.showPassword === false;
		this.setState({ showPassword: toShowPassword });
	};

	_onUsernameChange = (text) => {
		log('用户名更新 : ' + text);

		this.setState({
			username: text
		})
	};

	_onPasswordChange = (text) => {
		log('密码更新 : ' + text);

		this.setState({
			password: text
		})
	};

	_onSubmit = () => {
		log('用户点击了提交按钮 : username = ' + this.state.username + ',password=' + this.state.password);

		const username = this.state.username;
		const password = this.state.password;
		if (S.isBlank(username)) {
			Alert.alert("用户名不能为空");
			return;
		}

		if (S.isBlank(password)) {
			Alert.alert("密码不能为空");
			return;
		}

		this.setState({ isProcessing: true });//设置为处理中，主要是为了禁用提交按钮，避免重复提交

		// 下面的逻辑使用定时器模拟了一个用户登录的处理过程
		if (this.timerMockProcessing) {
			clearTimeout(this.timerMockProcessing);
		}
		this.timerMockProcessing = setTimeout(() => {
			this.props.onSubmit(this.state.username, this.state.password);
			this.setState({ isProcessing: false });
		}, 100);
	};


	componentWillUnmount() {
		if (this.timerMockProcessing) {
			clearTimeout(this.timerMockProcessing);
		}
	}

	render() {
		log("表单组件正在渲染,当前状态：" + JSON.stringify(this.state));

		return (
			<View style={styles.container}>
				<View style={styles.userInputContainer}>
					<UserInput
						onChangeText={this._onUsernameChange}
						iconSource={imageUsername}
						placeholder='用户名'
						autoCapitalize={'none'}
						returnKeyType={'done'}
						autoCorrect={false} />

					<UserInput
						onChangeText={this._onPasswordChange}
						iconSource={imagePassword}
						secureTextEntry={!this.state.showPassword}
						placeholder='密码'
						returnKeyType={'done'}
						autoCapitalize={'none'}
						autoCorrect={false} />

					<TouchableOpacity activeOpacity={0.7} style={styles.buttonEye} onPress={this._toggleShowPassword}>
						<Image source={imageEye} style={styles.iconEye} />
					</TouchableOpacity>
				</View>
				<ButtonSubmit isLoading={this.state.isProcessing} onPress={this._onSubmit} />
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 3,
		alignItems: 'center',
		height: (40 + 8) * 3
	},
	userInputContainer: {
		alignItems: 'center',
		height: (40 + 8) * 2
	},
	buttonEye: {
		position: 'absolute',
		top: 55,
		right: 28,
	},
	iconEye: {
		width: 25,
		height: 25,
		tintColor: 'rgba(0,0,0,0.2)',
	},
});
