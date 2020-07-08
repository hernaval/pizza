import { AsyncStorage } from "react-native";

export const emailValidator = email => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return "Email oubligatoire";
    if (!re.test(email)) return "Renseigner une adresse email valide";
  
    return "";
  };
  
  export const passwordValidator = password => {
    if (!password || password.length <= 0) return "Mot de passe obligatoire";
  
    return "";
  };
  
  export const nameValidator = name => {
    if (!name || name.length <= 0) return "Name cannot be empty.";
  
    return "";
  };

  
  
  export const credValidator = cred =>{
    //if (!email || email.length <= 0) return "Email cannot be empty.";
        if(cred) return "Wrong credential .";

  }

 export const userExist = cred =>{
    //if (!email || email.length <= 0) return "Email cannot be empty.";
        if(cred) return "User with same mail already exist ";

  }


