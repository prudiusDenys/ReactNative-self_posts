import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { DATA } from '../data'
import { Post } from '../components/Post'
import { PostList } from '../components/PostList'

export const BookScreen = ({ navigation }) => {

  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
  }

  return <PostList data={DATA.filter(post => post.booked)} onOpen={openPostHandler}/>
}

// create header on the main screen
BookScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Favorite',
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
