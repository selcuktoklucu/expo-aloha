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
