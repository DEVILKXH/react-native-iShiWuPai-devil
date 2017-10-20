/**
 * Created by ljunb on 16/8/21.
 */
import React, {PureComponent} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {inject, observer} from "mobx-react/native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import FeedsCategoryBar from "../../components/FeedsCategoryBar";
import FeedDelicacyList from "../../pages/feed/FeedDelicacyList";
import MenuItems from "../../components/MenuItems";


const listurl = "http://food.boohee.com/fb/v1/feeds/category_feed"
const module = 3

@inject('account')
@observer
export default class Home extends PureComponent {

    componentWillMount(){
        this.state = {
            isVisiable: false
        }
    }

    onPressAction = () => {
        this.setState({isVisiable: !this.state.isVisiable});
    }

    onMenuPress = (value) =>{
        this.setState({isVisiable: !this.state.isVisiable});
        switch (value){
            case "myScanner":
                this.props.navigator.push({
                    id: 'Scanner',
                    passProps: {
                        onBarCodeRead: obj => alert(JSON.stringify(obj))
                    }
                })
                break;
            default:
                alert(value)
        }
    }

    onPress = (murl) => {
        Linking.canOpenURL('tableau://').then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL('tableau://');
            } else {
                ToastAndroid.show(`请先安装XXX`,ToastAndroid.SHORT);
            }
        });
        // alert(murl);
    }
    render() {
        const {navigator} = this.props;
        let isVisiable = this.state.isVisiable
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={[styles.header, {borderBottomWidth: gScreen.onePix}]}>
                        <Text>消息</Text>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            style={styles.photo}
                            onPress={this.onPressAction}
                        >
                            <Image
                                style={{width: 20, height: 20}}
                                source={require('../../resource/ic_analyze_search_red.png')}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                    <FeedDelicacyList
                        navigator={navigator}
                        listurl={listurl}
                        moduleId={module}
                    />
                    {isVisiable?
                        <MenuItems onMenuPress={this.onMenuPress}/>:<View/>
                    }
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: gScreen.navBarHeight,
        paddingTop: gScreen.navBarPaddingTop,
        alignItems: 'center',
        borderBottomColor: '#d9d9d9',
        backgroundColor: 'white',
        justifyContent: 'center'
    },
    photo: {
        width: __IOS__ ? 44 : 50,
        height: __IOS__ ? 44 : 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: 0,
        top: gScreen.navBarPaddingTop
    }
})