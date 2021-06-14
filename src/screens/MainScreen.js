import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { DATA } from '../data'
import { Post } from '../components/Post'
import { PostList } from '../components/PostList'

export const MainScreen = ({ navigation }) => {

  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
  }

  return <PostList data={DATA} onOpen={openPostHandler}/>
}

// create header on the main screen
MainScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'My blog',
  headerRight: () => {
    return (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Take photo'}
              iconName={'ios-camera'}
              onPress={() => navigation.push('Create')}/>
      </HeaderButtons>
    )
  },
  headerLeft: () => {
    return (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item title={'Toggle Drawer'}
              iconName={'ios-menu'}
              onPress={() => navigation.toggleDrawer()}/>
      </HeaderButtons>
    )
  }
})
