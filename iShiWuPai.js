/**
 * Created by ljunb on 2017/5/25.
 */
import React from 'react'
import {Animated, StyleSheet, View, Text, AppRegistry} from 'react-native'
import {Provider} from 'mobx-react/native'
import stores from './src/store'
import NetInfoDecorator from './src/common/NetInfoDecorator'
import UmengPush from  'react-native-umeng-push'
import MyStorage from './src/store/MyStorage'
import App from './src'

if (!__DEV__) {
    global.console = {
        log: () => {}
    }
}

//获取DeviceToken
UmengPush.getDeviceToken(deviceToken => {
    console.log("deviceToken: ", deviceToken);
});

//接收到推送消息回调
UmengPush.didReceiveMessage(message => {
    console.log("didReceiveMessage:", message);
});

//点击推送消息打开应用回调
UmengPush.didOpenMessage(message => {
    console.log("didOpenMessage:", message);
});

@NetInfoDecorator
export default class Root extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            promptPosition: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isConnected} = nextProps
        // 无网络
        if (!isConnected) {
            Animated.timing(this.state.promptPosition, {
                toValue: 1,
                duration: 200
            }).start(() => {
                setTimeout(() => {
                    Animated.timing(this.state.promptPosition, {
                        toValue: 0,
                        duration: 200
                    }).start()
                }, 2000);
            })
        }
    }

    render() {
        let positionY = this.state.promptPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-30, __IOS__ ? 20 : 0]
        });
        return (
            <View style={{flex: 1}}>
                <Provider {...stores}>
                    <App />
                </Provider>
                <Animated.View style={[styles.netInfoView, {top: positionY}]}>
                    <Text style={styles.netInfoPrompt}>欢迎您</Text>
                </Animated.View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    netInfoView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        position: 'absolute',
        right: 0,
        left: 0,
        backgroundColor: gColors.theme
    },
    netInfoPrompt: {
        color: 'white',
        fontWeight: 'bold'
    }
})

AppRegistry.registerComponent('iShiWuPai', () => Root)