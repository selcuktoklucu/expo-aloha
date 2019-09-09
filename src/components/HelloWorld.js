import React, { Component } from 'react';
import { ToastAndroid, StyleSheet,TextInput,TouchableOpacity,AppRegistry, Image,View,Text, Dimensions, ImageBackground, Switch /*Button*/  } from 'react-native';
import styled from 'styled-components/native'
import {connect} from 'react-redux'
const bckImage = require('./pizza_background.png')
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);
import store from './redux/store'
import {SignIn, SignUp} from './SignInUp'
import Amplify, { Auth } from 'aws-amplify'
import config from '../aws-exports'

Amplify.configure(config)


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

class HelloWorld extends Component {
state ={
  userName:'',
  phoneNumber:'',
  password:'',
  passwordConfirm:'1',
  authCode: '',
  showSignIn: false,
  signedIn: false,
  justSignedUp: false
}

  signUp() {
    console.log(this.state.password, this.state.passwordConfirm)
    if( this.state.password !== this.state.passwordConfirm) {
      ToastAndroid.show(`Passwords should match!`, ToastAndroid.SHORT)
      return
    }else if(this.state.password.length < 4) {
      console.log('signUp FFFF')
      ToastAndroid.show(`Passwords should have at least 4 character!`, ToastAndroid.SHORT)
      return
    }
    Auth.signUp({
      username: this.state.userName,
      password: this.state.password,
      attributes: {
        phone_number: `+1${this.state.phoneNumber}`,
        email: this.state.userName
      }
    })
    .then(res=> {
      this.setState({justSignedUp:true})
      ToastAndroid.show(`SignUp Successful, Please Confirm Your Phone Number`, ToastAndroid.SHORT)
      console.log('successful signup', res)
    })
    .catch(err=>{
      console.log('error',err)
    })
  }
  signInUser() {
    console.log('signUserCAAALLLEDD')
    const { password,userName } = this.state
    Auth.signIn({
      username: userName,
      password: password
    })
    .then(user=> {
      console.log('success user signIn',user)
      this.setState({ signedIn:true })
      ToastAndroid.show(`Sign in Successful`, ToastAndroid.SHORT)
    })
    .catch(err=> {
      console.log('error user signIn',err)
      ToastAndroid.show(`${err.message}`, ToastAndroid.SHORT)
    })
  }
  confirmUser() {
    const { authCode,userName } = this.state
    Auth.confirmSignUp(userName, authCode)
      .then( res=> {
        console.log('successful Confirm', res)
        this.setState({justSignedUp:false})
        this.setState({showSignIn:true})

        ToastAndroid.show(`Signed In`, ToastAndroid.SHORT)
      })
      .catch(err=>{
        console.log('error confirm',err)
        ToastAndroid.show(`error ${err.message}`, ToastAndroid.SHORT)
      })
  }
  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })
  onChangeText(authCode) {
    this.setState({ authCode })
  }
  toggleSignIn = () =>{
    console.log('toggleSignIn',this.state)
    if(this.state.justSignedUp) {
      return(
        <View>
          <TextInput
            placeholder='inputcode'
            onChangeText={value => this.onChangeText(value)}
          />
          <TouchableOpacity style={{ margin:10, alignSelf: 'center'}}>
            <Button title='Confirm'
              width="1000px"
              color="#841584"
              onPress={()=>
                this.confirmUser()
              }
            />
          </TouchableOpacity>
        </View>
      )
    }
    if(this.state.signedIn) {
      console.log('aaaaaatoggleSignIn',this.state)
      return(
        <View style={{marginTop: (screenHeight*0.2)}}>
          <TouchableOpacity
            style={styles.buttonOption}
            onPress={()=>
            this.setState({/*showSignIn:false*/})
          }>
          <Text style={{ fontWeight:'bold',  }}>Current Orders</Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOption}
            onPress={()=>
            this.setState({/*showSignIn:false*/})
          }>
          <Text style={{ fontWeight:'bold',  }}>Previous Orders</Text>

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonOption}
            onPress={()=>
            this.setState({/*showSignIn:false*/})
          }>
          <Text style={{ fontWeight:'bold',  }}>Active Coupons</Text>

          </TouchableOpacity>
        </View>
      )
    }
    if(this.state.showSignIn) {
      return(
        <View style={{marginTop: (screenHeight*0.2)}}>
          <SignIn
            onSignIn={()=>this.signInUser()}
            reff={(el) => { this.userName=el }}
            setPassword={(password) => this.setState({password})}
            setChangeText={(userName) => this.setState({userName})}
            setShowSignIn={() => this.setState({showSignIn:false})}
          />
        </View>
    )}
    else{
      return(
        <View style={{marginTop: (screenHeight*0.2)}}>
          <SignUp
            onSignUp={()=>this.signUp()}
            setUserName={(userName) => this.setState({userName})}
            setPassword={(password) => this.setState({password})}
            setCPassword={(passwordConfirm) => this.setState({passwordConfirm})}
            setPhone={(phoneNumber) => this.setState({phoneNumber})}
            setShowSignIn={() => this.setState({showSignIn:true})}
          />
        </View>
    )}
  }
  render() {
    //console.log('screenHeight',screenHeight)
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
    const { userName} = this.state
    const {showSignIn} = this.state
    // console.log(this.state.userName)
    // console.log('navigett',this.props.navigation)
    return (
        <ImageBackground source={bckImage} style={{width: '100%', height: '100%'}}>
          <View style={{width: (screenWidth*0.8), height: (screenHeight*0.5), alignSelf: 'center', overflow: 'hidden', borderRadius: 20}}>
          {/*<Image source={pic} style={{width: 193, height: 210, alignSelf: 'center'}}/>*/}
          {this.toggleSignIn()}
          </View>

          <View style={{ flexGrow: 1, justifyContent: 'flex-end', marginBottom: 0}}>

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

const styles = StyleSheet.create({
 textInput: {
  height: 40,
  backgroundColor: '#00000080',
  color : '#d6c9c9',
  textAlign: 'center',
  overflow: 'hidden',
  borderRadius: 20,
  marginTop: 2,

 },
 buttonOption:{
  overflow: 'hidden',
  marginTop: 2,
  borderRadius: 20,
  margin:0,
  opacity: 0.8,
  padding:5,
  alignSelf: 'center',
  backgroundColor: '#e2e9ee'
 },
 passwordInput: {
  height: 40,
  marginTop: 5,
  backgroundColor: '#00000080',
  color : '#d2c6c7',
  textAlign: 'center',
  overflow: 'hidden',
  borderRadius: 20,
 }
})

// export default withRouter(HelloWorld)
const getPropsFromStore = state => ({
  cartItems: state.cartItems
})
export default connect(getPropsFromStore)(HelloWorld)
