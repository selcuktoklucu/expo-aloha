import React, { Component } from 'react'
import { Platform, TouchableOpacity,AppRegistry, Image,View,Text, Button, PermissionsAndroid } from 'react-native';
import CardView from 'react-native-cardview'

class Card extends Component {
  render () {
    const { name } = this.props
    return (
      <View>
        <CardView
          cardElevation={2}
          cardMaxElevation={2}
          cornerRadius={5}>
          <Text>
              Elevation 0
          </Text>
        </CardView>
        <Text>* {name} </Text>
      </View>
    )
  }
}

export default Card
