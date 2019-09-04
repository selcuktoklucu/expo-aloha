import React, { Component } from 'react';
import { TouchableOpacity,AppRegistry, Image,View,Text, Dimensions, ImageBackground /*Button*/  } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'
const bckImage = require('./pizza_background.png')
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import store from './redux/store'

const StyledView = styled.View`
  background-color: papayawhip;
  display: flex;
  height: ${screenHeight};
  width: ${screenWidth};
  align-items: center;

`
const StyledText = styled.Text`
  color: palevioletred;

`
const Button = styled.Button`
  font-size: 12;
  margin: 20px;
`;

// const check = {
//   isAndroid: () => {
//     return Platform.OS === 'android'
//   }
// }
class HelloWorld extends Component {
  render() {
    console.log('screenHeight',screenHeight)
    const mainStore = store.getState()
    // let cartTitle = `My Cart ${mainStore.cartItems.length}`
    let cartTitle = (this.props.cartItems.length > 0) ? `My Cart (${this.props.cartItems.length})` : 'Cart is Empty'
    // console.log('mainstore at mainScreen', mainStore)
    let pic = {
      uri: 'https://media.giphy.com/media/4ayiIWaq2VULC/giphy.gif'
    };
    let pic2={
      uri: 'https://sei-roberto.s3.amazonaws.com/1a83b54a90d7abcebe2cd40abee6f13e'
    }
    const {navigate} = this.props.navigation
    console.log('navigett',this.props.navigation)
    return (
        <ImageBackground source={bckImage} style={{width: '100%', height: '100%'}}>
          <View style={{width: 193, height: 210, alignSelf: 'center', overflow: 'hidden', borderRadius: 20}}>
          {/*<Image source={pic} style={{width: 193, height: 210, alignSelf: 'center'}}/>*/}
          </View>
          <TouchableOpacity style={{ margin:10, alignSelf: 'center'}}>
            <Button title='My Account'
              width="1000px"
              color="#841584"
              onPress={()=>
                alert('Coming Soon!')
              }
            />
          </TouchableOpacity>
          <View style={{ /*backgroundColor:'blue',*/ flexGrow: 1, /*alignSelf: 'center',*/ justifyContent: 'flex-end', marginBottom: 0}}>

            <TouchableOpacity style={{margin:10}}>
              <Button title='Menu'
                onPress={()=>
                  navigate('Menu',{name:'st'})
                }
                />
              <Button title={cartTitle}
                onPress={()=>
                  navigate('MyCart')
                }
                />
            </TouchableOpacity>
          </View>
        </ImageBackground>
    );
  }
}
// export default withRouter(HelloWorld)
const getPropsFromStore = state => ({
  cartItems: state.cartItems
})
export default connect(getPropsFromStore)(HelloWorld)
