import React, {Component} from 'react';
import {
    Alert,
    Button,
    Dimensions,
    Image,
    Picker,
    Platform,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {Geolocation} from "react-native-amap-geolocation"

export default class AmapGeolocationTestScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: '高德地图定位',
        }
    }

    constructor() {
        super();

        this.state = {location: {}}
    }

    async componentDidMount() {
        await Geolocation.init({
            ios: "9bd6c82e77583020a73ef1af59d0c759",
            android: "ab61bced590ceec8037111037f3b2e3c"
        }).catch((error) => {
            console.log(error)
        });
        Geolocation.setOptions({
            interval: 8000,
            distanceFilter: 20,
            //reGeocode: true
        })
        Geolocation.addLocationListener(location =>
            this.updateLocationState(location)
        )
    }

    componentWillUnmount() {
        Geolocation.stop()
    }

    updateLocationState(location) {
        if (location) {
            location.timestamp = new Date(location.timestamp).toLocaleString()
            this.setState({location})
            console.log(location)
        }
    }

    startLocation = () => {
        console.log(new Date(), '开始定位');
        Geolocation.start();
    }
    stopLocation = () => {
        console.log(new Date(), '停止定位');
        Geolocation.stop();
    }
    getLastLocation = async () => {
        console.log(new Date(), '获取定位信息', location);
        this.updateLocationState(await Geolocation.getLastLocation());
    }

    render() {
        const {location} = this.state;
        return (
            <View style={styles.body}>
                <View style={styles.controls}>
                    <Button
                        style={styles.button}
                        onPress={this.startLocation}
                        title="开始定位"
                    />
                    <Button
                        style={styles.button}
                        onPress={this.stopLocation}
                        title="停止定位"
                    />
                </View>
                {Object.keys(location).map(key => (
                    <View style={style.item} key={key}>
                        <Text style={styles.label}>{key}</Text>
                        <Text>{location[key]}</Text>
                    </View>
                ))}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    body: {
        padding: 16
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 12,
        marginBottom: 24
    },
    item: {
        flexDirection: "row",
        marginBottom: 4
    },
    label: {
        color: "#f5533d",
        width: 120,
        paddingRight: 10,
        textAlign: "right"
    }
});