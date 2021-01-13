import React from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { styles } from '../../../App'

export const Feed = (props) => {
    return (
        <View style={styles.container}>
            <Text>Feed</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
