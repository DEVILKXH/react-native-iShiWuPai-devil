/**
 * Created by Devil on 2017/10/13.
 */


import React, {PureComponent} from 'react'
import {
    StyleSheet,
    View,
    ListView,
    ScrollView,
    RefreshControl
} from 'react-native'
import {observer,inject} from 'mobx-react/native'
import {reaction} from 'mobx'
import Loading from '../../components/Loading'
import LoadMoreFooter from '../../components/LoadMoreFooter'
import FeedSingleImageCell from '../../components/FeedSingleImageCell'
import FeedMultiImageCell from '../../components/FeedMultiImageCell'
import Toast from 'react-native-easy-toast'
import FeedBaseStore from '../../store/feedBaseStore'
import FeedsCategoryBar from "../../components/FeedsCategoryBar";
import ScrollableTabView from "react-native-scrollable-tab-view";
import MenuCategoryItem from "./MenuCategoryItem"

@inject('account')
@observer
export default class MenuCategory extends PureComponent{

    constructor(props){
        super(props);
        this.tableNames = props.tableName
        this.controllers = props.controllers
    }

    render (){
        let controllers = this.controllers
        const {navigator} = this.props;
        return (
            <ScrollableTabView
                renderTabBar={() =>  <FeedsCategoryBar tabNames={this.tableNames}/> }
                tabBarPosition='top'
                scrollWithoutAnimation={false}
            >
                {controllers.map((data,index) => {
                    let controller = data.listurl
                    return (
                        <MenuCategoryItem
                            listurl={controller}
                            tabLabel={index}
                            navigator={navigator}
                            key={index}/>
                    )
                })}
            </ScrollableTabView>
        )
    }
}
