export const emailValidator = email => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return "Email cannot be empty.";
    if (!re.test(email)) return "need a valid email address.";
  
    return "";
  };
  
  export const passwordValidator = password => {
    if (!password || password.length <= 0) return "Password cannot be empty.";
  
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