import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { AppHeaderIcon } from '../components/AppHeaderIcon'

export const AboutScreen = () => {
  return <View style={styles.center}>
    <Text>This is the best application for private notes</Text>
    <Text>Version <Text style={styles.version}>1.0.0</Text></Text>
  </View>
}

// create header on the main screen
AboutScreen.navigationOptions = ({navigation}) => ({
  headerTitle: 'About App',
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

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  version:{
    fontWeight: 'bold'
  }
})
