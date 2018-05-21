import React, {Component} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Video from 'react-native-af-video-player';
import toast from '../utils/ToastUtils'
import Orientation from 'react-native-orientation';


const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

class AFVideoPlayerFullScreen extends Component {

    static navigationOptions = ({navigation}) => {
        const {state} = navigation
        const header = null

        return {
            // For stack navigators, you can hide the header bar like so
            header,
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
                {this._renderVideo1}
                <ScrollView>
                    <Text>这个视频效果怎么样 ...... </Text>
                </ScrollView>
            </ScrollView>
        )
    }

    _renderVideo1() {
        const logo = 'http://img.bimg.126.net/photo/RxnoPmwl9wRK8fx8AokiGQ==/5753911473919624232.jpg'
        const placeholder = 'http://e.hiphotos.baidu.com/image/pic/item/d6ca7bcb0a46f21fca6fafecfa246b600c33ae32.jpg'
        const title = '测试视频文件1'
        return (<Video
            url={url1}
            autoPlay
            title={title}
            logo={logo}
            placeholder={placeholder}
            onMorePress={() => this.onMorePress()}
            onFullScreen={status => this.onFullScreen(status)}

        />);
    }
}

export default AFVideoPlayerFullScreen;
