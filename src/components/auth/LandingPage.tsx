import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

export default function LandingPage({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button
          title='Registeration'
          onPress={() => navigation.navigate('Registration')}
        />
      </View>
      <View>
        <Button title='Log in' onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '4rem',
  },
  button: {
    marginBottom: '2rem',
  },
  red: {
    color: 'red',
  },
});
