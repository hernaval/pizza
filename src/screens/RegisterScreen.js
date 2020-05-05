import React,{memo,useState} from 'react'
import { View, Text,StyleSheet, TouchableOpacity } from 'react-native'
import TextInput from "../components/TextInput"
import SignButton from "../components/SignButton"
import Background from "../components/Background"
import { theme } from "../core/theme"
import { emailValidator,passwordValidator,nameValidator } from "../core/utils";
import { signUpUser } from "../API/auth-api";
const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const _handleSignUp = async() =>{
    
     if (loading) return;

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    setLoading(true);

    const response = await signUpUser({
      name : name.value,
      email : email.value,
      password : password.value
    })
 
    setLoading(false);
    
  }
    return (
        <Background>
            <TextInput
                label="Name"
                returnKeyType="next"
                autoCapitalize="none"
                value={name.value}
                onChangeText={text => setName({ value: text, error: "" })}
                error={!!name.error}
                errorText={name.error}
            />
            <TextInput 
                label="Email"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({value : text, error : ""})}
                error = {!!email.error}
                errorText = {email.error}

            />
            <TextInput
                label="Password"
                returnKeyType="done"
                autoCapitalize="none"
                value={password.value}
                onChangeText={text => setPassword({value : text, error :""})}
                error={!!password.error}
                errorText={password.error} 
                secureTextEntry

       
            />

            <SignButton
            mode="contained"
            loading={loading}
            style={styles.button}
            onPress={_handleSignUp}>
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

