import React, { memo } from 'react'
import {  KeyboardAvoidingView, StyleSheet,ImageBackground } from 'react-native'

const Background = ({children}) =>(
    <ImageBackground
    source={require("../../assets/bgPizza7.jpg")}
        resizeMode="cover"
        style = {styles.background}
    >
        <KeyboardAvoidingView style={styles.container}>
            {children}
        </KeyboardAvoidingView>
    </ImageBackground>
)
const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: "100%"
    },
    container: {
      flex: 1,
      padding: 20,
      width: "100%",
      maxWidth: 340,
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "center"
    }
  })
  
  export default memo(Background);

