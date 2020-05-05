import React, { memo } from 'react'
import {TouchableOpacity,View,Text,StyleSheet} from "react-native"
import Background from "../components/Background"
import TextInput from "../components/TextInput"
import SignButton from "../components/SignButton";
import { theme } from "../core/theme";

const LoginScreen = ({navigation}) =>{
    return(
        <Background>
            <TextInput 
                label ="Email"
                returnKeyType = "next"
            />
            <TextInput 
                label ="Password"
                returnKeyType="done"
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPasswordScreen")}
                >
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            <SignButton mode="contained" onPress={()=>{}}>
                Login
            </SignButton>

            <View style={styles.row}>
                <Text style={styles.label}>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </Background>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
      width: "100%",
      alignItems: "flex-end",
      marginBottom: 24
    },
    row: {
      flexDirection: "row",
      marginTop: 4
    },
    label: {
      color: theme.colors.secondary
    },
    link: {
      fontWeight: "bold",
      color: theme.colors.primary
    }
  })
  

export default memo(LoginScreen)
