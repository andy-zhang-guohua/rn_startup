import React, { Component } from 'react';
import Logo from '../components/login/Logo';
import Form from '../components/login/Form';
import Wallpaper from '../components/login/Wallpaper';
import ButtonSubmit from '../components/login/ButtonSubmit';
import SignupSection from '../components/login/SignupSection';

export default class LoginScreen extends Component {
	static navigationOptions = {
    title: '用户登录',
	};
	
	render() {
		return (
			<Wallpaper>
				<Logo />
				<Form />
				<ButtonSubmit/>				
				<SignupSection/>
			</Wallpaper>
		);
	}
}
