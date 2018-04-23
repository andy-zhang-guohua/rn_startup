import React, {Component} from 'react';
import {Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScrollableTabView, {DefaultTabBar, ScrollableTabBar} from 'react-native-scrollable-tab-view';
import ModalRegionSelect from '../widgets/ModalRegionSelectInTabs'
import SelectableTree from '../models/SelectableTree'
import * as ObjectUtils from "../utils/ObjectUtils";

const regions = [{
        "regionCode": "110000", "regionName": "北京市",
        "childrenRegions": [{
            "regionCode": "110100", "regionName": "北京市",
            "childrenRegions": [
                {"regionCode": "110114", "regionName": "昌平区"},
                {"regionCode": "110113", "regionName": "顺义区"}
            ]
        }]
    }, {
        "regionCode": "330000", "regionName": "浙江省",
        "childrenRegions": [{
            "regionCode": "330100", "regionName": "杭州市",
            "childrenRegions": [{"regionCode": "330108", "regionName": "滨江区"}]
        }]
    }]
;


class ScrollableTabViewTestScreen extends Component {
    static navigationOptions = {
        title: '可滚动选项卡视图测试',
    };

    constructor() {
        super();

        this.state = {
            showModalRegionSelect: false,
            regions: this.convertRegionTreeIntoSelectableTree(regions, -1),
        };
    }


    componentDidMount() {

    }

    convertRegionTreeIntoSelectableTree(regionTree, initialSelectedValue) {
        const _self = this;
        const depth = 3;//省市县三级结构
        const data = [];
        const _initialSelectedValue = !ObjectUtils.isUndefinedOrNull(initialSelectedValue) ? initialSelectedValue : -1;
        const selectableTree = new SelectableTree(depth, data, _initialSelectedValue);
        regionTree.forEach((node) => {
            let normalizedNode = _self._recursivelyConvertRegionTreeNodeToSelectableTreeNode(node);
            selectableTree.pushChild(normalizedNode)
        });

        return selectableTree;
    }

    _recursivelyConvertRegionTreeNodeToSelectableTreeNode(regionTreeNode) {
        const _self = this;
        const normalizedNode = {
            key: regionTreeNode.regionCode,
            value: regionTreeNode.regionName,
            children: []
        };

        if (!regionTreeNode.childrenRegions)
            return normalizedNode;

        // 检查子节点是否数组
        if (!ObjectUtils.isArray(regionTreeNode.childrenRegions))
            return normalizedNode;

        regionTreeNode.childrenRegions.forEach((node) => {
                const normalizedChildNode = _self._recursivelyConvertRegionTreeNodeToSelectableTreeNode(node);
                if (normalizedChildNode.value === normalizedNode.value) {
                    normalizedChildNode.value = "(" + normalizedChildNode.value + ")"
                }
                normalizedNode.children.push(normalizedChildNode)
            }
        );

        return normalizedNode;
    }

    _onChangeTab = ({i, ref}) => {
        console.log("当前Tab:" + i);
    };

    _renderScrollableTabBar = () => {
        return (<ScrollableTabBar
            tabsContainerStyle={styles.tabsContainerStyle}
            style={styles.tabContainerStyle}
            tabStyle={styles.tabStyle}/>);
    }

    _renderModalRegionSelect() {
        if (!this.state.showModalRegionSelect)
            return null;

        return <ModalRegionSelect
            regions={this.state.regions}
            onCancel={() => {
                this.setState({showModalRegionSelect: false});
            }}
            onResult={
                () => {
                    this.setState({
                        showModalRegionSelect: false
                    }, () => {
                        alert(JSON.stringify(this.state.regions.getSelectedPathNodesWithoutChildren()));
                    });
                }
            }
        />;
    }

    _onSelectRegion = () => {
        this.setState({showModalRegionSelect: true})
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ScrollableTabView style={styles.container} initialPage={1}
                                   renderTabBar={() => this._renderScrollableTabBar()}
                                   onChangeTab={this._onChangeTab}
                                   tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                                   tabBarTextStyle={styles.tabBarTextStyle}
                                   tabBarActiveTextColor={'navy'}
                                   tabBarInactiveTextColor={'gray'}
                                   textStyle={styles.tabTextStyle}
                >
                    <Text tabLabel='第一页'>第一页的内容,显示一些文本</Text>
                    <Text tabLabel='第二页'>favorite</Text>
                    <Text tabLabel='第三页'>project</Text>
                    <Text tabLabel='第四页'>favorite</Text>
                    <Text tabLabel='第五页'>project</Text>
                    <View tabLabel='第六页'><Text>这是第六页内容</Text></View>
                </ScrollableTabView>
                <ScrollableTabView style={styles.container} initialPage={0} renderTabBar={() => <DefaultTabBar/>}
                                   tabBarPosition='bottom' onChangeTab={this._onChangeTab}
                                   tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                                   tabBarTextStyle={styles.tabBarTextStyle}
                                   tabBarActiveTextColor={'navy'}
                                   tabBarInactiveTextColor={'gray'}
                >
                    <Text tabLabel='第一页'>第一页的内容,显示一些文本</Text>
                    <Text tabLabel='第二页'>favorite</Text>
                    <Text tabLabel='第三页'>project</Text>
                    <Text tabLabel='第四页'>favorite</Text>
                    <Text tabLabel='第五页'>project</Text>
                    <View tabLabel='第六页'><Text>这是第六页内容</Text></View>
                </ScrollableTabView>
                <ScrollableTabView style={styles.container} initialPage={0} renderTabBar={() => <DefaultTabBar/>}
                                   tabBarPosition='overlayTop' onChangeTab={this._onChangeTab}
                                   tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                                   tabBarTextStyle={styles.tabBarTextStyle}
                                   tabBarActiveTextColor={'navy'}
                                   tabBarInactiveTextColor={'gray'}
                >
                    <Text tabLabel='第一页'>第一页的内容,显示一些文本</Text>
                    <Text tabLabel='第二页'>favorite</Text>
                    <Text tabLabel='第三页'>project</Text>
                    <Text tabLabel='第四页'>favorite</Text>
                    <Text tabLabel='第五页'>project</Text>
                    <View tabLabel='第六页'><Text>这是第六页内容</Text></View>
                </ScrollableTabView>
                <ScrollableTabView style={styles.container} initialPage={0}
                                   renderTabBar={() => this._renderScrollableTabBar()}
                                   tabBarPosition='overlayBottom' onChangeTab={this._onChangeTab}
                                   tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                                   tabBarTextStyle={styles.tabBarTextStyle}
                                   tabBarActiveTextColor={'navy'}
                                   tabBarInactiveTextColor={'gray'}
                >
                    <Text tabLabel='第一页'>第一页的内容,显示一些文本</Text>
                    <Text tabLabel='第二页'>favorite</Text>
                    <Text tabLabel='第三页'>project</Text>
                    <Text tabLabel='第四页'>favorite</Text>
                    <Text tabLabel='第五页'>project</Text>
                    <View tabLabel='第六页'><Text>这是第六页内容</Text></View>
                </ScrollableTabView>
                <TouchableOpacity onPress={() => {
                    this._onSelectRegion()
                }}>
                    <View style={{flexDirection: 'row'}}>
                        <Text>模态对话框选择区域</Text>
                    </View>
                </TouchableOpacity>
                {this._renderModalRegionSelect()}
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
        tabBarTextStyle: {
            fontSize: 12
        },
        tabBarUnderlineStyle: {
            height: 0.5,
            backgroundColor: 'red',
        }, tabContainerStyle: {
            height: 40,
            //alignItems: 'center',
            //justifyContent: 'center',
            paddingLeft: 2,
            paddingRight: 2,
        },
        tabStyle: {
            //height: 49,
            //alignItems: 'center',
            //justifyContent: 'center',
            paddingLeft: 2,
            paddingRight: 2,
        },
        tabsContainerStyle: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
        },
        tabTextStyle: {
            height: 30,
        }
    }
    )
;