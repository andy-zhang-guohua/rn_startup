import React, {Component} from 'react';
import {Alert, Button, Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DropdownMenu from 'react-native-dropdown-menu';


class DropDownMenuTestScreen extends Component {
    static navigationOptions = {
        title: '下拉菜单有关测试',
    };

    constructor() {
        super();

        this.state = {};


    }


    componentDidMount() {

    }


    render() {
        var data = [["C", "Java", "JavaScript"], ["Python", "Ruby"], ["Swift", "Objective-C"]];
        return (
            <View style={styles.container}>
                <DropdownMenu style={{flex: 1}}
                              arrowImg={require('../assets/images/dropdown-menu/dropdown_arrow.png')}      //set the arrow icon, default is a triangle
                              checkImage={require('../assets/images/dropdown-menu/menu_check.png')}    //set the icon of the selected item, default is a check mark
                              bgColor={"blue"}                            //the background color of the head, default is grey
                              tintColor={"white"}                        //the text color of the head, default is white
                              selectItemColor={"red"}                    //the text color of the selected item, default is red
                              data={data}
                              maxHeight={410}                            // the max height of the menu
                              handler={(selection, row) => alert(data[selection][row])}>

                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text>
                            Your own view Here 1
                        </Text>
                        <Text>
                            将你自己的视图内容放在这里
                        </Text>
                        <Text>
                            Your own view Here 3
                        </Text>
                        <Text>
                            Your own view Here 4
                        </Text>
                        <Text>
                            Your own view Here 5
                        </Text>
                        <Text>
                            Your own view Here 6
                        </Text>
                    </View>

                </DropdownMenu>
            </View>
        );
    }
}

export default DropDownMenuTestScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF',
        margin: 10,
    },
});