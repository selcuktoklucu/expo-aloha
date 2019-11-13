import React, { Component } from "react";
import {
  ToastAndroid,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  AppRegistry,
  Image,
  View,
  Text,
  Dimensions,
  ImageBackground,
  Switch /*Button*/
} from "react-native";
import styled from "styled-components/native";
import { connect } from "react-redux";
const bckImage = require("./pizza_background.png");
const screenHeight = Math.round(Dimensions.get("window").height);
const screenWidth = Math.round(Dimensions.get("window").width);
import store from "./redux/store";
import { SignIn, SignUp } from "./SignInUp";
import { SearchAndAdd } from "./SearchAndAdd";
import Amplify, { Auth } from "aws-amplify";
import { signIn } from "../api/api";
import config from "../aws-exports";
import AwesomeButton from "react-native-really-awesome-button";
import AwesomeButtonRick from "react-native-really-awesome-button/src/themes/rick";
import * as SecureStore from "expo-secure-store";
import { signInTokenControl } from "../api/api";
Amplify.configure(config);
import { serverAddress } from "../../config";

const StyledView = styled.View`
  display: flex;
  height: ${screenHeight};
  width: ${screenWidth};
  align-items: center;
`;
const StyledText = styled.Text`
  color: palevioletred;
`;
const Button = styled.Button`
  font-size: 12;
  margin: 20px;
`;

class HelloWorld extends Component {
  state = {
    userName: "st@st.com",
    phoneNumber: "",
    password: "stst",
    searchPhoneNumber: "857206539",
    authCode: "",
    showSignIn: true,
    signedIn: false,
    justSignedUp: false
  };

  async componentDidMount() {
    console.log("heyo not signedIN");
    const token = await SecureStore.getItemAsync("secure_token");
    console.log("heyo", token);
    const isTokenValid = await signInTokenControl(token);
    if (isTokenValid) {
      console.log("tokenValid", token);
      this.setState({ signedIn: true });
    } else {
    }
  }

  action() {
    this.setState({ searchPhoneNumber: "" });
  }
  removeSearchPhoneNumber = () => {
    this.setState({ searchPhoneNumber: "" });
  };

  signUp() {
    console.log(this.state.password, this.state.passwordConfirm);
    if (this.state.password !== this.state.passwordConfirm) {
      ToastAndroid.show(`Passwords should match!`, ToastAndroid.SHORT);
      return;
    } else if (this.state.password.length < 4) {
      console.log("signUp FFFF");
      ToastAndroid.show(
        `Passwords should have at least 4 character!`,
        ToastAndroid.SHORT
      );
      return;
    }
    Auth.signUp({
      username: this.state.userName,
      password: this.state.password,
      attributes: {
        phone_number: `+1${this.state.phoneNumber}`,
        email: this.state.userName
      }
    })
      .then(res => {
        this.setState({ justSignedUp: true });
        ToastAndroid.show(
          `SignUp Successful, Please Confirm Your Phone Number`,
          ToastAndroid.SHORT
        );
        console.log("successful signup", res);
      })
      .catch(err => {
        console.log("error", err);
      });
  }

  confirmUser() {
    const { authCode, userName } = this.state;
    Auth.confirmSignUp(userName, authCode)
      .then(res => {
        console.log("successful Confirm", res);
        this.setState({ justSignedUp: false });
        this.setState({ showSignIn: true });

        ToastAndroid.show(`Signed In`, ToastAndroid.SHORT);
      })
      .catch(err => {
        console.log("error confirm", err);
        ToastAndroid.show(`error ${err.message}`, ToastAndroid.SHORT);
      });
  }
  handleChange = event =>
    this.setState({
      [event.target.name]: event.target.value
    });
  onChangeText(authCode) {
    this.setState({ authCode });
  }
  toggleSignIn = () => {
    // console.log("toggleSignIn", this.state);
    if (this.state.justSignedUp) {
      return (
        <View>
          <TextInput
            placeholder="Confirm Your Phone"
            style={styles.textInput}
            onChangeText={value => this.onChangeText(value)}
          />
          <TouchableOpacity style={{ margin: 10, alignSelf: "center" }}>
            <Button
              title="Confirm"
              width="1000px"
              color="#841584"
              onPress={() => this.confirmUser()}
            />
          </TouchableOpacity>
        </View>
      );
    }
    if (this.state.signedIn) {
      return (
        <View style={{ marginTop: screenHeight * 0.2 }}>
          <SearchAndAdd
            setPhone={searchPhoneNumber => this.setState({ searchPhoneNumber })}
            searchPhoneNumber={this.state.searchPhoneNumber}
            action={this.removeSearchPhoneNumber}
          ></SearchAndAdd>
        </View>
      );
    }
    if (this.state.showSignIn) {
      return (
        <View style={{ marginTop: screenHeight * 0.2 }}>
          <SignIn
            onSignIn={() => {
              console.log("heyy");
              fetch(`${serverAddress}/sign-in/`, {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                  "Accept-Language": "ru,en;q=0.9"
                },
                body: JSON.stringify({
                  credentials: {
                    email: `${this.state.userName}`,
                    password: `${this.state.password}`
                  }
                })
              })
                .then(response => response.json())
                .then(responseJson => {
                  SecureStore.setItemAsync(
                    "secure_token",
                    responseJson.user.token
                  );
                })
                .then(() => {
                  const token = SecureStore.getItemAsync("secure_token");
                  console.log("heyyooooo");
                  return token;
                })
                .then(st => {
                  console.log("secureToken", st);
                  this.setState({ signedIn: true });
                });
            }}
            reff={el => {
              this.userName = el;
            }}
            userName={this.state.userName}
            password={this.state.password}
            setPassword={password => this.setState({ password })}
            setChangeText={userName => this.setState({ userName })}
            setShowSignIn={() => this.setState({ showSignIn: false })}
          />
        </View>
      );
    } else {
      return (
        <View style={{ marginTop: screenHeight * 0.2 }}>
          <SignUp
            onSignUp={() => this.signUp()}
            setUserName={userName => this.setState({ userName })}
            setPassword={password => this.setState({ password })}
            setCPassword={passwordConfirm => this.setState({ passwordConfirm })}
            setPhone={phoneNumber => this.setState({ phoneNumber })}
            setShowSignIn={() => this.setState({ showSignIn: true })}
          />
        </View>
      );
    }
  };
  render() {
    const token = SecureStore.getItemAsync("secure_token");
    console.log("token", token);
    const mainStore = store.getState();
    let cartTitle =
      this.props.cartItems.length > 0
        ? `My Cart (${this.props.cartItems.length})`
        : "Cart is Empty";
    let pic = { uri: "https://media.giphy.com/media/4ayiIWaq2VULC/giphy.gif" };
    let pic2 = {
      uri:
        "https://sei-roberto.s3.amazonaws.com/1a83b54a90d7abcebe2cd40abee6f13e"
    };
    const { navigate } = this.props.navigation;
    const { userName, showSignIn, searchPhoneNumber } = this.state;
    if (searchPhoneNumber.length === 10) {
      console.log("searchPhoneNumber = 10");
    }

    return (
      <ImageBackground
        source={bckImage}
        style={{ width: "100%", height: "100%" }}
      >
        <StyledView>{this.toggleSignIn()}</StyledView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    backgroundColor: "#00000080",
    color: "#d6c9c9",
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 20,
    marginTop: 2
  },
  buttonOption: {
    overflow: "hidden",
    marginTop: 2,
    borderRadius: 20,
    margin: 0,
    opacity: 0.8,
    padding: 5,
    alignSelf: "center",
    backgroundColor: "#e2e9ee"
  },
  passwordInput: {
    height: 40,
    marginTop: 5,
    backgroundColor: "#00000080",
    color: "#d2c6c7",
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 20
  }
});

// export default withRouter(HelloWorld)
const getPropsFromStore = state => ({
  cartItems: state.cartItems
});
export default connect(getPropsFromStore)(HelloWorld);
