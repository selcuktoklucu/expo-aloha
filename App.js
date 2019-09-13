import React from 'react';
import { StyleSheet,Button, Text, View } from 'react-native';
import HelloWorld from './src/components/HelloWorld';
import MenuScreen from './src/components/MenuScreen';
import MyCart from './src/components/MyCart';
import {Provider} from 'react-redux'
import store from './src/components/redux/store'
import * as Font from 'expo-font';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: HelloWorld, navigationOptions: ({ navigation}) => ({
    title:'Kristen\'s Pizzeria',
    headerStyle: {
      backgroundColor: '#ffffff80',

    },
    headerTransparent: true,
    headerTitleStyle: {
      fontSize: 30,
      color: '#000',
      fontFamily: 'Pacifico',
      fontWeight: '200',
    },
  })},
  Menu: {screen:MenuScreen, navigationOptions: ({ navigation}) => ({
    title:'Menu',
    headerRight: (
      <Button
        onPress={()=>
          navigation.navigate('MyCart')
        }
        title='Done'
        color='#000'
      />
    )
  })},
  MyCart:{screen: MyCart, navigationOptions: ({ navigation}) => ({
    title:'My Cart'
  })}
});

const Navigation = createAppContainer(MainNavigator);

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state ={
      fontLoaded: false
    }
  }
  async componentDidMount() {
    console.log('font loading')
    await Font.loadAsync({
      'Pacifico': require('./assets/fonts/Pacifico-Regular.ttf'),
    });
    console.log('font loaded')

    this.setState({fontLoaded: true})
  }
  render() {
    if(!this.state.fontLoaded){
      return <Text></Text>
    }
      return (
        <Provider store={store}>
          <Navigation />
        </Provider>
      )
  }
}

// export default App
// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
