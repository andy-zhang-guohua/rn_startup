'use strict';

import React, {Component} from 'react';
import {Animated, FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Screen from '../common/Screen';
import ScrollableTabView from 'react-native-scrollable-tab-view';

/**
 * 中国省市区选择组件,模态
 * 输入 : SelectableTree  形式提供的中国省市区三级树形结构数据 (可带有已选择路径)
 * 支持操作 :
 *  1.用户可通过该组件选择一条路径 : 省-市-区(县)
 *  2.输入一条 省-市-区(县) 路径，该控件展开时可展示该路径
 *  3.设计规定的屏幕水平滚动动画效果
 *  4.一旦路径选择完成关闭控件，记录所选择路径到输入的 SelectableTree 对象，调用外部指定回调
 */
const DEFAULT_BREADCRUMB_ITEM = "请选择";
const _TAB_WIDTH = 80;

class CustomTabBar extends Component {
    constructor(props) {
        super(props)

        this.renderTab = this.renderTab.bind(this);
    }

    renderTab(name, page, isTabActive, onPressHandler) {
        const {activeTextColor, inactiveTextColor, textStyle,} = this.props;
        const textColor = isTabActive ? activeTextColor : inactiveTextColor;
        const fontWeight = isTabActive ? 'bold' : 'normal';


        return <TouchableOpacity
            style={{width: _TAB_WIDTH}}
            key={name}
            accessible={true}
            accessibilityLabel={name}
            accessibilityTraits='button'
            onPress={() => onPressHandler(page)}
        >
            <View style={[styles.tab]}>
                <Text style={[{color: textColor, fontWeight,}, textStyle,]}>
                    {name}
                </Text>
            </View>
        </TouchableOpacity>;
    }

    render() {
        const tabUnderlineStyle = {
            position: 'absolute',
            width: _TAB_WIDTH,
            height: 0.5,
            backgroundColor: '#2cb6ff',
            bottom: 0,
        };

        const translateX = this.props.scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, _TAB_WIDTH],
        });

        return (
            <View style={[styles.tabs, {backgroundColor: this.props.backgroundColor}]}>
                {this.props.tabs.map((name, page) => {
                    const isTabActive = this.props.activeTab === page;
                    const renderTab = this.props.renderTab || this.renderTab;
                    return renderTab(name, page, isTabActive, this.props.goToPage);
                })}
                <Animated.View
                    style={[
                        tabUnderlineStyle,
                        {
                            transform: [
                                {translateX},
                            ]
                        }
                    ]}
                />
            </View>
        );
    }
};
export default class ModalRegionSelect extends Component {

    constructor(props) {
        super(props)

        const regions = props.regions;
        const breadcrumb = this._getBreadcrumbItems(regions);
        const currentLevel = breadcrumb.length - 1;
        this.state = {
            regions: regions,
            currentLevel: currentLevel,
            breadcrumb: breadcrumb,
        }

        this.scrollTabView = null;
        this._onPressRegionItem = this._onPressRegionItem.bind(this);
    }

    // 空布局
    _renderEmptyPanelRegionItems = () => (
        null
    );

    _getBreadcrumbItems(regions) {
        const path = regions.getSelectedPathNodesWithoutChildren();
        const items = [];

        let level = 0;
        for (; level < path.length; level++) {
            const node = path[level];
            if (!node)
                break;

            const item = node.value ? node.value : node;
            items.push(item);
        }

        if (level < path.length) {
            items.push(DEFAULT_BREADCRUMB_ITEM)
        }

        return items;
    }

    _onChangeTab = ({i, ref}) => {
        const targetLevel = i;
        this.setState({
            currentLevel: targetLevel,
        });
    };

    _onPressRegionItem(item) {
        const currentLevel = this.state.currentLevel;
        const regions = this.state.regions;
        regions.select(currentLevel, item);
        const breadcrumb = this.state.breadcrumb.slice(0, currentLevel);
        breadcrumb[currentLevel] = item.value;
        if (currentLevel < regions.depth - 1) {
            breadcrumb.push(DEFAULT_BREADCRUMB_ITEM);
            this.setState({
                currentLevel: currentLevel + 1,
                breadcrumb: breadcrumb
            }, () => {
                this.scrollTabView && this.scrollTabView.goToPage(this.state.currentLevel);
            });

            return;
        }

        this.props.onResult && this.props.onResult();
    }

    _styleRegionItem(item) {
        const currentLevel = this.state.currentLevel;
        const breadcrumb = this.state.breadcrumb;

        const selected = item.value ? item.value === breadcrumb[currentLevel] : item === breadcrumb[currentLevel];
        if (selected) {
            return {marginTop: 5, marginLeft: 10, fontSize: 14, color: "#2cb6ff"};
        }
        return {marginTop: 5, marginLeft: 10, fontSize: 14};
    }

    _renderRegionItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => this._onPressRegionItem(item)}>
                <Text style={this._styleRegionItem(item)}>{item.value}</Text>
            </TouchableOpacity>
        );
    };


    _onCancel() {
        this.props.onCancel && this.props.onCancel();
    }

    _nodesForLevel(level) {
        const regions = this.state.regions;
        if (level === 0)
            return regions.children;

        const selectedPathNodes = regions.getSelectedPathNodes();
        const parentNode = selectedPathNodes[level - 1];
        if (!parentNode)
            return [];

        return parentNode.children;
    }

    _renderTabBar = () => {
        return (<CustomTabBar/>);
    }

    _renderPanelTabs() {
        let itemIndex = 0;
        const _self = this;
        return this.state.breadcrumb.map((item) => {
            const view = _self._renderPanelTab(itemIndex, item)
            itemIndex++;
            return view;
        });
    }

    _renderPanelTab(itemIndex, title) {
        return (<View tabLabel={title}>
            {this._renderPanelTabRegionItems(itemIndex)}
        </View>);
    }

    _renderPanelTabRegionItems(level) {
        const data = this._nodesForLevel(level);
        return (
            <FlatList
                data={data}
                renderItem={this._renderRegionItem}
                keyExtractor={(item) => item.key}
                ListEmptyComponent={this._renderEmptyPanelRegionItems}
                extraData={this.state}
            />
        );
    }

    render() {
        const currentLevel = this.state.currentLevel;
        return (
            <Modal transparent={true} animationType={'fade'} onRequestClose={() => this._onCancel()}>
                <TouchableOpacity style={styles.overlayClickToCancel} onPress={() => this._onCancel()}/>
                <ScrollableTabView style={styles.container} initialPage={this.state.currentLevel}
                                   renderTabBar={() => this._renderTabBar()}
                                   onChangeTab={this._onChangeTab}
                                   tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                                   tabBarTextStyle={styles.tabBarTextStyle}
                                   tabBarActiveTextColor={'#2cb6ff'}
                                   tabBarInactiveTextColor={'gray'}
                                   ref={(scrollTabView) => {
                                       this.scrollTabView = scrollTabView;
                                   }}
                >
                    {this._renderPanelTabs()}
                </ScrollableTabView>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        padding: 10
    },
    overlayClickToCancel: {
        height: Screen.height / 2,
        opacity: 0.6,
        backgroundColor: "#333"
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: _TAB_WIDTH,
        paddingBottom: 0,
    },
    tabs: {
        height: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderWidth: 0.5,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderColor: '#ccc',
    },
});
