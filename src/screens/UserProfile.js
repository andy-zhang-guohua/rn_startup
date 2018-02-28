import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
} from 'react-native';

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