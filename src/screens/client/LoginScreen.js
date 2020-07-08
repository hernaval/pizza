import React, { memo,useState } from 'react'
import {TouchableOpacity,View,Text,StyleSheet, Image,AsyncStorage} from "react-native"
import axios from "axios"
 import Background from "../../components/Background"
import TextInput from "../../components/TextInput"
import SignButton from "../../components/SignButton"; 

import { emailValidator,passwordValidator,credValidator } from "../../core/utils";
import { theme } from "../../core/theme";
import { loginClient } from "../../API/client/authClient";
import { API_URL } from '../../core/config'
import { storeDate } from '../../core/session'
const LoginScreen = ({navigation}) =>{

  
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
   
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    

const _handleSign = async() =>{
    console.log("ato")
 
       
      
  if(loading) return ;
  setLoading(true);
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)

      if (emailError || passwordError) {
        setEmail({ ...email, error: emailError });
        setPassword({ ...password, error: passwordError });
        return; 
    }else{
        let response = await loginClient({
            email : email.value,
            password : password.value
        })
      
      
        if(response == false) {
           
           setEmail({ ...email, error: "Indentifiant incorrect" });
           setPassword({...email,error : "Identifiant incorrect"})
  
       }else{
         try{
           await storeDate("client",email.value)
           navigation.state.params.express === true ? navigation.navigate("Commande") :
           navigation.navigate("Dashboard") 
         }catch(err){
          console.log(err)
         }
       

       }

      setLoading(false) 
    } 
  
      
}


    return(
        <Background>
          <Image  
            style={{maxWidth : 200,maxHeight : 200}}
            source={require("../../../assets/logo.png")}
            resizeMode="contain"
          />
          <Text style={{color :"yellow"}}>PIZZA REUNION</Text>
            {navigation.state.params.isNewCli === true && <Text style={{color : "green"}}>Votre compte client a été créer avec succèes</Text>}
            {navigation.state.params.isNewCli === true && <Text style={{color : "green"}}>Vous pouvez maintenant vous connecter</Text>}
            <TextInput 
                label ="Email"
                returnKeyType = "next"
                autoCapitalize="none"
                value={email.value}
              
                onChangeText={text => setEmail({value : text, error : ""})}
                error = {!!email.error}
                errorText = {email.error}
            />
            <TextInput 
                label ="Mot de passe"
                returnKeyType="done"
                autoCapitalize="none"
                value={password.value}
                onChangeText={text => setPassword({value : text, error :""})}
                error={!!password.error}
                errorText={password.error} 
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotClient")}
                >
                    <Text style={{color : "white"}}>Mot de passe oublié</Text>
                </TouchableOpacity>
            </View>

            <SignButton  loading={loading} mode="contained" onPress={_handleSign}>
                Me connecter
            </SignButton>

            <View style={styles.row}>
                <Text style={{color :"white"}}>Nouveau client ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                    <Text style={styles.link}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={{color :"white"}}>Plutôt prestataire ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoginPrestataire")}>
                    <Text style={styles.link}>ici</Text>
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
