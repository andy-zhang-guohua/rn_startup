import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Alert, Text} from 'react-native';
import Video from 'react-native-af-video-player';


// 例子 : 使用网络视频地址
//const url = "http://customer.test.qifuy.com/repo/upload/biz/government_regulation/2018/2/12/77046da6-7f9b-461c-87ed-44b60b641a15.mp4";
// 例子 : 本地视频文件
const url = require("../assets/videos/BigBuckBunny.mp4");

const styles = StyleSheet.create({
    container: {
        flex: 1
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

    onFullScreen(status) {
        // Set the params to pass in fullscreen status to navigationOptions
        this.props.navigation.setParams({
            fullscreen: !status
        })
    }

    onMorePress() {
        Alert.alert('Boom', 'This is an action call!', [{text: '关闭'}])
    }

    render() {
        const logo = 'http://img.bimg.126.net/photo/RxnoPmwl9wRK8fx8AokiGQ==/5753911473919624232.jpg'
        const placeholder = 'http://e.hiphotos.baidu.com/image/pic/item/d6ca7bcb0a46f21fca6fafecfa246b600c33ae32.jpg'
        const title = '测试视频文件'

        return (<View style={styles.container}>
                <Video
                    url={url}
                    autoPlay
                    title={title}
                    logo={logo}
                    placeholder={placeholder}
                    onMorePress={() => this.onMorePress()}
                    onFullScreen={status => this.onFullScreen(status)}

                />
                <ScrollView>
                    <Text>这个视频效果怎么样 ...... </Text>
                </ScrollView>
            </View>
        )
    }
}

export default AFVideoPlayerTestScreen;
