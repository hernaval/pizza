import React,{memo} from 'react'
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import TextInput from "../components/TextInput"
import SignButton from "../components/SignButton"
import Background from "../components/Background"
import { theme } from "../core/theme";

const RegisterScreen = ({navigation}) => {
    return (
        <Background>
            <TextInput
                label="Name"
                returnKeyType="next"
            />
            <TextInput 
                label="Email"
                returnKeyType="next"

            />
            <TextInput
                label="Password"
                secureTextEntry
       
            />

            <SignButton
            mode="contained"
            style={styles.button}
            onPress={()=>{}}>
                Sign Up
            </SignButton>

            
      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

        </Background>

        
    )
}

const styles = StyleSheet.create({
    label: {
      color: theme.colors.secondary
    },
    button: {
      marginTop: 24
    },
    row: {
      flexDirection: "row",
      marginTop: 4
    },
    link: {
      fontWeight: "bold",
      color: theme.colors.primary
    }
  });

export default memo(RegisterScreen)

