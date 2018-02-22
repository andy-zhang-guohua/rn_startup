import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  Alert,
} from 'react-native';

const logout = () => {
  Alert.alert('用户退出登录'); 
};

class UserProfileScreen extends React.Component {
  static navigationOptions = {
    title: '用户个人信息',
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          这是一个用户个人信息页面
        </Text>       
		<Button
          title="退出登录"
          onPress={() => {
			  logout();
			  this.props.navigation.navigate('Main');}
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