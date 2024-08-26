import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import {PUBLIC_UPLOAD_PRESET, PUBLIC_CLOUDINARY_API} from '@env';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const UploadImage = ({urlUploadComplete}) => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleImagePicker = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleUpload = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }
    const base64 = await FileSystem.readAsStringAsync(imageUri, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const formData = new FormData();
    formData.append('file', `data:image/jpeg;base64,${base64}`);
    formData.append('upload_preset', 'uit_public'); 
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/drlakb5dh/image/upload", {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      console.log('response', response);
      const uploadedUrl = response.secure_url;
      setUploadedImageUrl(response.secure_url);
      Alert.alert('Success', 'Image uploaded successfully');
      urlUploadComplete(uploadedUrl);
    } catch (error) {
      console.error('Upload Error: ', error);
      Alert.alert('Error', 'Failed to upload image');
    }
  };

  const cld = new Cloudinary({ cloud: { cloudName: 'drlakb5dh' } });
  const img = uploadedImageUrl ? cld.image(uploadedImageUrl) : cld.image('cld-sample-5');
  img.format('auto').quality('auto').resize(auto().gravity(autoGravity()).width(500).height(500));

  return (
    <View>
      <Button title="Chọn ảnh" onPress={handleImagePicker} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100, marginBottom: 12 }} />}
      <Button title="Upload"  onPress={handleUpload} />
      {/* {imageUri && <Image source={{ uri: imageUri }} style={{ width: 150, height: 150, marginBottom: 12 }} />} */}
    </View>
  );
};

export default UploadImage;