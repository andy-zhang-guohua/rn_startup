import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    Button,
    Alert,
    View,
    TouchableOpacity,
} from 'react-native';

import * as S from 'underscore.string';
import {log} from '../utils/LogUtils'
import {appPreference} from '../services/AppPreferenceService'

const instructions = Platform.select({
    ios: '摇一摇或者按键Cmd+D出现开发人员功能界面\n',
    android: '连续两次按R键重新加载页面,\n' +
    '摇一摇或者按菜单键弹出开发人员功能界面\n',
});


class MainScreen extends Component {
    static navigationOptions = {
        title: '首页',
    };

    constructor() {
        super();

        this.state = {
            username: '',
            messageFromServer: ''
        };

        this._onButtonClick = this._onButtonClick.bind(this);
        this._onUsernameLoadFromAppPreference = this._onUsernameLoadFromAppPreference.bind(this);
        this._loadSomeDataFromServer = this._loadSomeDataFromServer.bind(this);
    }

    componentWillMount() {
        log('首页屏组件将被挂载');


        this.props.navigation.addListener(
            'willFocus',
            payload => {
                log('首页屏幕将被激活', payload);
                appPreference.getUsername(this._onUsernameLoadFromAppPreference);
            }
        );
    }

    componentDidMount() {
        log('首页屏组件已被挂载');

        this._loadSomeDataFromServer();
    }

    /** 模拟从服务器上取数据，也就是和远程服务器的交互*/
    _loadSomeDataFromServer() {
        //let url = 'https://customer.qifuy.com/api/sanity';// 自签名
        let url = 'https://bj.meituan.com/ptapi/recommends';// CA 签名
        //let url = 'http://customer.qifuy.com:9001/api/sanity';

        let successHandler = (response) => {
            log(response);
            let message = "来自网络的数据：\n" + url + "\n" + S.prune(JSON.stringify(response, null, '\t'), 300);
            this.setState({messageFromServer: message});
        };

        let errorHandler = (error) => {
            log(error);
            let message = "访问网络数据出错：\n" + url + "\n" + S.prune(error.message, 300);
            this.setState({messageFromServer: message});
        };
        fetch(url).then((response) => {
            if (response.ok) return response.json();
            throw new Error('Network response was not ok.');
        }).then(successHandler).catch(errorHandler);
    }

    _onUsernameLoadFromAppPreference(username) {
        log("从应用配置读取到用户名 : " + username);
        // 不管读取到的用户名是否为空，都需要重新设置一下状态，
        // 因为该方法在应用程序以下几种情况都会被调用 :
        // 1. 应用程序启动后首次进入首页，应用程序尝试从本地存储读取用户名
        // 2. 退出登录功能执行完成，本地存储的当前用户名已经被删除后返回该页面
        // 3. 用户未退出，从其他页面(比如用户个人中心)返回该页面
        if (username !== this.state.username) {// 仅在读取到的用户名和屏幕上显示的用户名称有变化时才刷新页面
            log("用户名发生变化，刷新页面");
            this.setState({username: username});
        }
    }

    _onButtonClick = (event) => {
        log('点击按钮ID =' + event.nativeEvent.target);
    };

    _logout = () => {
        this.setState({username: ''});
        appPreference.removeUsername();
    };

    render() {
        const {navigate} = this.props.navigation;
        let username = this.state.username;
        const userRemembered = !S.isBlank(username);

        const textLogin = <Text style={styles.instructions}>如果你已有账号,请:</Text>;
        const buttonLogin = <Button onPress={(event) => {
            this._onButtonClick(event);
            navigate('Login');
        }
        }
                                    color='#841584'
                                    title="登录" accessibilityLabel="登录"
        />;

        const textRegister = <Text style={styles.instructions}>如果你还没有账号,请:</Text>;
        const buttonRegister = <Button onPress={(event) => {
            this._onButtonClick(event);
            navigate('Register');
        }
        }
                                       color='#841584'
                                       title="注册"
        />;
        const buttonLogout = <Button onPress={(event) => {
            this._onButtonClick(event);
            this._logout();
        }
        }
                                     color='#884488'
                                     title="退出登录"
        />;

        const buttonTestEntry = <Button onPress={(event) => {
            this._onButtonClick(event);
            this.props.navigation.navigate('TestEntry');
        }
        }
                                        color='#33A'
                                        title="测试入口"
        />;

        const buttonGotoUserProfile = <Button onPress={(event) => {
            this._onButtonClick(event);
            navigate('UserProfile', {username: username});
        }
        }
                                              color='#841584'
                                              title="个人信息"
        />;

        let messageFromServer = this.state.messageFromServer;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {userRemembered ? username + "," : null}欢迎来到 React Native 的世界!
                </Text>
                <Text style={styles.instructions}>
                    {instructions}
                </Text>
                <Text style={styles.serverMessage}>
                    {messageFromServer}
                </Text>
                {!userRemembered ? textLogin : null}
                {!userRemembered ? buttonLogin : null}
                {!userRemembered ? textRegister : null}
                {!userRemembered ? buttonRegister : null}
                {userRemembered ? buttonGotoUserProfile : null}
                {userRemembered ? buttonLogout : null}
                {buttonTestEntry}
            </View>
        );
    }
}


export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    serverMessage: {
        fontSize: 8,
        textAlign: 'left',
        backgroundColor: '#e2e2e2',
        color: '#0000FF',
        marginBottom: 5,
    },
});