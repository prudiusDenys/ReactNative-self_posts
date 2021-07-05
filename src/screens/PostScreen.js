import React, { useCallback, useEffect } from 'react'
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { THEME } from '../theme'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { useDispatch, useSelector } from 'react-redux'
import { removePostAC, toggleBookedAC } from '../store/actions/post'

export const PostScreen = ({ navigation }) => {

  const dispatch = useDispatch()

  //receive post id from MainScreen 'key is postId'
  const postId = navigation.getParam('postId')
  const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId))
  const post = useSelector(state => state.post.allPosts.find(post => post.id === postId))

  const toggleHandler = useCallback(() => {
    dispatch(toggleBookedAC(post))
  }, [dispatch, post])

  useEffect(() => {
    navigation.setParams({ booked })
  }, [booked])

  useEffect(() => {
    navigation.setParams({ toggleHandler })
  }, [toggleHandler])

  const removeHandler = () => {
    Alert.alert(
      'Delete the post',
      'Are you sure you want to delete this post?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress () {
            dispatch(removePostAC(postId))
            navigation.navigate('Main')
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: false,
        onDismiss: () =>
          Alert.alert(
            'This alert was dismissed by tapping outside of the alert dialog.'
          ),
      }
    )
  }

  if (!post) {
    return null
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
  const booked = navigation.getParam('booked')
  const toggleHandler = navigation.getParam('toggleHandler')
  const iconName = booked ? 'ios-star' : 'ios-star-outline'
  return {
    headerTitle: 'Post ' + new Date(date).toLocaleDateString(),
    // headerStyle: {
    //   backgroundColor: 'red'
    // },
    // headerTintColor: '#fff'
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
          <Item title={'Take photo'}
                iconName={iconName}
                onPress={() => toggleHandler}/>
        </HeaderButtons>
      )
    },
  }
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400,
  },
  textWrap: {
    padding: 10
  },
  title: {
    fontFamily: 'open-regular'
  }
})
