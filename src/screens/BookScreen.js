import React from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { Post } from '../components/Post'
import { PostList } from '../components/PostList'
import { useSelector } from 'react-redux'

export const BookScreen = ({ navigation }) => {

  const bookedPosts = useSelector(state => state.post.bookedPosts)

  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
  }

  return <PostList data={bookedPosts} onOpen={openPostHandler}/>
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
