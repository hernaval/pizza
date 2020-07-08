import React, { memo, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Image,ImageBackground } from 'react-native'
import TextInput from "../../components/TextInput"
import SignButton from "../../components/SignButton"
import Background from "../../components/Background"
import { theme } from "../../core/theme"
import { emailValidator, passwordValidator, userExist, nameValidator } from "../../core/utils";

import { ScrollView } from 'react-native-gesture-handler'
import { signUpClient } from '../../API/client/authClient'
import { storeDate } from '../../core/session'
const RegisterScreen = ({ navigation }) => {
  const [nom, setNom] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({value : "", error :""})
  const [loading, setLoading] = useState(false);
  const [pseudo, setPseudo] = useState({ value: "", error: "" })
  const [phone, setPhone] = useState({value : "", error :""})
  const [error, setError] = useState("");


  const _handleSignUp = async () => {

    if (loading) return;
   
    /* const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } */

    setLoading(true);

    const response = await signUpClient({
      nom: nom.value,
     phone : phone.value,
      pseudo: pseudo.value,
      email: email.value,
      password: password.value
    })

    

    if (response == "emailuser") {
      const emailError = userExist(email.value);

      setEmail({ ...email, error: emailError })
    } else {
     
      navigation.navigate("LoginScreen",{isNewCli: true})
    }

    setLoading(false);

  }
  return (
    <ImageBackground
      source={require("../../../assets/bgPizza7.jpg")}
      resizeMode="cover"
      style = {{flex : 1}}
    >
      
      <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image
            style={{ maxWidth: 200, maxHeight: 200 }}
            source={require("../../../assets/logo.png")}
            resizeMode="contain"
          />
          <Text style={{ color: "yellow" }}>Devenez notre client</Text>
        </View>


<View style={styles.container}>

     <ScrollView style={styles.formContainer}>
     
       <TextInput
         label="Nom"
         returnKeyType="next"
         autoCapitalize="none"
         value={nom.value}
         onChangeText={text => setNom({ value: text, error: "" })}
         error={!!nom.error}
         errorText={nom.error}
       />
       <TextInput
         label="Pseudo"
         returnKeyType="next"
         autoCapitalize="none"
         value={pseudo.value}
         onChangeText={text => setPseudo({ value: text, error: "" })}
         error={!!pseudo.error}
         errorText={pseudo.error}
       />

       <TextInput
         label="Téléphone"
         returnKeyType="next"
         autoCapitalize="none"
         value={phone.value}
         onChangeText={text => setPhone({ value: text, error: "" })}
         error={!!phone.error}
         errorText={phone.error}
       />
      
       <TextInput
         label="Email"
         returnKeyType="next"
         value={email.value}
         onChangeText={text => setEmail({ value: text, error: "" })}
         error={!!email.error}
         errorText={email.error}

       />
       

       <TextInput
         label="Mot de passe"
         returnKeyType="done"
         autoCapitalize="none"
         value={password.value}
         onChangeText={text => setPassword({ value: text, error: "" })}
         error={!!password.error}
         errorText={password.error}
         secureTextEntry


       />
       <TextInput
         label="Confirmation mot de passe"
         returnKeyType="done"
         autoCapitalize="none"
         value={confirmPassword.value}
         //onChangeText={text => setPassword({value : text, error :""})}
         error={!!confirmPassword.error}
         errorText={confirmPassword.error}
         secureTextEntry


       />

       
     </ScrollView>
     
    
     <View>
       <SignButton
         mode="contained"
         loading={loading}
         style={styles.button}
         onPress={_handleSignUp}>
         M'inscrire
           </SignButton>


       <View style={styles.row}>
         <Text style={{color : "white"}}>J'ai déjà un compte </Text>
         <TouchableOpacity onPress={() => navigation.navigate("LoginScreen",{message : true})}>
           <Text style={styles.link}>Se connecter</Text>
         </TouchableOpacity>
       </View>

     </View>
   </View>

    </ImageBackground>
   
  )
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
    margin  : 20,
    justifyContent : "center",
    
  },  
  formContainer : {
    
  },
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

