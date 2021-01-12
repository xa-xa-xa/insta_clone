import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './src/components/auth/LandingPage';
import Registration from './src/components/auth/Registration';
import Login from './src/components/auth/Login';
import Main from './src/components/Main'

import firebase from 'firebase/app';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from "./src/redux/reducers/index"
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

const Stack = createStackNavigator();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

interface IInitialState {
  loaded: boolean;
  loggedIn: boolean;
}

export default class App extends Component<{}, IInitialState> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { loaded: false, loggedIn: false };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user: any) => {
      this.setState({ loggedIn: user ? true : false, loaded: true });
      console.log("USER:", user?.email, this.state)
    });
    
  }

  render() {
    const { loaded, loggedIn } = this.state;
    if (!loaded) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen
              name='Landing'
              component={LandingPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Registration'
              component={Registration}
              options={{ headerShown: true }}
            />
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ headerShown: true }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <Provider store={store}>
          <Main />
        </Provider>
      );
    }
  }
}


