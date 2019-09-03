import React, { Component } from 'react';
import { TouchableOpacity,AppRegistry, Image,View,Text, Button } from 'react-native';

export default class HelloWorld extends Component {
  render() {
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    let pic2={
      uri: 'https://sei-roberto.s3.amazonaws.com/1a83b54a90d7abcebe2cd40abee6f13e'
    }
    const {navigate} = this.props.navigation
    return (
      <View>
        <Image source={pic} style={{width: 193, height: 110}}/>
        <Image source={pic2} style={{width: 193, height: 110}}/>
        <TouchableOpacity
          onLongPress={() => {
            alert('??? ')
          }}
          onPress={() => {
            alert('Hello')
          }}
          underlayColor='red'
          >

          <Text>Highlight mee</Text>
        </TouchableOpacity>
        <Button title='Buton'
          onPress={()=>
            alert('hiii')
          }
          />
          <Button title='Menu'
            onPress={()=>
              navigate('Profile',{name:'st'})
            }
            />
          <Button title='My Cart'
            onPress={()=>
              navigate('MyCart')
            }
            />
      </View>
    );
  }
}
// export default withRouter(HelloWorld)
