import React, { Component } from "react";
import * as SecureStore from "expo-secure-store";
import { NavigationActions } from "react-navigation";
import { serverAddress } from "../../config";

//http://192.168.1.237
export const signIn = (userName, password) => {
  fetch(`${serverAddress}/sign-in/`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Accept-Language": "ru,en;q=0.9"
    },
    body: JSON.stringify({
      credentials: {
        email: `${userName}`,
        password: `${password}`
      }
    })
  })
    .then(response => response.json())
    .then(responseJson => {
      SecureStore.setItemAsync("secure_token", responseJson.user.token);
      console.log(responseJson);
    })
    .then(() => {
      const token = SecureStore.getItemAsync("secure_token");
      console.log("heyyooooo");
      return token;
    })
    .then(st => {
      console.log("secureToken", st);
      this.setState({ signedIn: true });
    })
    .catch(e => {
      console.error("ERROR", e);
    });
};

export const signInTokenControl = async token => {
  try {
    console.log("sign in confirmation?");
    const response = await fetch(`${serverAddress}/customers/8572065397`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    });
    const responseJson = await response.json();
    //console.log('rp data',response.json())
    console.log("responseJson", responseJson);
    return true;
  } catch (e) {
    SecureStore.deleteItemAsync("secure_token");
    return false;
  }
};

export const searchAddressNearBy = async text => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&location=42.316565,-71.066049&radius=3000&strictbounds&key=AIzaSyCZOKfp7vh0jn2g0VUk7Pk8OHNJDQgtsm8`
  );
  responseJson = await response.json();
  //console.log("responses", responseJson);
  responseJson.status === "OK" ? responseJson.predictions : null;
  return responseJson.predictions;
};

export const searchPhone = async phone => {
  // const token = SecureStore.getItemAsync('secure_token')
  console.log("searchByPhone network", token);

  const token = await SecureStore.getItemAsync("secure_token");
  const response = await fetch(`${serverAddress}/customers/${phone}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  console.log("response", response);
  if (response.status === 200) {
    const responseJson = await response.json();
    console.log("responseJson", responseJson, "response", response.status);
    return responseJson;
  } else {
    return false;
  }
};

export const postAddress = async data => {
  const token = await SecureStore.getItemAsync("secure_token");

  console.log("postaddress dataa:", token, data);
  const response = await fetch(`${serverAddress}/customers/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({
      customer: {
        name: data.name,
        phone: data.phone,
        currentAddress: data.address
      }
    })
  });

  responseJson = await response.json();
  console.log(
    "reponse postAddress",
    responseJson,
    "responseCode",
    response.status
  );
  return response.status === 1 ? true : false;
};
