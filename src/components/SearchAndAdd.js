import { searchPhone } from "../api/api";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import openMap from "react-native-open-maps";
import React, { Component } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Image,
  ScrollView
} from "react-native";
import styled from "styled-components";
import { searchAddressNearBy, postAddress } from "../api/api";
import { throttle, debounce } from "throttle-debounce";

const StyledText = styled(Text)`
  color: white;
  opacity: 0.7;
  font-size: 12px;
  margin-top: 16px;
`;

class SearchAndAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
      isDone: false,
      name: "",
      currentAddress: "",
      predefinedAddresses: [],
      autoCompleteOn: false
    };
    this.autocompleteSearchDebounced = debounce(500, this.onAddressChange);
    this.autocompleteSearchThrottled = throttle(500, this.onAddressChange);
  }

  onChangeText(name) {
    this.setState({ name });
  }

  async onAddressChange(currentAddress) {
    if (currentAddress.length > 3) {
      results = await searchAddressNearBy(currentAddress);
      this.setState({
        predefinedAddresses: results,
        currentAddress,
        autoCompleteOn: true
      });
    } else {
      this.setState({ currentAddress });
    }
  }

  changeQuery = value => {
    this.setState({ currentAddress: value }, () => {
      const currentAddress = this.state.currentAddress;
      if (currentAddress.length < 5) {
        this.autocompleteSearchThrottled(this.state.currentAddress);
      } else {
        this.autocompleteSearchDebounced(this.state.currentAddress);
      }
    });
  };

  showAddress = async phone => {
    this.setState({ isReady: false });
    const dat = await searchPhone(phone);
    console.log("data", dat);
    if (dat) {
      this.setState({
        isReady: true,
        isDone: true,
        name: dat.customer.name,
        currentAddress: dat.customer.currentAddress
      });
    } else {
      this.setState({
        isReady: true,
        isDone: true,
        name: "N/A"
      });
    }
  };

  saveTheAddress = async () => {
    data = {
      phone: this.props.searchPhoneNumber,
      address: this.state.currentAddress,
      name: this.state.name
    };
    openMap({ end: this.state.currentAddress, navigate_mode: "navigate" });
    postAddress(data) ? this.cleanFields() : console.log("error");
  };
  setSuggestedAddress = value => {
    this.setState({
      currentAddress: value,
      predefinedAddresses: [],
      autoCompleteOn: false
    });
  };
  googlePlacesInput = () => {
    return (
      <GooglePlacesAutocomplete
        placeholder="Search"
        minLength={2} // minimum length of text to search
        autoFocus={true}
        returnKeyType={"search"} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        keyboardAppearance={"light"} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
        listViewDisplayed="auto" // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        getDefaultValue={() => ""}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: "AIzaSyCZOKfp7vh0jn2g0VUk7Pk8OHNJDQgtsm8",
          language: "en", // language of the results
          types: "(cities)" // default: 'geocode'
        }}
        styles={{
          textInputContainer: {
            width: "100%",
            height: 50
          },
          description: {
            fontWeight: "bold"
          },
          predefinedPlacesDescription: {
            color: "#1faadb"
          }
        }}
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={
          {
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }
        }
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: "distance",
          type: "cafe"
        }}
        GooglePlacesDetailsQuery={{
          // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
          fields: "formatted_address"
        }}
        filterReverseGeocodingByTypes={[
          "locality",
          "administrative_area_level_3"
        ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
      />
    );
  };

  cleanFields = () => {
    this.setState({ isReady: true, isDone: false, name: "", address: "" });
    this.props.action();
  };
  render() {
    const {
      isReady,
      isDone,
      name,
      currentAddress,
      predefinedAddresses,
      autoCompleteOn
    } = this.state;
    const phoneNumberLength = this.props.searchPhoneNumber.length;
    const phoneNumber = this.props.searchPhoneNumber;

    if (phoneNumberLength === 10 && isReady === true && isDone === false) {
      console.log("searcing  by phone", this.props.searchPhoneNumber);
      this.showAddress(phoneNumber);
    }
    if (!isReady) {
      return (
        <View>
          <Text>Loading!!</Text>
          <TouchableOpacity
            style={styles.buttonOption}
            onPress={this.cleanFields}
          >
            <Text>Clean Fields</Text>
          </TouchableOpacity>
        </View>
      );
    }
    console.log("predefinedAddresses", predefinedAddresses);
    return (
      <View>
        <View>
          <TextInput
            placeholder="phone Number"
            autoCompleteType="tel"
            maxLength={10}
            dataDetectorTypes="phoneNumber"
            keyboardType="number-pad"
            style={styles.textInput}
            ref={el => {
              this.phoneNumber = el;
            }}
            onChangeText={searchPhoneNumber =>
              this.props.setPhone(searchPhoneNumber)
            }
            value={this.props.searchPhoneNumber}
          />
        </View>
        <TouchableOpacity
          style={styles.buttonOption}
          onPress={this.cleanFields}
        >
          <Text>Clean Fields</Text>
        </TouchableOpacity>

        {isReady && isDone && phoneNumberLength === 10 ? (
          <View>
            <TextInput
              placeholder="Name"
              autoCompleteType="name"
              maxLength={36}
              dataDetectorTypes="none"
              keyboardType="default"
              style={styles.textInput}
              ref={el => {
                this.phoneNumber = el;
              }}
              onChangeText={value => this.onChangeText(value)}
              value={name}
            />
            <TextInput
              placeholder="currentAddress"
              autoCompleteType="street-address"
              maxLength={36}
              dataDetectorTypes="address"
              keyboardType="default"
              style={styles.textInput}
              ref={el => {
                this.phoneNumber = el;
              }}
              onChangeText={value => this.changeQuery(value)}
              value={currentAddress}
            />
            <ScrollView>
              {autoCompleteOn &&
                predefinedAddresses.map(address => (
                  <View>
                    <TouchableOpacity
                      style={styles.buttonOption}
                      onPress={() =>
                        this.setSuggestedAddress(address.description)
                      }
                    >
                      <Text>{address.description}</Text>
                    </TouchableOpacity>
                  </View>
                ))}
            </ScrollView>
          </View>
        ) : null}
        {!autoCompleteOn && (
          <TouchableOpacity
            style={styles.buttonOption}
            onPress={() => this.saveTheAddress()}
          >
            <Text>Save and Rock!</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    fontSize: 16,
    fontFamily: "Pacifico",
    backgroundColor: "#00000090",
    color: "#d6c9c9",
    textAlign: "center",
    overflow: "hidden",
    borderRadius: 20,
    marginTop: 2
  },
  buttonOption: {
    overflow: "hidden",
    borderRadius: 20,
    margin: 0,
    marginBottom: 25,
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
export { SearchAndAdd };
