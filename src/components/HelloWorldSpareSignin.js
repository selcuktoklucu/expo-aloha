<View style={{marginTop: (screenHeight*0.2)}}>
  <TextInput
    placeholder='email'
    autoCompleteType= 'email'
    autoFocus={true}
    maxLength={40}
    keyboardType='email-address'
    style={styles.textInput}
    ref={(el) => { this.userName=el }}
    onChangeText={(userName) => this.setState({userName})}
    value={this.state.userName}
  />
  <TextInput
    placeholder='password'
    secureTextEntry={true}
    maxLength={40}
    style={styles.textInput}
    ref={(password) => { this.password=password }}
    onChangeText={(password) => this.setState({password})}
    value={this.state.password}
  />
  <Text> </Text>
  <Text> </Text>
  <View style={{ flexGrow: 1, justifyContent:'space-between', flexDirection:"row"}}>
    <TouchableOpacity
      style={styles.buttonOption}
      onPress={()=>
      this.setState({showSignIn:false})
    }>
    <Text style={{ fontWeight:'bold',  }}>Trying to Register?</Text>

    </TouchableOpacity>
    <TouchableOpacity style={{ margin:5, alignSelf: 'center'}}>
      <Button title='Sign In'
        width="1000px"
        color="#2c04af"
        onPress={()=>
          this.signInUser()
          // this.setState({/*showSignIn:false*/})
        }
      />
    </TouchableOpacity>
  </View>
</View>


----SIGNUP

<View style={{marginTop: (screenHeight*0.2)}}>
  <TextInput
    placeholder='e-mail'
    autoCompleteType= 'email'
    autoFocus={true}
    maxLength={40}
    keyboardType='email-address'
    style={styles.textInput}
    ref={(el) => { this.userName=el }}
    onChangeText={(userName) => this.setState({userName})}
    value={this.state.userName}
  />
  <TextInput
    placeholder='Phone Number'
    autoCompleteType= 'tel'
    maxLength={10}
    dataDetectorTypes='phoneNumber'
    keyboardType='number-pad'
    style={styles.textInput}
    ref={(el) => { this.phoneNumber=el }}
    onChangeText={(phoneNumber) => this.setState({phoneNumber})}
    value={this.state.phoneNumber}
  />
  <TextInput
    placeholder='password'
    secureTextEntry={true}
    maxLength={40}
    style={styles.textInput}
    ref={(password) => { this.password=password }}
    onChangeText={(password) => this.setState({password})}
    value={this.state.password}
  />
  <TextInput
    placeholder='Confirm Password'
    secureTextEntry={true}
    maxLength={40}
    style={styles.textInput}
    ref={(passwordConfirm) => { this.passwordConfirm=passwordConfirm }}
    onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
    value={this.state.passwordConfirm}
  />
  <View style={{ flexGrow: 1, justifyContent:'space-between', flexDirection:"row"}}>
    <TouchableOpacity
      style={styles.buttonOption}
      onPress={()=>
      this.setState({showSignIn:true})
      }>
      <Text style={{ fontWeight:'bold',  }}>Do you have account?</Text>

    </TouchableOpacity>
    <TouchableOpacity style={{ margin:5, alignSelf: 'center'}}>
      <Button title='Sign Up'
        width="1000px"
        color="#2c04af"
        onPress={()=>{
          // this.checkUp()
          this.signUp()

        }
          //this.setState({/*showSignIn:false*/})
        }
      />
    </TouchableOpacity>
  </View>
</View>
