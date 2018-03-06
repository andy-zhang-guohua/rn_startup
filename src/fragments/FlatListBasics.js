import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { log } from '../utils/LogUtils'

export default class FlatListBasics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentIndex: 1
        };

        this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this);
    }


    onViewableItemsChanged = ({ viewableItems }) => {
        viewableItems.forEach((item) => {
            const { isViewable, key } = item;
            if (isViewable) {
                log(item);
            }
        });
    }

    _renderItem(item) {
        let img = item.img;

        return (
            <View>
                <Image source={img} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList horizontal                
                    onViewableItemsChanged={this.onViewableItemsChanged}
                    data={[
                        { img: require('../images/banner/1.jpg') },
                        { img: require('../images/banner/2.jpg') },
                        { img: require('../images/banner/3.jpg') },
                        { img: require('../images/banner/4.jpg') },
                    ]}
                    renderItem={({ item }) => this._renderItem(item)}
                />
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0
    },
})