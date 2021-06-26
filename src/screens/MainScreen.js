import React, { useEffect } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { Post } from '../components/Post'
import { PostList } from '../components/PostList'
import { useDispatch, useSelector } from 'react-redux'
import { loadPostsAC } from '../store/actions/post'

export const MainScreen = ({ navigation }) => {

  const dispatch = useDispatch()
  const allPosts = useSelector(state => state.post.allPosts)
  const openPostHandler = (post) => {
    navigation.navigate('Post', { postId: post.id, date: post.date, booked: post.booked })
  }

  useEffect(() => {
    dispatch(loadPostsAC())
  }, [dispatch])

  return <PostList data={allPosts} onOpen={openPostHandler}/>
}

// create header on the main screen
MainScreen.navigationOptions = ({ navigation }) => ({
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
