import React, { Component } from 'react';
import Dimensions from 'Dimensions';

import {
	StyleSheet,
	View,
	TouchableOpacity,
	Image,
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
			showPassword: false,
			username: '',
			password: '',
		};
		this._toggleShowPassword = this._toggleShowPassword.bind(this);

		this._onUsernameChange = this._onUsernameChange.bind(this);
		
		this._onPasswordChange = this._onPasswordChange.bind(this);
	};

	_toggleShowPassword() {
		this.state.showPassword === false ? this.setState({ showPassword: true }) : this.setState({ showPassword: false });
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

	render() {
		return (
			<View style={styles.container}>
				<View>
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
				<ButtonSubmit />
			</View>
		);
	}
}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
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
