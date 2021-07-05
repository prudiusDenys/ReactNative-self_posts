import React, { useRef, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'
import { AboutScreen } from './AboutScreen'
import { THEME } from '../theme'
import { SceneView } from 'react-navigation'
import { useDispatch } from 'react-redux'
import { addPostAC } from '../store/actions/post'
import { PhotoPicker } from '../components/PhotoPicker'

export const CreateScreen = ({ navigation }) => {
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()
  //create imgRef in order to save taken photo and not to do refresh page
  const imgRef = useRef()

  const saveHandler = () => {
    const post = {
      date: new Date().toJSON(),
      text: text,
      img: imgRef.current,
      booked: false
    }
    dispatch(addPostAC(post))
    setText('')
    setImage(null)
    navigation.navigate('Main')
  }

  const photoPickHandler = uri => {
    imgRef.current = uri
  }

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Create a new post</Text>
          <TextInput style={styles.textarea}
                     placeholder={'Enter your text'}
                     value={text}
                     onChangeText={setText}
                     multiline/>
          <PhotoPicker onPick={photoPickHandler} image={image} setImage={setImage}/>
          <Button title={'Create a new post'}
                  color={THEME.MAIN_COLOR}
                  onPress={saveHandler}
                  disabled={!text}/>
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

// create header on the main screen
CreateScreen.navigationOptions = ({ navigation }) => ({
  headerTitle: 'Create post',
  headerLeft: () => {
    return (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title={'Toggle Drawer'}
          iconName={'ios-menu'}
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  },
})

const styles = StyleSheet.create({
  wrapper: {
    padding: 10
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'open-regular',
    marginVertical: 10
  },
  textarea: {
    padding: 10,
    marginBottom: 10
  }
})
