import React, {Component} from 'react';
import {
    Alert,
    Button,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import AnimatableExplorerView from './animatableExplorer/AnimatableExplorerView';

class AnimatableTestScreen extends Component {
    static navigationOptions = {
        title: '三方库动画测试',
    };

    constructor() {
        super();

        this.state = {
            modalVisible: false,
        };
    }


    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }


    componentDidMount() {

    }

    handleViewRef = ref => this.view = ref;

    bounce = () => this.view.bounce(3000).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));


    render() {

        return (
            <View style={styles.container}>
                <Animatable.Text animation="zoomInUp">Zoom me up, Scotty</Animatable.Text>
                <Animatable.Text animation="slideInDown" iterationCount={5} direction="alternate">Up and down you
                    go</Animatable.Text>
                <Animatable.Text animation="pulse" easing="ease-out" iterationCount="infinite"
                                 style={{textAlign: 'center'}}>❤</Animatable.Text>
                <TouchableOpacity onPress={() => this.setState({fontSize: (this.state.fontSize || 10) + 5})}>
                    <Animatable.Text transition="fontSize" style={{fontSize: this.state.fontSize || 10}}>Size me up,
                        Scotty</Animatable.Text>
                </TouchableOpacity>
                <TouchableWithoutFeedback onPress={this.bounce}>
                    <Animatable.View ref={this.handleViewRef}>
                        <Text>Bounce me!</Text>
                    </Animatable.View>
                </TouchableWithoutFeedback>
                <Modal animationType="slide"
                       transparent={false}
                       visible={this.state.modalVisible}
                       onRequestClose={() => {
                           this.setModalVisible(false);
                       }}>
                    <TouchableHighlight
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Text>关闭模态对话框</Text>
                    </TouchableHighlight>

                    <AnimatableExplorerView/>
                </Modal>
                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <Text>模态对话框内演示动画</Text>
                </TouchableHighlight>

            </View>
        );
    }
}

export default AnimatableTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
});