/**
 * Created by Devil on 2017/10/10.
 */
import React, {Component} from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native'
import Menu,{MenuContext,MenuOptions,MenuOption,MenuTrigger} from 'react-native-menu'


const HeaderView = ({isVisiable,onPressAction,title}) => {

    return (
        <View>
            <View style={[styles.header, {borderBottomWidth: gScreen.onePix}]}>
                <Text>{title}</Text>
                <TouchableOpacity
                    activeOpacity={0.75}
                    style={styles.photo}
                    onPress={onPressAction}
                >
                    <Image
                        style={{width: 20, height: 20}}
                        source={require('../resource/ic_analyze_search_red.png')}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            {isVisiable?
                <View style={{position: "absolute",zIndex: 0, top: 10,width: 100,height: 80, backgroundColor: "#ccc"}}>
                    <Text>消息中心</Text>
                    <Text>我的好友</Text>
                    <Text>扫一扫</Text>
                </View>:<View/>
            }
        </View>
    )
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

export default HeaderView