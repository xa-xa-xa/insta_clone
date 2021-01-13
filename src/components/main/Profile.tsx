import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { styles } from '../../../App'

export const Profile = (props) => {
    return (
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
