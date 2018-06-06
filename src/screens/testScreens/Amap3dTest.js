import React, {Component} from 'react';
import {
    Alert,
    Button,
    Dimensions,
    Image,
    Platform,
    StyleSheet,
    Switch,
    Text,
    Picker,
    TouchableOpacity,
    View
} from 'react-native';
import {MapView} from 'react-native-amap3d'

export default class Amap3dTestScreen extends Component {
    static navigationOptions = ({navigation}) => {
        const {state, setParams} = navigation
        state.params = state.params || {mapType: 'standard'}
        const props = {
            mode: 'dropdown',
            style: {width: 100, color: 'white'},
            selectedValue: state.params.mapType,
            onValueChange: mapType => setParams({mapType}),
        }
        return {
            title: '高德地图',
            headerRight: (
                <Picker {...props}>
                    <Picker.Item label="标准" value="standard"/>
                    <Picker.Item label="卫星" value="satellite"/>
                    <Picker.Item label="导航" value="navigation"/>
                    <Picker.Item label="夜间" value="night"/>
                    <Picker.Item label="公交" value="bus"/>
                </Picker>
            ),
        }
    }

    constructor() {
        super();

        this.state = {
            time: new Date(),
            showsCompass: false,
            showsScale: true,
            showsZoomControls: true,
            showsLocationButton: false,
        }


    }

    componentDidMount() {
        this.mounted = true
        this.interval = setInterval(() => {
            if (this.mounted) {
                this.setState({time: new Date()})
            }
        }, 1000)
    }

    componentWillUnmount() {
        this.mounted = false;
        this.interval && clearInterval(this.interval);
    }

    _onInfoWindowPress = () => Alert.alert('你点击了  密云水库')

    _animatedToZGC = () => {
        this.mapView.animateTo({
            tilt: 45,
            rotation: 90,
            zoomLevel: 18,
            coordinate: {
                latitude: 39.97837,
                longitude: 116.31363,
            },
        })
    }

    _animatedToTAM = () => {
        this.mapView.animateTo({
            tilt: 0,
            rotation: 0,
            zoomLevel: 16,
            coordinate: {
                latitude: 39.90864,
                longitude: 116.39745,
            },
        })
    }

    render() {
        return (
            <View style={StyleSheet.absoluteFill}>
                <View style={styles.controls}>
                    <View style={styles.control}>
                        <Text>指南针</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={showsCompass => this.setState({showsCompass})}
                            value={this.state.showsCompass}
                        />
                    </View>
                    <View style={styles.control}>
                        <Text>比例尺</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={showsScale => this.setState({showsScale})}
                            value={this.state.showsScale}
                        />
                    </View>
                    <View style={styles.control}>
                        <Text>定位</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={showsLocationButton => this.setState({showsLocationButton})}
                            value={this.state.showsLocationButton}
                        />
                    </View>
                    <View style={styles.control}>
                        <Text>缩放</Text>
                        <Switch
                            style={styles.switch}
                            onValueChange={showsZoomControls => this.setState({showsZoomControls})}
                            value={this.state.showsZoomControls}
                        />
                    </View>
                </View>
                <MapView ref={ref => this.mapView = ref}
                         locationEnabled={this.state.showsLocationButton}
                         showsCompass={this.state.showsCompass}
                         showsScale={this.state.showsScale}
                         showsLocationButton={this.state.showsLocationButton}
                         showsZoomControls={this.state.showsZoomControls}
                         style={styles.map}
                         mapType={this.props.navigation.state.params.mapType}
                         //locationInterval={10000}
                         distanceFilter={10}
                         onLocation={
                             ({nativeEvent}) => {
                                 console.log(`当前位置 : ${nativeEvent.latitude}, ${nativeEvent.longitude}`);
                                 console.log(JSON.stringify(nativeEvent));
                             }
                         }
                >
                    <MapView.Marker
                        draggable
                        title='云商企服网络科技(北京)有限公司'
                        onDragEnd={({nativeEvent}) =>
                            console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
                        coordinate={{
                            latitude: 40.0058,
                            longitude: 116.414362,
                        }}
                    />
                    <MapView.Marker
                        active
                        draggable
                        title='云商企服网络科技(北京)有限公司'
                        onDragEnd={({nativeEvent}) =>
                            console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
                        coordinate={{
                            latitude: 40.0058,
                            longitude: 116.414362,
                        }}
                    />
                    <MapView.Marker
                        draggable
                        color="green"
                        onDragEnd={({nativeEvent}) =>
                            console.log(`${nativeEvent.latitude}, ${nativeEvent.longitude}`)}
                        coordinate={{
                            latitude: 40.481093,
                            longitude: 116.96915,
                        }}
                    >
                        <TouchableOpacity activeOpacity={0.9} onPress={this._onInfoWindowPress}>
                            <View style={styles.customInfoWindow}>
                                <Text>{'密云水库'}</Text>
                            </View>
                        </TouchableOpacity>
                    </MapView.Marker>
                    <MapView.Marker
                        title="国风美堂综合楼"
                        icon={() => (
                            <View style={styles.customMarker}>
                                <Text style={styles.markerText}>{this.state.time.toLocaleTimeString()}</Text>
                            </View>
                        )}
                        coordinate={{
                            latitude: 40.073681,
                            longitude: 116.360567,
                        }}
                    />
                </MapView>
                <View style={styles.buttons}>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this._animatedToZGC}>
                            <Text style={styles.text}>中关村</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={this._animatedToTAM}>
                            <Text style={styles.text}>天安门</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 0,
    },
    customIcon: {
        width: 40,
        height: 40,
    },
    customInfoWindow: {
        backgroundColor: '#8bc34a',
        padding: 10,
        borderRadius: 10,
        elevation: 4,
        borderWidth: 2,
        borderColor: '#689F38',
        marginBottom: 5,
    },
    customMarker: {
        backgroundColor: '#009688',
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
    },
    markerText: {
        color: '#fff',
    },
    map: {
        flex: 1,
        ...Platform.select({
            ios: {
                marginBottom: 72,
            },
        }),
    },
    controls: {
        height: 72,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 4,
        paddingLeft: 20,
        paddingRight: 20,
        ...Platform.select({
            android: {
                backgroundColor: '#f5f5f5',
            },
            ios: {
                backgroundColor: '#fff',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                borderTopColor: '#e0e0e0',
                borderTopWidth: StyleSheet.hairlineWidth,
                zIndex: 1,
            },
        }),
    },
    control: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    switch: {
        marginTop: 5,
    },
    buttons: {
        width: Dimensions.get('window').width,
        position: 'absolute',
        bottom: 4,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    text: {
        fontSize: 16,
    },
});