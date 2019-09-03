import React, { Component } from 'react'
import { Platform, TouchableOpacity,AppRegistry, Image,View,Text, Button, PermissionsAndroid } from 'react-native';
import { Card } from 'react-native-elements';
import { ToastAndroid } from 'react-native';
import { addToCart } from './redux/actions'
import { createStore } from 'redux'
import reducer from './redux/reducer'

// const store = createStore(reducer)
import store from './redux/store'

class Cards extends Component {
  render () {
    const { name } = this.props
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            ToastAndroid.show(`You added ${name} to the cart.`, ToastAndroid.SHORT)
            store.dispatch(addToCart({name: name}))
            console.log("----------------",store.getState())
          }}>
          <Card
            title={name}
          >
          </Card>
        </TouchableOpacity>
      </View>
    )
  }
}
// addToCart(name)

export default Cards
