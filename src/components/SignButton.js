import React, { Component, memo } from 'react'
import { Text, View,StyleSheet } from 'react-native'
import { Button as SignBtn } from "react-native-paper";
import { theme } from "../core/theme"
const SignButton = ({mode,style,children,...props}) => (
    <SignBtn
    style={[
        styles.button,
        mode === "outlined" && {backgroundColor : theme.colors.surface,
        style }
    ]}
    labelStyle={[
        styles.text,
        mode === "contained" && {color : theme.colors.surface}
    ]}

    mode={mode}
    {...props}
    >
        {children}
    </SignBtn>
)

const styles = StyleSheet.create({
    button: {
      width: "100%",
      marginVertical: 10
    },
    text: {
      fontWeight: "bold",
      fontSize: 15,
      lineHeight: 26
    }
  })

  export default memo(SignButton)
