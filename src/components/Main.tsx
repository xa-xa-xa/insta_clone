import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import { styles } from '../../App'

import { connect } from 'react-redux'
import { AnyAction, bindActionCreators, Dispatch } from 'redux'
import { fetchUser } from '../redux/actions/index'

export class Main extends Component {
    // static propTypes = {

    // }

    componentDidMount() {
        this.props.fetchUser();
    }


    render() {
        const { currentUser } = this.props
        console.log("currentUser:", currentUser)
        return (
            !currentUser?.email ? <View style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
                <Text>Loading user data...</Text>
            </View> : <View style={styles.container}>
                    <Text>
                        {`User '${currentUser?.email}' is LoggedIn`}</Text>
                </View>
        )
    }
}

const mapStateToProps = (store: { userState: { currentUser: any } }) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators({ fetchUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Main)
