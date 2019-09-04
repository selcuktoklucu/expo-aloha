import React, { Component } from 'react';
import { ScrollView,Platform, TouchableOpacity,AppRegistry, Image,View,Text, Button, PermissionsAndroid } from 'react-native';
import Card from './Card'
import Constants from 'expo-constants'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {connect} from 'react-redux'
import store from './redux/store'

class MenuScreen extends Component {
  state = {
    location: {
      coords: {
        latitude: 0,
        longitude: 0
      }
    },
    items: ['Cheese Pizza','Peperoni Pizza','Chicken Cutlet Sub','Steak and Cheese','Coke', 'Water','Tuna sub','Calzone','French fries','Onion Rings','Chicken Ceasar Wrap','Mozzarella Sticks','Chicken Parm Sub','Turkey Sub','BLT','Hummus wrap','Chicken wings'],
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    console.log('LOCCC', location)
  };

  render() {
    const {location, items} = this.state
    const mainStore = store.getState()

    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    let pic2={
      uri: 'https://sei-roberto.s3.amazonaws.com/1a83b54a90d7abcebe2cd40abee6f13e'
    }
    return (
      <View style={{flex: 1}}>
          <ScrollView>
          {items.map(item =>(
            <Card
              key={items.indexOf(item)}
              name={item}
            />
          ))}
          </ScrollView>
      </View>
    );
  }
}

const getPropsFromStore = state => ({
  cartItems: state.cartItems
})
export default connect(getPropsFromStore)(MenuScreen)
// export default withRouter(HelloWorld)
