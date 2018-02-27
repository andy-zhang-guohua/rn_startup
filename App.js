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

import * as Log from './src/utils/LogUtils'
import { debuger } from './src/utils/DebugUtils'

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
  /**
   * 构造函数
   * @param {*} props 调用者设置给该组件的属性
   * 
   */
  constructor(props) {
    super(props);//super(...)必须是构造方法中所有语句的第一句,否则后面无法使用this,this.props都无法使用

    this._beforeRun = this._beforeRun.bind(this);

    Log.enable();
    debuger.enable();

    this._beforeRun();
  }
  /**
   * 注意 : 如果构造函数上没有props参数，这里所定义的静态defaultProps机制不工作
   */
  static defaultProps = {
    applicationName: 'Hello World Application in React Native',
  };

  render() {
    return <RootStack />;
  }
  _beforeRun() {
    Log.log('应用程序开始执行 : ' + this.props.applicationName);
  }
}

