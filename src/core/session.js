import { AsyncStorage } from "react-native"
import { connectedClient } from "../API/client/authClient"
import { connectedPrestataire } from "../API/prestataire/authPrestataire"

export const currentClient = async () =>{
    let email = await AsyncStorage.getItem("client")
   
    let client = await connectedClient(email)
   
    return client
}

export const currentPrestataire = async () => {
    let email = await AsyncStorage.getItem("prestataire")
  
    let prestataire = await connectedPrestataire(email)

    return prestataire
}

export const storeDate = async (key,value) =>{
    try {
        await AsyncStorage.setItem(key, value);
      } catch (error) {
       
        // Error saving data
      }
}