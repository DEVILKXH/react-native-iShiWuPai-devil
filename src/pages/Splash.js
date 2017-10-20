/**
 * Created by ljunb on 16/8/21.
 */
import React, { Component } from 'react'
import { Image } from 'react-native'
import Storage from  '../store/MyStorage'

export default class Splash extends Component {
    componentDidMount() {
        const { navigator } = this.props
        Storage.load('data',(data) => {
            if(null == data || undefined == data){
                this.timer = setTimeout(()=>{
                    navigator.resetTo({id: 'Login'})
                },2000)
                this.props.isConnected = false
            }else{
                this.props.isConnected = true
                this.timer = setTimeout(()=>{
                    navigator.resetTo({id: 'TabBarView'})
                },2000)
            }
        })
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        return (
            <Image
                style={{width: gScreen.width, height: gScreen.height}}
                source={require('../resource/img_intro_4.png')}
            />
        )
    }
}