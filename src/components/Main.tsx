import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { styles } from '../../App'

import { connect } from 'react-redux'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { fetchUser } from '../redux/actions/index'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Feed } from './main/Feed';

import { Profile } from './main/Profile';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'


const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => null

export class Main extends Component {
    // static propTypes = {
    // }

    componentDidMount() {
        this.props.fetchUser();
    }


    render() {
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen
                    name="Feed"
                    component={Feed}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialCommunityIcons name="home" color={color} size={26} />
                        )
                    }} />
                <Tab.Screen
                    name="AddImageContainer"
                    component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: (e: Event) => {
                            e.preventDefault()
                            navigation.navigate("Add")
                        }
                    })}
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                        )
                    }} />
                <Tab.Screen
                    name="Profile"
                    component={Profile} 
                    options={{
                        tabBarIcon: ({ color, size, focused }) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                        )
                    }} />
                {/* <Tab.Screen name="Settings" component={Login} /> */}
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store: { userState: { currentUser: any } }) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({ fetchUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Main)
