import React, { useState, useEffect, Children } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Button,
  Image,
  NativeSyntheticEvent,
  NativeTouchEvent,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { ImageInfo } from 'expo-image-picker/build/ImagePicker.types';

export default function AddPicture() {
  const [hasPermission, setHasPermission] = useState({
    camera: null || false,
    gallery: null || false,
  });
  const [camera, setCamera] = useState<Camera>();
  const [image, setImage] = useState<ImageInfo>();
  const [cameraLoaded, setCameraLoaded] = useState(false); //! return to it later

  const [type, setType] = useState(Camera.Constants.Type.back);
  const webPlatform = Platform.OS === 'web';

  useEffect(() => {
    (async () => {
      setHasPermission({
        gallery:
          (await ImagePicker.requestCameraPermissionsAsync()).status ===
          'granted',
        camera: webPlatform
          ? await Camera.isAvailableAsync()
          : (await Camera.requestPermissionsAsync()).status === 'granted',
      });
      if (hasPermission.camera) setCamera(camera); //! maybe don't need it
      if (!hasPermission.gallery)
        alert('Please give permission to access your pictured.');
    })();
  }, [camera]);

  if (hasPermission.camera === null) {
    return <View />;
  }
  if (hasPermission.camera === false) {
    return <Text>No access to camera </Text>;
  }

  const takePicture = async (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    if (camera) {
      const image = await camera.takePictureAsync();
      setImage(image);
    }
  };

  const pickImage = async (event: NativeSyntheticEvent<NativeTouchEvent>) => {
    let imageResult: ImagePicker.ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    });
    console.log("🚀 ~ file: AddPicture.tsx ~ line 63 ~ pickImage ~ res", imageResult)
    if (!imageResult.cancelled) {
      setImage(imageResult)
    }
  }





  // ------
  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          ref={(ref: Camera) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
          ratio={'1:1'}
        />
      </View>
      {!webPlatform && (
        <Button
          style={styles.button}
          title={`Flip to ${type === 1 ? 'back' : 'front'} camera`}
          onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}
        />
      )}
      <Button title='Take Picture' onPress={(e) => takePicture(e)} />
      <Button title='Gallery' onPress={(e) => pickImage(e)} />
      {image && <Image source={{ uri: image.uri }} style={{ flex: 1 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
