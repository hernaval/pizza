export const signUpUser = ({name,email,password}) =>{

     fetch("https://rn-log.herokuapp.com/users/signup",{
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
    .then(console.log("ao tsara"))
}

export const loginUser = async({email, password}) =>{
     fetch("https://rn-log.herokuapp.com/users/signin",{
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
    .then(res => console.log("metye"))
}