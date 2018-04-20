import React, {Component} from 'react';
import {Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollableTabView, {ScrollableTabBar, DefaultTabBar} from 'react-native-scrollable-tab-view';

class ScrollableTabViewTestScreen extends Component {
    static navigationOptions = {
        title: '可滚动选项卡视图测试',
    };

    constructor() {
        super();

        this.state = {};


    }


    componentDidMount() {

    }


    _onChangeTab = ({i, ref}) => {
        console.log("当前Tab:" + i);
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView style={styles.container} initialPage={1} renderTabBar={() => <ScrollableTabBar/>}
                                   onChangeTab={this._onChangeTab}>
                    <Text tabLabel='第一页'>第一页的内容,显示一些文本</Text>
                    <Text tabLabel='第二页'>favorite</Text>
                    <Text tabLabel='第三页'>project</Text>
                    <Text tabLabel='第四页'>favorite</Text>
                    <Text tabLabel='第五页'>project</Text>
                    <View tabLabel='第六页'><Text>这是第六页内容</Text></View>
                </ScrollableTabView>
                <ScrollableTabView style={styles.container} initialPage={0} renderTabBar={() => <DefaultTabBar/>}
                                   tabBarPosition='bottom' onChangeTab={this._onChangeTab}>
                    <Text tabLabel='第一页'>第一页的内容,显示一些文本</Text>
                    <Text tabLabel='第二页'>favorite</Text>
                    <Text tabLabel='第三页'>project</Text>
                    <Text tabLabel='第四页'>favorite</Text>
                    <Text tabLabel='第五页'>project</Text>
                    <View tabLabel='第六页'><Text>这是第六页内容</Text></View>
                </ScrollableTabView>
                <ScrollableTabView style={styles.container} initialPage={0} renderTabBar={() => <DefaultTabBar/>}
                                   tabBarPosition='overlayTop' onChangeTab={this._onChangeTab}>
                    <Text tabLabel='第一页'>第一页的内容,显示一些文本</Text>
                    <Text tabLabel='第二页'>favorite</Text>
                    <Text tabLabel='第三页'>project</Text>
                    <Text tabLabel='第四页'>favorite</Text>
                    <Text tabLabel='第五页'>project</Text>
                    <View tabLabel='第六页'><Text>这是第六页内容</Text></View>
                </ScrollableTabView>
                <ScrollableTabView style={styles.container} initialPage={0} renderTabBar={() => <DefaultTabBar/>}
                                   tabBarPosition='overlayBottom' onChangeTab={this._onChangeTab}>
                    <Text tabLabel='第一页'>第一页的内容,显示一些文本</Text>
                    <Text tabLabel='第二页'>favorite</Text>
                    <Text tabLabel='第三页'>project</Text>
                    <Text tabLabel='第四页'>favorite</Text>
                    <Text tabLabel='第五页'>project</Text>
                    <View tabLabel='第六页'><Text>这是第六页内容</Text></View>
                </ScrollableTabView>
            </View>);
    }
}

export default ScrollableTabViewTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
});