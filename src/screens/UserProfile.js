import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
} from 'react-native';

import * as PasswordUtils from '../utils/PasswordUtils'
import { log } from '../utils/LogUtils'
import { userService } from '../services/UserService'
import { appPreference } from '../services/AppPreferenceService'

class UserProfileScreen extends Component {
  static navigationOptions = {
    title: '用户个人信息',
  };

  constructor() {
    super();

    this.state = {
      username: ''
    };

    this._logout = this._logout.bind(this);
  }

  _logout = () => {
    this.setState({ username: '' });
    appPreference.removeUsername();
  };

  render() {
    {
      // 该代码块在控制台上演示一个 sha256+Base64 摘要的功能
      let rawPassword = '111';//密码明文
      let cypherPassword = PasswordUtils.sha256Base64(rawPassword);
      log("sha256 + Base64 : " + rawPassword + "==>" + cypherPassword);
    }
    const { params } = this.props.navigation.state;
    const username = params ? params.username : null;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          当前用户 : {username}
        </Text>
        <Button
          title="回到主页"
          onPress={() => {
            this.props.navigation.navigate('Main');
          }
          }
        />
        <Text style={styles.welcome}>
          你也可以
      </Text>
        <Button
          title="退出登录"
          color='#884488'
          onPress={() => {
            this._logout();
            this.props.navigation.navigate('Main');
          }
          }
        />
      </View>
    );
  }
}

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    margin: 10,
  },
});