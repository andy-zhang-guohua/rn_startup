/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';

import {StackNavigator} from 'react-navigation';

import MainScreen from './src/screens/Main';
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import UserProfileScreen from './src/screens/UserProfile';
import SplashScreen from 'react-native-splash-screen';
import * as Log from './src/utils/LogUtils'
import {debuger} from './src/utils/DebugUtils'
import TestEntryScreen from "./src/screens/TestEntry";
import FileSystemTestScreen from "./src/screens/FileSystemTest";
import AnimationTestScreen from "./src/screens/AnimationTest";
import DropDownMenuTestScreen from "./src/screens/DropDownMenuTest";
import ScrollableTabViewTestScreen from "./src/screens/ScrollableTabViewTest";
import AnimatableTestScreen from "./src/screens/AnimatableTest";
import ReduxTestScreen from "./src/screens/ReduxTest";
import navigationService from './src/services/navigation/NavigationService';
import NativeVideoPlayerTestScreen from "./src/screens/NativeVideoPlayerTest";
import AFVideoPlayerTestScreen from "./src/screens/AFVideoPlayerTest";
import StatusBarTestScreen from "./src/screens/StatusBarTest";
import Orientation from 'react-native-orientation';

// gets the current screen from navigation state
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

//非模态Modal导航屏
const MainStack = StackNavigator(
    {
        Register: {screen: RegisterScreen},
        UserProfile: {screen: UserProfileScreen},
        Main: {screen: MainScreen},
        TestEntry: {screen: TestEntryScreen},
        FileSystemTest: {screen: FileSystemTestScreen},
        AnimationTest: {screen: AnimationTestScreen},
        DropDownMenuTest: {screen: DropDownMenuTestScreen},
        ScrollableTabViewTest: {screen: ScrollableTabViewTestScreen},
        AnimatableTest: {screen: AnimatableTestScreen},
        ReduxTest: {screen: ReduxTestScreen},
        NativeVideoPlayerTest: {screen: NativeVideoPlayerTestScreen},
        AFVideoPlayerTest: {screen: AFVideoPlayerTestScreen},
        StatusBarTest: {screen: StatusBarTestScreen},
    },
    {
        initialRouteName: 'Main',
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);

// 模态Modal导航屏
const RootStack = StackNavigator(
    {
        Login: {screen: LoginScreen},
        Main: {screen: MainStack},
    },
    {
        initialRouteName: 'Main',
        mode: 'modal',  // card(default), modal
        headerMode: 'none' // float, screen ,none
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

    componentDidMount() {
        Log.log('应用程序入口组件已经挂载');


        this._initOrientation();

        SplashScreen.hide();
    }

    componentWillUnmount() {

    }


    // 初始化屏幕方向信息
    _initOrientation() {
        // this locks the view to Portrait Mode
        Orientation.lockToPortrait();

        // this locks the view to Landscape Mode
        // Orientation.lockToLandscape();

        // this unlocks any previous locks to all Orientations
        //Orientation.unlockAllOrientations();
    }

    render() {
        return (<RootStack
            ref={navigatorRef => {
                navigationService.setTopLevelNavigator(navigatorRef);
            }}

            onNavigationStateChange={(prevState, currentState) => {
                const currentScreen = getCurrentRouteName(currentState);
                const prevScreen = getCurrentRouteName(prevState);

                if (prevScreen !== currentScreen) {
                    console.log("屏幕切换到:" + currentScreen);
                }
            }}
        />);
    }

    _beforeRun() {
        Log.log('应用程序开始执行 : ' + this.props.applicationName);
    }
}

