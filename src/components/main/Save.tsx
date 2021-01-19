import React, { useState } from 'react';
import { View, Image, TextInput, Button } from 'react-native';
import firebase from 'firebase';
// import firestore from 'firebase/firestore';
// import { storage } from 'firebase/firebase-storage';
// require('firebase/firestore');
// require('firebase/firebase-storage');

export default function Save(props, { navigation }) {
  const [caption, setCaption] = useState('');
  const upload = async () => {
    const uri = props.route.params.image.uri;
    const response = await fetch(uri);
    const blob = await response.blob();
    const childPath = `post/${
      firebase.auth().currentUser?.uid
    }/${Math.random().toString(36)}}`;
    console.log('childPath:', childPath);
    const task = firebase.storage().ref().child(childPath).put(blob);
    const taskProgress = (snapshot) => {
      console.log(`transferred: ${snapshot.bytesTransferred}`);
    };

    const taskCompleted = () => {
      task.snapshot.ref
        .getDownloadURL()
        .then((downloadURL) => savePostsData(downloadURL));
    };
    const savePostsData = (downloadURL: any) => {
      firebase
        .firestore()
        .collection('posts')
        .doc(firebase.auth().currentUser?.uid)
        .collection('userPosts')
        .add({
          downloadURL,
          caption,
          creation: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => props.navigation.popToTop());
    };
    const taskError = (error) => console.log('error:', error);
    task.on('state_changed', taskProgress, taskError, taskCompleted);
  };
  return (
    <View style={{ flex: 1 }}>
      <Image src={{ uri: props.route.params.image }} />
      <TextInput
        placeholder='Write a caption...'
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title='Save' onPress={() => upload()} />
    </View>
  );
}
