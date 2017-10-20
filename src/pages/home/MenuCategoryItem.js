/**
 * Created by Devil on 2017/10/13.
 */

import React, {PureComponent} from "react";
import {StyleSheet, View,TouchableOpacity,Image,Text,Linking,RefreshControl,ScrollView} from "react-native";
import {observer} from "mobx-react/native";
import {reaction} from "mobx";
import Loading from "../../components/Loading";
import Toast from "react-native-easy-toast";
import FoodEncyclopediaStore from "../../store/foodEncyclopediaStore";

@observer
export default class MenuCategoryItem extends PureComponent{

    constructor(props){
        super(props)
        this.foodEncyclopediaStore = new FoodEncyclopediaStore(this.props.listurl)
    }

    componentDidMount() {
        reaction(
            () => this.foodEncyclopediaStore.page,
            () => this.foodEncyclopediaStore.fetchCategoryList()
        );
    }

    componentWillReact() {
        const {errorMsg} = this.foodEncyclopediaStore
        errorMsg && this.toast && this.toast.show(errorMsg)
    }

    _onRefresh = () => {
        this.foodEncyclopediaStore.isRefreshing = true;
        this.foodEncyclopediaStore.fetchCategoryList()
    };

    onPress = (murl) => {
        Linking.canOpenURL(murl).then(supported => { // weixin://  alipay://
            if (supported) {
                Linking.openURL(murl);
            } else {
                ToastAndroid.show(`请先安装XXX`,ToastAndroid.SHORT);
            }
        });
    }
    render () {
        const {foodCategoryList,isFetching,isRefreshing} = this.foodEncyclopediaStore
        return (
            <ScrollView style={{flex: 1,backgroundColor: 'white'}}
                  refreshControl={
                      <RefreshControl
                          refreshing={isRefreshing}
                          onRefresh={this._onRefresh}
                          colors={['rgb(217, 51, 58)']}
                      />
                  }
            >
                {!isFetching &&
                    <View style={styles.categoryContainer}>
                        {foodCategoryList.map(foodCategory => {
                            return (
                                <TouchableOpacity
                                    key={foodCategory.mindex}
                                    style={styles.category}
                                    onPress={() => {this.onPress(foodCategory.murl)}}
                                >
                                    <Image
                                        style={styles.categoryIcon}
                                        source={{uri: foodCategory.mimageView}}
                                        resizeMode="contain"
                                    />
                                    <Text style={styles.categoryTitle}>{foodCategory.mtitle}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                }
                <Loading isShow={isFetching}/>
                <Toast ref={toast => this.toast = toast}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    category: {
        width: (gScreen.width - 16 * 2) / 3,
        height: 65,
        alignItems: 'center',
        marginBottom: 25,
    },
    categoryIcon: {
        width: 40,
        height: 40,
    },
    categoryTitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },
    categoryContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        width: gScreen.width - 16 * 2,
    },
})