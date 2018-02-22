import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: '新用户注册',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          这是一个新用户注册页面
        </Text>       
      </View>
    );
  }
}

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#F5FCFF',
	margin: 10,
  }, 
});