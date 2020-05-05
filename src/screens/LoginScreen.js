import React, { memo,useState } from 'react'
import {TouchableOpacity,View,Text,StyleSheet} from "react-native"
import Background from "../components/Background"
import TextInput from "../components/TextInput"
import SignButton from "../components/SignButton";
import { emailValidator,passwordValidator } from "../core/utils";
import { theme } from "../core/theme";
import { loginUser } from '../API/auth-api';

const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

const _handleSign = async() =>{
    console.log("ok salut")
     if(loading) return ;

    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

    if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return; 
    }

    const response =  loginUser({
        email : email.value,
        password : password.value
    })
    setLoading(false)
}
    return(
        <Background>
            <TextInput 
                label ="Email"
                returnKeyType = "next"
                value={email.value}
                onChangeText={text => setEmail({value : text, error : ""})}
                error = {!!email.error}
                errorText = {email.error}
            />
            <TextInput 
                label ="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({value : text, error :""})}
                error={!!password.error}
                errorText={password.error} 
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPasswordScreen")}
                >
                    <Text style={styles.label}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>

            <SignButton  loading={loading} mode="contained" onPress={_handleSign}>
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
