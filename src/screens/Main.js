import React, { Component } from 'react';
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
import { log } from '../utils/LogUtils'
import { appPreference } from '../services/AppPreferenceService'

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
      username: ''
    };

    this._onButtonClick = this._onButtonClick.bind(this);
    this._onUsernameLoadFromAppPreference = this._onUsernameLoadFromAppPreference.bind(this);
  }

  componentWillMount() {
    log('首页屏组件被加载');

    appPreference.getUsername(this._onUsernameLoadFromAppPreference);
  }

  _onUsernameLoadFromAppPreference(username) {
    console.log("从应用配置文件读取到用户名 : " + username);
    if (!S.isBlank(username))
      this.setState({ username: username });
  }

  _onButtonClick = (event) => {
    log('点击按钮ID =' + event.nativeEvent.target);
  };

  render() {
    const { navigate } = this.props.navigation;
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
    }
    }
      color='#884488'
      title="退出"
    />;
    const buttonGotoUserProfile = <Button onPress={(event) => {
      this._onButtonClick(event);
      navigate('UserProfile', { username: username });
    }
    }
      color='#841584'
      title="个人信息"
    />;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {userRemembered ? username + "," : null}欢迎来到 React Native 的世界!
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        {!userRemembered ? textLogin : null}
        {!userRemembered ? buttonLogin : null}
        {!userRemembered ? textRegister : null}
        {!userRemembered ? buttonRegister : null}
        {userRemembered ? buttonGotoUserProfile : null}
        {userRemembered ? buttonLogout : null}
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
});