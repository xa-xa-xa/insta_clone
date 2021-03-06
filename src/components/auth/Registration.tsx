import firebase from 'firebase';
import React, { Component } from 'react';
import { View, Button, TextInput } from 'react-native';

type IRegiostrationState = {
  name: string;
  password: string;
  email: string;
};

export default class Registration extends Component<{}, IRegiostrationState> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
    };
    this.onSingUp = this.onSingUp.bind(this);
  }

  componentDidMount() {
    console.log("firebase:", firebase);
  }

  onSingUp() {
    const { email, password, name } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser?.uid)
          .set({ name, email });
        console.log('RES: ', res);
        console.log(`User  [ ${name || email} ] created`);
      })
      .catch((e: any) => console.error(e));
  }
  render() {
    return (
      <View style={{ padding: 32 }}>
        <TextInput
          placeholder='name'
          onChangeText={(name) => this.setState({ name })}
        />
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
            this.onSingUp();
          }}
          title='Signup'
        />
      </View>
    );
  }
}
