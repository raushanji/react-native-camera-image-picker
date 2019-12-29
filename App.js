import React,{ Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, NativeModules, Image } from 'react-native';

export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      avatarSource: ""
    }
  }

  openCamera = () => {
    console.log("open camera clicked......");
    let options = {
      // title: 'Select Avatar',
      // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      // storageOptions: {
      //   skipBackup: true,
      //   path: 'images',
      // },
      title: 'Select a Photo',
      cancelButtonTitle: 'Cancel',
      takePhotoButtonTitle: 'Take Photo…',
      chooseFromLibraryButtonTitle: 'Choose from Library…',
      quality: 1.0,
      allowsEditing: false,
      permissionDenied: {
        title: 'Permission denied',
        text:
          'To be able to take pictures with your camera and choose images from your library.',
        reTryTitle: 're-try',
        okTitle: "I'm sure",
      },
      tintColor: 'blue',
    };

    NativeModules.ImagePickerManager.showImagePicker(options, (response) => {
      console.log('Response = ', response);
     
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
     
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
     
        this.setState({
          avatarSource: source.uri,
        });
      }
    });
  }

  render() {
    return(
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {this.state.avatarSource !== "" ?
        <View style={{width: 200, height: 200, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={{uri: this.state.avatarSource}} style={{width: 150, height: 150}} />
        </View>
        : null
        }
        <Text>Welcome to RAUSHAN World!</Text>
        <TouchableOpacity onPress={()=> { this.openCamera() }} style={{width: 120, height: 40, borderRadius: 8, backgroundColor: '#38ACEC', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>Open Camera</Text>
        </TouchableOpacity>
      </View>
    )
  }
}