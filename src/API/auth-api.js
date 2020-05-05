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