import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Post } from './Post'

export const PostList = ({ data, onOpen }) => {

  if (!data.length) {
    return (
      <View style={styles.wrapper}>
        <Text style={styles.noItems}>
          There are not any posts
        </Text>
      </View>
    )
  }

  return <View style={styles.wrapper}>
    <FlatList data={data}
              keyExtractor={post => post.id.toString()}
              renderItem={({ item }) => <Post post={item}
                                              onOpen={onOpen}/>}/>
  </View>
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
    flex: 1
  },
  noItems: {
    fontFamily: 'open-regular',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18
  }
})
