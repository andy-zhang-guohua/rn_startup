import React, { Component } from 'react';
import { Text, View, Button, StyleSheet,Image } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Log from './src/utils/LogUtils';
import { log } from './src/utils/LogUtils';
import { debuger } from './src/utils/DebugUtils';
import SplashScreen from 'react-native-splash-screen';
import Carousel from 'react-native-carousel-view';

const bindScreenTransitionEventListeners = function (screen) {
  screen.props.navigation.addListener(
    'willFocus',
    payload => {
      log(screen.props.navigation.state.key + '屏幕将被激活', payload);
    }
  );
  screen.props.navigation.addListener(
    'didFocus',
    payload => {
      log(screen.props.navigation.state.key + '屏幕已被激活', payload);
    }
  );
  screen.props.navigation.addListener(
    'willBlur',
    payload => {
      log(screen.props.navigation.state.key + '屏幕将被隐藏', payload);
    }
  );
  screen.props.navigation.addListener(
    'didBlur',
    payload => {
      log(screen.props.navigation.state.key + '屏幕已被隐藏', payload);
    }
  );
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselPageContainer: {
    borderWidth: 2,
    borderColor: '#C00',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200
  },
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '首页',
  };


  componentWillMount() {
    log(this.props.navigation.state.key + '屏幕将被挂载');

    bindScreenTransitionEventListeners(this);
  }

  componentWillUpdate() {
    log(this.props.navigation.state.key + '屏幕将被更新');
  }

  componentDidUpdate() {
    log(this.props.navigation.state.key + '屏幕已被更新');
  }


  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }} >
        <View style={styles.carouselContainer}>
          <Carousel
            width={375}
            height={300}
            delay={1000}
            indicatorAtBottom={true}
            indicatorSize={20}
            indicatorText='•'
            inactiveIndicatorText='•'
            indicatorColor="black"
          >
            <View style={styles.carouselPageContainer} key="1">
              <Image
                style={{ width: 66, height: 58 }}
                source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
              />
              <Text>Page 1</Text>
            </View>
            <View style={styles.carouselPageContainer} key="2">
              <Text>Page 2</Text>
            </View>
            <View style={styles.carouselPageContainer} key="3">
              <Text>Page 3</Text>
            </View>
          </Carousel>
        </View>
        <View style={styles.buttonsContainer}>
          <Text>首页!</Text>
          <Button
            title="Go to Settings"
            onPress={() => this.props.navigation.navigate('Settings')}
          />
        </View>
      </View>
    );
  }
}

class MessagesScreen extends React.Component {
  static navigationOptions = {
    title: '消息',
  };

  componentWillMount() {
    log(this.props.navigation.state.key + '屏幕将被挂载');

    bindScreenTransitionEventListeners(this);
  }

  componentWillUpdate() {
    log(this.props.navigation.state.key + '屏幕将被更新');
  }

  componentDidUpdate() {
    log(this.props.navigation.state.key + '屏幕已被更新');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>消息!</Text>
      </View>
    );
  }
}

class UserCenterScreen extends React.Component {
  static navigationOptions = {
    title: '我的',
  };

  componentWillMount() {
    log(this.props.navigation.state.key + '屏幕将被挂载');

    bindScreenTransitionEventListeners(this);
  }

  componentWillUpdate() {
    log(this.props.navigation.state.key + '屏幕将被更新');
  }

  componentDidUpdate() {
    log(this.props.navigation.state.key + '屏幕已被更新');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>个人中心!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: '设置',
  };

  componentWillMount() {
    log(this.props.navigation.state.key + '屏幕将被挂载');

    bindScreenTransitionEventListeners(this);
  }

  componentWillUpdate() {
    log(this.props.navigation.state.key + '屏幕将被更新');
  }

  componentDidUpdate() {
    log(this.props.navigation.state.key + '屏幕已被更新');
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>设置!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}



const RootStack = TabNavigator(
  {
    Home: { screen: HomeScreen },
    Messages: { screen: MessagesScreen },
    UserCenter: { screen: UserCenterScreen },
    Settings: { screen: SettingsScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : '-outline'}`;
        } else if (routeName === 'Messages') {
          iconName = `ios-chatbubbles${focused ? '' : '-outline'}`;
        }
        else if (routeName === 'UserCenter') {
          iconName = `ios-person${focused ? '' : '-outline'}`;
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

export default class AppDemoTab extends Component {
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