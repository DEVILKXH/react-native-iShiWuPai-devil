/**
 * Created by ljunb on 2016/12/9.
 * 食物百科页面
 */
import React, {PureComponent,Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    ToastAndroid,
    Linking
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components'
import {observer, inject} from 'mobx-react/native'
import NetInfoDecorator from '../../common/NetInfoDecorator'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import MenuItems from '../../components/MenuItems'
import FeedsCategoryBar from "../../components/FeedsCategoryBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import MenuCategory from "./MenuCategory"

const titles = ['EKP', 'EIP', 'tableau', 'unkwon',"unknow2","unknow2"];
// const titles = ['EKP', 'EIP', 'tableau'];
// const titles = ['EKP', 'EIP'];
const controllers = [
    {categoryId: 1, listurl: 'http://172.18.127.108/api/menu', moduleId: 3},
    {categoryId: 2, listurl: 'http://172.18.127.108/api/menu', moduleId: 4},
    {categoryId: 3, listurl: 'http://172.18.127.108/api/menu', moduleId: 3},
    {categoryId: 4, listurl: 'http://172.18.127.108/api/menu', moduleId: 4},
    {categoryId: 5, listurl: 'http://172.18.127.108/api/menu', moduleId: 4},
    {categoryId: 6, listurl: 'http://172.18.127.108/api/menu', moduleId: 4}
]

@NetInfoDecorator
@inject('account', 'app')
@observer
export default class FoodEncyclopedia extends Component {

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

    render() {
        const {isConnected} = this.props
        let isVisiable = this.state.isVisiable

        return (
            <View style={{flex: 1}}>
                <View>
                    <View style={[styles.header, {borderBottomWidth: gScreen.onePix}]}>
                        <Text>工作台</Text>
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
                    <Image
                        style={styles.headerContainer}
                        source={require('../../resource/img_home_bg.png')}
                    >
                        <Image
                            style={styles.headerLogo}
                            source={require('../../resource/ic_head_logo.png')}
                            resizeMode="contain"
                        />
                    </Image>
                    {isVisiable?
                        <MenuItems onMenuPress={this.onMenuPress}/>:<View/>
                    }
                </View>
                {isConnected ?
                    <MenuCategory tableName={titles} controllers={controllers}/>: <ReconnectView onPress={this._reconnectHandle}/>}
            </View>
        )

    }
}

const ReconnectView = ({onPress}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
            onPress={onPress}
        >
            <Text>网络出错，点击重试~</Text>
        </TouchableOpacity>
    )
}


const LogoView = (isVisiable) => {
    return (
        <View>
            <Image
                style={styles.headerContainer}
                source={require('../../resource/img_home_bg.png')}
            >
                <Image
                    style={styles.headerLogo}
                    source={require('../../resource/ic_head_logo.png')}
                    resizeMode="contain"
                />
            </Image>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        height: 220,
        width: gScreen.window,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: __IOS__ ? 20 + 15 : 15,
        paddingBottom: 28,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(1,1,1,0)',
        overflow: 'hidden'
    },
    headerLogo: {
        width: 66,
        height: 24,
    },
    headerSearchContainer: {
        height: 50,
        width: gScreen.width - 16 * 2,
        backgroundColor: 'white',
        borderRadius: 4,
        alignItems: 'center',
        flexDirection: 'row'
    },
    foodHandleContainer: {
        height: 60,
        width: gScreen.width - 16 * 2,
        backgroundColor: 'white',
        marginTop: 10,
        marginLeft: 16,
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: 'gray',
        shadowOpacity: 0.3,
        shadowOffset: {width: 1, height: -1},
        shadowRadius: 2,
    },
    handelItem: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 5
    },
    line: {
        height: 50,
        width: 0.5,
        backgroundColor: '#d9d9d9'
    },
    groupHeader: {
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    },

})