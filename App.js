/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Alert,
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import MainScreen from './src/screens/Main.js';
import LoginScreen from './src/screens/Login.js';
import RegisterScreen from './src/screens/Register.js';
import UserProfileScreen from './src/screens/UserProfile.js';


const RootStack = StackNavigator(
{
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  UserProfile: { screen: UserProfileScreen },
  Main: {  screen: MainScreen  },  
},
{
    initialRouteName: 'Main',
	// mode : 'card',  // card, modal
	// headerMode : 'none' // float, screen ,none
}  
);

export default class App extends React.Component {
  render() {
	this._beforeRun();
    return <RootStack />;
  }
  _beforeRun(){	  
	  Alert.alert('应用程序开始执行');
  }
}

