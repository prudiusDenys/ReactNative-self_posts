import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Button, Image, View, StyleSheet } from 'react-native'
import * as Permissions from 'expo-permissions'

async function askForPermission () {
  const { status } = await Permissions.askAsync(
    Permissions.CAMERA,
    Permissions.CAMERA_ROLL
  )
  if (status !== 'granted') {
    Alert.alert('Error, There is now permission to take a photo')
    return false
  }
  return true
}

export const PhotoPicker = ({ onPick, image, setImage }) => {

  const takePhoto = async () => {
    const hasPermissions = await askForPermission()
    if (!hasPermissions) {
      return
    }
    const image = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: false,
      aspect: [16, 9]
    })

    setImage(image.uri)
    onPick(image.uri)
  }

  return (
    <View style={styles.wrapper}>
      <Button title={'Take photo'} onPress={takePhoto}/>
      {image && <Image style={styles.image} source={{ uri: image }}/>}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 10
  },
  image: {
    width: '100%',
    height: 400,
  }
})
