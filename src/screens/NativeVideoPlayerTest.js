import React, {Component} from 'react';
import {Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import VideoPlayer from 'react-native-native-video-player';

class NativeVideoPlayerTestScreen extends Component {
    static navigationOptions = {
        title: '原生视频播放器测试',
    };

    constructor() {
        super();

        this.state = {};

        this._play = this._play.bind(this);
    }


    componentDidMount() {

    }

    _play = () => {
        // http://customer.test.qifuy.com/repo/upload/informatization/2018/1/30/b23be503-179c-4026-b0c7-4970f11e4212_213664f7-d004-43a8-a8b3-8d16ef5d9feb_oceans.mp4
        const url = "http://customer.test.qifuy.com/repo/upload/biz/government_regulation/2018/2/12/77046da6-7f9b-461c-87ed-44b60b641a15.mp4";
        VideoPlayer.showVideoPlayer(url);
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this._play} style={styles.button}>
                    <Text style={styles.buttonText}>
                        全屏播放视频
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default NativeVideoPlayerTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
});