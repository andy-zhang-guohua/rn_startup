import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: '用户登录',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          这是一个用户登录页面
        </Text>       
      </View>
    );
  }
}



export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center', 
    backgroundColor: '#F5FCFF',
	margin: 10,
  }, 
});