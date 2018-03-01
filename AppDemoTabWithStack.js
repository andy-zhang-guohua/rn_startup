import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Log from './src/utils/LogUtils'
import { debuger } from './src/utils/DebugUtils'

import LoginScreen from './src/screens/Login'

class HomeDetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home Details!</Text>
      </View>
    );
  }
}

class SettingDetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Setting Details!</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { /* other code from before here */}
        <Button
          title="Go to Home Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
        <Button
        title="用户登录"
        onPress={() => this.props.navigation.navigate('Login')}
      />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        { /* other code from before here */}
        <Button
          title="Go to Setting Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const HomeStack = StackNavigator({
  Home: { screen: HomeScreen },
  Details: { screen: HomeDetailsScreen },
});

const SettingsStack = StackNavigator({
  Settings: { screen: SettingsScreen },
  Details: { screen: SettingDetailsScreen },
});


const TabScreens = TabNavigator(
  {
    Home: { screen: HomeStack },
    Settings: { screen: SettingsStack },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'Settings') {
          iconName = `ios-options${focused ? '' : '-outline'}`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: true,
    swipeEnabled: true,
  }
);


// 模态Modal导航屏
const RootStack = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Main: { screen: TabScreens },
  },
  {
    initialRouteName: 'Main',
    mode: 'modal',  // card(default), modal
    headerMode: 'none' // float, screen ,none
  }
);

export default class AppDemoTabWithStack extends Component {
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