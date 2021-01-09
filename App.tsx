import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingPage from './src/components/auth/LandingPage';
import Registration from './src/components/auth/Registration';
import Login from './src/components/auth/Login';
import firebase from './src/firebase/config';
// import firebase from 'firebase';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
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
      if (!user) {
        this.setState({ loggedIn: false, loaded: true });
      } else {
        this.setState({ loggedIn: true, loaded: true });
      }
    });
    console.log('state:', this.state);
  }

  render() {
    const { loaded, loggedIn } = this.state;
    console.log(loaded, loggedIn);
    if (!loaded) {
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      );
    }
    if (loggedIn) {
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
    }
    return (
      <View style={styles.container}>
        <Text>User is LoggedIn</Text>
      </View>
    );
  }
}


