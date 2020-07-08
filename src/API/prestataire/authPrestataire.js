import {API_URL } from "../../core/config"
import axios from "axios"
import qs from "qs"
const config = 
    {headers : {
        "Content-Type" :    "application/x-www-form-urlencoded"
    }}


export const loginPrestataire = async ({email,password}) =>{
    let response = ""
   
    await axios.post(`${API_URL}/prestataire/login.php`,
        qs.stringify({email,password}),
        config
    ).then( async res => {
        
        response = res.data
    })
    .catch(err => console.log(err))

return response
}

export const signUpPrestataire =async (prestataire) => {
    let response = ""

    let data = {
        prestataire
    }
    
    await axios.post(`${API_URL}/prestataire/signup.php`,qs.stringify({data}),config)
        .then(async res => response =res.data)
        .catch(err => console.log(err))

    return response
}

export const connectedPrestataire = async(email) => {
    let response = ""

    await axios.get(`${API_URL}/prestataire/prestataire.php?email=${email}`)
        .then(async res => response = res.data)
        .catch(err => console.log(res))

    return response
}

export const motDePasseOublie = async(email) =>{
    let response = ""

    await axios.post(`${API_URL}/resetPassword.php?isPrestataire=true&email=${email}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}