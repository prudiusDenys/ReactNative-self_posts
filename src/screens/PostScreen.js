import React from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { DATA } from '../data'
import { THEME } from '../theme'

export const PostScreen = ({ navigation }) => {

  //receive post id from MainScreen 'key is postId'
  const postId = navigation.getParam('postId')
  const post = DATA.find(p => p.id === postId)

  const removeHandler = () => {
    Alert.alert(
      "Delete the post",
      "Are you sure you want to delete this post?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {},
          style: "destructive",
        },
      ],
      {
        cancelable: false,
        onDismiss: () =>
          Alert.alert(
            "This alert was dismissed by tapping outside of the alert dialog."
          ),
      }
    );
  }
  return (
    <ScrollView>
      <Image source={{ uri: post.img }} style={styles.image}/>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{post.text}</Text>
      </View>
      <Button title="delete" color={THEME.DANGER_COLOR} onPress={removeHandler}/>
    </ScrollView>
  )
}

PostScreen.navigationOptions = ({ navigation }) => {
  // receive data by key 'date' and pass it to header
  const date = navigation.getParam('date')
  return {
    headerTitle: 'Post ' + new Date(date).toLocaleDateString(),
    // headerStyle: {
    //   backgroundColor: 'red'
    // },
    // headerTintColor: '#fff'
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
})
