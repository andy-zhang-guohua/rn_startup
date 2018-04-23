'use strict';

import React, {Component} from 'react';
import {FlatList, Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Screen from '../common/Screen';

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
export default class ModalRegionSelect extends Component {

    constructor(props) {
        super(props)

        console.log(props.regions);
        const regions = props.regions;
        const breadcrumb = this._getBreadcrumbItems(regions);
        const currentLevel = breadcrumb.length - 1;
        this.state = {
            regions: regions,
            currentLevel: currentLevel,
            breadcrumb: breadcrumb,
        }

        this._styleBreadcrumbItem = this._styleBreadcrumbItem.bind(this);
        this._onRegionItemSelected = this._onRegionItemSelected.bind(this);
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

    _onRegionItemSelected(item) {
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
            <TouchableOpacity onPress={() => this._onRegionItemSelected(item)}>
                <Text style={this._styleRegionItem(item)}>{item.value}</Text>
            </TouchableOpacity>
        );
    };

    _styleBreadcrumbItem(level) {
        if (this.state.currentLevel === level) {
            return {
                fontSize: 14,
                color: "#2cb6ff",
                borderBottomWidth: 1,
                borderBottomColor: "#2cb6ff",
                display: "flex",
                marginLeft: 10
            }
        }

        return {fontSize: 14, color: "#474747", display: "flex", marginLeft: 10}
    }


    _onCancel() {
        this.props.onCancel && this.props.onCancel();
    }

    _renderBreadcrumb() {
        let itemIndex = 0;
        return <View style={{height: 20, flexDirection: "row"}}>
            {this.state.breadcrumb.map((item) => {
                const view = this._renderBreadcrumbItem(itemIndex, item)
                itemIndex++;
                return view;
            })}
        </View>;
    }

    _renderBreadcrumbItem(level, text) {
        const key = "breadcrumbItem" + level;
        return <Text style={this._styleBreadcrumbItem(level)} key={key}
                     onPress={() => this._onClickBreadcrumbItem(level)}>{text}</Text>;
    }

    _onClickBreadcrumbItem(level) {
        this.setState({
            currentLevel: level,
        });
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

    _nodesForCurrentLevel() {
        const currentLevel = this.state.currentLevel;
        return this._nodesForLevel(currentLevel);
    }


    _renderPanelRegionItems() {
        return <FlatList
            data={this._nodesForCurrentLevel()}
            renderItem={this._renderRegionItem}
            keyExtractor={(item) => item.key}
            ListEmptyComponent={this._renderEmptyPanelRegionItems}
            extraData={this.state}
        />;
    }

    render() {
        return (
            <Modal transparent={true} animationType={'fade'} onRequestClose={() => this._onCancel()}>
                <TouchableOpacity style={styles.overlayClickToCancel} onPress={() => this._onCancel()}/>
                <View style={{flex: 1, backgroundColor: "#fff", padding: 10}}>
                    {this._renderBreadcrumb()}
                    <View style={styles.breadcrumbBottomSeparator}/>
                    {this._renderPanelRegionItems()}
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    overlayClickToCancel: {
        height: Screen.height / 2,
        opacity: 0.6,
        backgroundColor: "#333"
    },
    breadcrumbBottomSeparator: {
        borderBottomWidth: 0.5,
        borderBottomColor: "#ddd",
        marginTop: 0
    }
});
