import React, { Component } from 'react';
import { Platform, TouchableOpacity,AppRegistry, Image,View,Text, Button, PermissionsAndroid, StyleSheet } from 'react-native';
import Card from './Card'
import Constants from 'expo-constants'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import store from './redux/store'

export default class MyCart extends Component {
  state = {
    errorMessage: null,
  };

  render() {
    const {location, items} = this.state
    console.log("---------fff-------",store.getState())
    const mainStore = store.getState()
    // let storeInside = store.getState()
    return (
      <View>
          <Text style={styles.titleText} >Your Cart</Text>
          {mainStore.cartItems.map(item =>(
            <Text style={styles.baseText} key={mainStore.cartItems.indexOf(item)}>{item.name}</Text>
          ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'sans-serif',
    justifyContent: 'center',
    textAlign: 'center'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center'
  },
});

// export default withRouter(HelloWorld)
