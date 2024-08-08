import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const ImagePicker = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setSelectedImage(response.assets[0].uri);
      }
    });
  };
  console.log(selectedImage)

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage} style={styles.button}>
        <Text style={styles.buttonText}>Select Image</Text>
      </TouchableOpacity>
      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
          <Text style={styles.imageName}>{selectedImage.split('/').pop()}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  imageName: {
    marginTop: 10,
    color: '#FFF',
    fontSize: 14,
  },
});

export default ImagePicker;
