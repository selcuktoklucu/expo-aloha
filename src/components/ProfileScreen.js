import React, { Component } from 'react';
import { Platform, TouchableOpacity,AppRegistry, Image,View,Text, Button, PermissionsAndroid } from 'react-native';
import Card from './Card'
import Constants from 'expo-constants'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class ProfileScreen extends Component {
  state = {
    location: {
      coords: {
        latitude: 0,
        longitude: 0
      }
    },
    items: ['Pizzas','Subs','Drinks'],
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

    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    let pic2={
      uri: 'https://sei-roberto.s3.amazonaws.com/1a83b54a90d7abcebe2cd40abee6f13e'
    }
    return (
      <View>
        <Image source={pic} style={{width: 193, height: 110}}/>
        <TouchableOpacity
          onLongPress={() => {
            alert('??? ')
          }}
          onPress={() => {
            requestCameraPermission()
          }}
          underlayColor='red'
          >

          <Text>Highlight mee</Text>
        </TouchableOpacity>
        <Button title='Buton'
          onPress={()=>
            fetch('https://mylistss.herokuapp.com/tasks', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                firstParam: 'yourValue',
                secondParam: 'yourOtherValue',
              }),
            })
          }
          />
          <Text>{Constants.deviceName}</Text>
          <Text>Lat: { location.coords.latitude}</Text>
          <Text>Long: { location.coords.longitude}</Text>
          {items.map(item =>(
            <Card
              key={items.indexOf(item)}
              name={item}
            />
          ))}
      </View>
    );
  }
}
// export default withRouter(HelloWorld)
