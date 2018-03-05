import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import * as Log from './src/utils/LogUtils'
import { debuger } from './src/utils/DebugUtils'
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './src/screens/Login';
import Carousel from 'react-native-carousel-view';

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    borderWidth: 1,
    borderColor: '#EEE',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



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

    SplashScreen.hide();
  }

  render() {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <View style={styles.container}>
          <Carousel
            width={375}
            height={300}
            delay={2000}
            indicatorAtBottom={true}
            indicatorSize={16}
            indicatorText='•'
            inactiveIndicatorText='•'
            indicatorColor="black"
          >
            <View style={styles.contentContainer}>
              <Text>轮播图1</Text>
              <Image
                style={{ width: 66, height: 58 }}
                source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==' }}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text>轮播图2</Text>
              <Button
                title="测试按钮1"
              />
            </View>
            <View style={styles.contentContainer}>
              <Text>轮播图3</Text>
            </View>
          </Carousel>
        </View>
      </View>
    );
  }

  _beforeRun() {
    Log.log('应用程序开始执行 : ' + this.props.applicationName);
  }
}

