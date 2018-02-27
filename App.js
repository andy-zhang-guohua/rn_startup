/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';

import MainScreen from './src/screens/Main';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import UserProfileScreen from './src/screens/UserProfile';

import { log } from './src/utils/LogUtils'

const RootStack = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    UserProfile: { screen: UserProfileScreen },
    Main: { screen: MainScreen },
  },
  {
    initialRouteName: 'Main',
    // mode : 'card',  // card, modal
    // headerMode : 'none' // float, screen ,none
  }
);

export default class App extends Component {
  constructor() {
    super();
    this._beforeRun();
  }
  render() {
    return <RootStack />;
  }
  _beforeRun() {
    log('应用程序开始执行');
  }
}

