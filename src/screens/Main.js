import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  Button,
  Alert,
  View,
  Navigator,
  TouchableOpacity,
} from 'react-native';

import { log } from '../utils/LogUtils'

const instructions = Platform.select({
  ios: '摇一摇或者按键Cmd+D出现开发人员菜单\n\n' +
    '2018-02-22:开始学习React Native各种功能',
  android: '连续两次按R键重新加载页面,\n' +
    '摇一摇或者按菜单键弹出开发人员菜单\n\n' +
    '2018-02-22:开始学习React Native各种功能',
});

const onButtonClick = (event) => {
  log('点击按钮ID =' + event.nativeEvent.target);
};

class MainScreen extends Component {  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          欢迎来到 React Native 的世界!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Text style={styles.instructions}>
          如果你已有账号,请:
        </Text>
        <Button onPress={(event) => {
          onButtonClick(event);
          navigate('Login');
        }
        }
          color='#841584'
          title="登录" accessibilityLabel="登录"
        />
        <Text style={styles.instructions}>
          如果你还没有账号,请:
        </Text>
        <Button onPress={(event) => {
          onButtonClick(event);
          navigate('Register');
        }
        }
          color='#841584'
          title="注册"
        />
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