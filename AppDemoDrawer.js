import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Log from './src/utils/LogUtils'
import { debuger } from './src/utils/DebugUtils'
import SplashScreen from 'react-native-splash-screen';

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Ionicons name='ios-chatbubbles' size={24} color={tintColor} />
    ),
  };

  render() {
    return [
      <Button key='openDrawer'
        onPress={() => this.props.navigation.navigate('DrawerOpen')}
        color='#241584'
        title='打开抽屉'
      />,
      <Button key='gotoNotifications'
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
        color='#641584'
      />,
      <Text key='hint'>==>从屏幕最左侧边缘往右滑动可以拉开抽屉</Text>
    ]
      ;
  }
}

class MyNotificationsScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Ionicons name='ios-notifications' size={24} color={tintColor} />
    ),
  };

  render() {
    return [
      <Button key='openDrawer'
        onPress={() => this.props.navigation.navigate('DrawerOpen')}
        color='#841584'
        title='打开抽屉'
      />,
      <Button key='gotoHome'
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
        color='#a41584'
      />,
      <Text key='hint'>==>从屏幕最左侧边缘往右滑动可以拉开抽屉</Text>
    ]
      ;
  }
}

const RootStack = DrawerNavigator({
  Home: {
    screen: MyHomeScreen,
  },
  Notifications: {
    screen: MyNotificationsScreen,
  },
});

export default class AppDemoDrawer extends Component {
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

  componentDidMount() {
    log('应用程序入口组件已经挂载');

    SplashScreen.hide();
  }

  render() {
    return <RootStack />;
  }
  _beforeRun() {
    Log.log('应用程序开始执行 : ' + this.props.applicationName);
  }
}