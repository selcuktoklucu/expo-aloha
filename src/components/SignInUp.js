import React, { Component } from 'react';
import {View, TextInput, StyleSheet,Text,TouchableOpacity,Button } from 'react-native';

class SignIn extends Component {
  constructor(props) {
    super(props)
  }
  render (){
    console.log('aaaa',this.props.setChangeText)
     return(
       <View >
         <TextInput
           placeholder='email'
           autoCompleteType= 'email'
           autoFocus={true}
           maxLength={40}
           keyboardType='email-address'
           style={styles.textInput}
           ref={this.props.reff}
           onChangeText={value => this.props.setChangeText(value)}
           value={this.props.userName}
         />
         <TextInput
           placeholder='password'
           secureTextEntry={true}
           maxLength={40}
           style={styles.textInput}
           ref={(password) => { this.password=password }}
           onChangeText={(password) => this.props.setPassword(password)}
           value={this.props.password}
         />
         <Text> </Text>
         <Text> </Text>
         <View style={{ flexGrow: 1, justifyContent:'space-between', flexDirection:"row"}}>
           <TouchableOpacity
             style={styles.buttonOption}
             onPress={this.props.setShowSignIn}
             >
           <Text style={{ fontWeight:'bold',  }}>Trying to Register?</Text>

           </TouchableOpacity>
           <TouchableOpacity style={{ margin:5, alignSelf: 'center'}}>
             <Button title='Sign In'
               width="1000px"
               color="#2c04af"
               onPress={this.props.onSignIn}// this.setState({/*showSignIn:false*/})

             />
           </TouchableOpacity>
         </View>
       </View>
   )
 }
}

class SignUp extends Component {
  constructor(props) {
    super(props)
  }
  render (){
    console.log('aaaa',this.props.setChangeText)
     return(
       <View >
         <TextInput
           placeholder='e-mail'
           autoCompleteType= 'email'
           autoFocus={true}
           maxLength={40}
           keyboardType='email-address'
           style={styles.textInput}
           ref={(el) => { this.userName=el }}
           onChangeText={(userName) => this.props.setUserName(userName)}
           value={this.props.userName}
         />
         <TextInput
           placeholder='Phone Number'
           autoCompleteType= 'tel'
           maxLength={10}
           dataDetectorTypes='phoneNumber'
           keyboardType='number-pad'
           style={styles.textInput}
           ref={(el) => { this.phoneNumber=el }}
           onChangeText={(phoneNumber) => this.props.setPhone(phoneNumber)}
           value={this.props.phoneNumber}
         />
         <TextInput
           placeholder='password'
           secureTextEntry={true}
           maxLength={40}
           style={styles.textInput}
           ref={(password) => { this.password=password }}
           onChangeText={(password) => this.props.setPassword(password)}
           value={this.props.password}
         />
         <TextInput
           placeholder='Confirm Password'
           secureTextEntry={true}
           maxLength={40}
           style={styles.textInput}
           ref={(passwordConfirm) => { this.passwordConfirm=passwordConfirm }}
           onChangeText={(password) => this.props.setCPassword(password)}
           value={this.props.passwordConfirm}
         />
         <View style={{ flexGrow: 1, justifyContent:'space-between', flexDirection:"row"}}>
           <TouchableOpacity
             style={styles.buttonOption}
             onPress={this.props.setShowSignIn}
             >
             <Text style={{ fontWeight:'bold',  }}>Do you have account?</Text>

           </TouchableOpacity>
           <TouchableOpacity style={{ margin:5, alignSelf: 'center'}}>
             <Button title='Sign Up'
               width="1000px"
               color="#2c04af"
               onPress={this.props.onSignUp}
             />
           </TouchableOpacity>
         </View>
       </View>
   )
 }
}

const styles = StyleSheet.create({
 textInput: {
  height: 40,
  backgroundColor: '#00000090',
  color : '#d6c9c9',
  textAlign: 'center',
  overflow: 'hidden',
  borderRadius: 20,
  marginTop: 2,

 },
 buttonOption:{
  overflow: 'hidden',
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
export {
  SignIn,
  SignUp
}
// export default withRouter(HelloWorld)
