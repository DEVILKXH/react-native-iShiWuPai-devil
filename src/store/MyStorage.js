/**
 * Created by Devil on 2017/10/9.
 */

import React, { Component } from 'react'
import Storage from 'react-native-storage'
import { AsyncStorage } from 'react-native'


let storage
let defaultExpires = 1000*3600*24*7
let size = 1000
export default class MyStorage extends Component{

    static getInit(){
        if(storage == undefined){
            storage = new Storage({
                size: size,
                storageBackend: AsyncStorage,
                defaultExpires: defaultExpires,
                enableCache: true
            });
        }
        return storage
    }

    static save(key,data,expires,callback){
        myExpires = expires || defaultExpires

        storages = this.getInit()
        storages.save({
            key: key,
            data: data,
            expires: myExpires
        }).then(ret =>{
            if(callback){
                callback()
            }
        })
    }

    static load(key,callback){
        storages = this.getInit()
        storages.load({
            key: key
        }).then(ret => {
            if(callback){
                callback(ret)
            }
        }).catch(err => {
            if(callback){
                callback(null)
            }
        })
    }

    static remove(key,callback){
        storages = this.getInit()
        storages.remove({
            key: key
        }).then(ret => {
            if(callback){
                callback()
            }
        })
    }

    static removeAll(key,callback){
        storages = this.getInit()
        storages.clearMapForKey(key)
        if(callback){
            callback()
        }
    }
}