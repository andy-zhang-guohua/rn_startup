import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View} from 'react-native';
import Video, {ScrollView} from 'react-native-af-video-player';
import toast from '../utils/ToastUtils'
import Orientation from 'react-native-orientation';

// 例子 : 使用网络视频地址
//const url = "http://customer.test.qifuy.com/repo/upload/biz/government_regulation/2018/2/12/77046da6-7f9b-461c-87ed-44b60b641a15.mp4";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    videoContainer: {
        margin: 10
    }
})

class AFVideoPlayerTestScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {state} = navigation
        // Setup the header and tabBarVisible status
        const header = state.params && (state.params.fullscreen ? undefined : null)
        const tabBarVisible = state.params ? state.params.fullscreen : true
        return {
            // For stack navigators, you can hide the header bar like so
            header,
            // For the tab navigators, you can hide the tab bar like so
            tabBarVisible,
            title: 'AF视频播放器测试',
        }
    }

    componentDidMount() {
        // 当前屏幕允许横屏竖屏
        Orientation.unlockAllOrientations();

        // 添加屏幕转动监听
        Orientation.addOrientationListener(this._orientationDidChange);
    }

    /**
     * 屏幕转动监听逻辑
     * @param orientation
     * @private
     */
    _orientationDidChange = (orientation) => {
        if (orientation === 'LANDSCAPE') {
            // do something with landscape layout
            console.log("横屏模式");
        } else if (orientation === 'PORTRAIT') {
            // do something with portrait layout
            console.log("竖屏模式");
        }
        else if (orientation === 'PORTRAITUPSIDEDOWN') {
            // do something with portrait upside down layout
            console.log("竖屏颠倒模式");
        }
        else {
            // do something with known layout
            console.log("什么模式");
        }
    }

    componentWillUnmount() {
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });

        // 关闭屏幕转动，不允许横屏
        Orientation.lockToPortrait();

        // Remember to remove listener
        Orientation.removeOrientationListener(this._orientationDidChange);
    }

    onFullScreen(status) {
        // Set the params to pass in fullscreen status to navigationOptions
        const fullscreen = !status;
        this.props.navigation.setParams({
            fullscreen: fullscreen
        })

        toast.showAtBottom(fullscreen ? "非全屏" : "全屏");
    }

    onMorePress() {
        Alert.alert('Boom', 'This is an action call!', [{text: '关闭'}])
    }

    render() {
        return (<ScrollView style={styles.container}>
                <ScrollView>
                    <Text>这是一个ScrollView中嵌入视频进行播放的例子</Text>
                </ScrollView>
                <ScrollView>
                    <Text>动画大片:Big Buck Bunny</Text>
                </ScrollView>
                {this._renderVideo1()}
                <ScrollView>
                    <Text>
                        Small Toy这是一个小玩具，会转动，应该是一个测试视频
                        Small Toy这是一个小玩具，会转动，应该是一个测试视频
                        Small Toy这是一个小玩具，会转动，应该是一个测试视频
                        Small Toy这是一个小玩具，会转动，应该是一个测试视频
                        Small Toy这是一个小玩具，会转动，应该是一个测试视频
                    </Text>
                </ScrollView>
                {this._renderVideo2()}
                <ScrollView>
                    <Text>Big Buck Bunny again
                        哈哈
                    </Text>
                </ScrollView>
                {this._renderVideo3()}
                <ScrollView>
                    <Text>这个视频效果怎么样 ...... </Text>
                </ScrollView>
            </ScrollView>
        )
    }

    _renderVideo1() {
        // 例子 : 本地视频文件
        const url = require("../assets/videos/BigBuckBunny.mp4");
        const logo = 'http://img.bimg.126.net/photo/RxnoPmwl9wRK8fx8AokiGQ==/5753911473919624232.jpg'
        const placeholder = 'http://e.hiphotos.baidu.com/image/pic/item/d6ca7bcb0a46f21fca6fafecfa246b600c33ae32.jpg'
        const title = 'Big Buck Bunny'
        return this._renderVideo(url, placeholder, title, logo);
    }

    _renderVideo2() {
        // 例子 : 本地视频文件
        const url = require("../assets/videos/small.mp4");
        const logo = 'http://img.bimg.126.net/photo/RxnoPmwl9wRK8fx8AokiGQ==/5753911473919624232.jpg'
        const placeholder = 'http://e.hiphotos.baidu.com/image/pic/item/d6ca7bcb0a46f21fca6fafecfa246b600c33ae32.jpg'
        const title = '小玩具会转动'
        return this._renderVideo(url, placeholder, title, logo);
    }

    _renderVideo3() {
        // 例子 : 本地视频文件
        const url = require("../assets/videos/BigBuckBunny.mp4");
        const logo = 'http://img.bimg.126.net/photo/RxnoPmwl9wRK8fx8AokiGQ==/5753911473919624232.jpg'
        const placeholder = 'http://e.hiphotos.baidu.com/image/pic/item/d6ca7bcb0a46f21fca6fafecfa246b600c33ae32.jpg'
        const title = 'Big Buck Bunny 再来一次'
        return this._renderVideo(url, placeholder, title, logo);
    }

    _renderVideo(url, placeholder, title, logo = '') {
        return (<Video
            url={url}
            autoPlay={false}
            title={title}
            logo={logo}
            placeholder={placeholder}
            onMorePress={() => this.onMorePress()}
            onFullScreen={status => this.onFullScreen(status)}
            //inlineOnly
            rotateToFullScreen
            lockPortraitOnFsExit
        />);

    }
}

export default AFVideoPlayerTestScreen;
