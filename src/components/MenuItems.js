/**
 * Created by Devil on 2017/10/11.
 */
import React, {Component} from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native'

const MenuItems = ({onMenuPress}) => {
    return (
        <View style={styles.menu}>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {onMenuPress("myInfos")}}
            >
                <Image
                    style={styles.menuImg}
                    source={require('../resource/ic_home_analyse.png')}
                    resizeMode="contain"
                />
                <Text>消息中心</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {onMenuPress("myFriends")}}
            >
                <Image
                    style={styles.menuImg}
                    source={require('../resource/ic_tag_selected.png')}
                    resizeMode="contain"
                />
                <Text>设置</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => {onMenuPress("myScanner")}}
            >
                <Image
                    style={styles.menuImg}
                    source={require('../resource/ic_scan_compare_selected.png')}
                    resizeMode="contain"
                />
                <Text>扫一扫</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        position: "absolute",
        top: gScreen.navBarHeight,
        right: 10,
        width: 120,
        height: 120,
        backgroundColor: 'white',
        borderBottomColor: "#d9d9d9",
        borderRadius: 4,
    },
    menuItem: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        height: 20,
        justifyContent: "flex-start"
    },
    menuImg: {
        width: 20,
        height: 20,
        marginTop: 2,
        marginRight: 10
    }
})

export default MenuItems
