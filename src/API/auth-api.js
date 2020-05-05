export const signUpUser = async ({name,email,password}) =>{
    let response = ""
     await fetch("https://rn-log.herokuapp.com/users/signup",{
        method : "post",
        headers : {
            'Content-Type' : "application/x-www-form-urlencoded",
            'Content-Type' : "application/json"
        },
        body :JSON.stringify({
            email : email,
            fullname :name,
            password : password
        })
    })
   .then(res => res.json())
   .then(async (data)  => {
    response =  data.error 
    
   })

   return response
}

export const loginUser = async({email, password}) =>{
    let response =""
     await fetch("https://rn-log.herokuapp.com/users/signin",{
        method : "post",
        headers : {
            'Content-Type' : "application/x-www-form-urlencoded",
            'Content-Type' : "application/json"
        },
        body :JSON.stringify({
            email : email,
            password : password
        })
    })
    .then( res =>  res.json())
    .then(async (data) =>{
       response =  !data.error ? await data.success : await data.error
        
    })
    return response
}