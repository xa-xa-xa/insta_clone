import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

type ILoginState = {
  password: string;
  email: string;
};

export default class Login extends Component<{}, ILoginState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onLogin = this.onLogin.bind(this);
  }

  componentDidMount() {}

  onLogin() {
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log('RES: ', res);
      })
      .catch((er: Error) => console.error(er));
  }
  render() {
    return (
      <View style={{ padding: 32 }}>
        <TextInput
          placeholder='email'
          onChangeText={(email) => this.setState({ email })}
        />
        <TextInput
          placeholder='password'
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />
        <Button
          onPress={() => {
            this.onLogin();
          }}
          title='Log in'
        />
      </View>
    );
  }
}
