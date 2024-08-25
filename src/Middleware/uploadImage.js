import React, { useState } from 'react';
import { View, Button, Image, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import {PUBLIC_UPLOAD_PRESET, PUBLIC_CLOUDINARY_API} from '@env';
const UploadImage = ({urlUploadComplete}) => {
  const [imageUri, setImageUri] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleImagePicker = () => {
    launchImageLibrary({
        mediaType: 'photo',
        quality: 1
    }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const handleUpload = async () => {
    if (!imageUri) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageUri);
    formData.append('upload_preset', 'uit_public'); 

    try {

      const res = await fetch("https://api.cloudinary.com/v1_1/drlakb5dh/image/upload", {
        method: "POST",
        body: formData,
      });
      const response = await res.json();
      console.log('response', response);
      console.log(PUBLIC_CLOUDINARY_API)
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
      {/* {uploadedImageUrl && <AdvancedImage cldImg={img} />} */}
    </View>
  );
};

export default UploadImage;