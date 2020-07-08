import {API_URL } from "../../core/config"
import axios from "axios"
import qs from "qs"
const config = 
    {headers : {
        "Content-Type" :    "application/x-www-form-urlencoded"
    }}
export const validerCommande = async (ref_commande,Num_prestataire)  =>{
    let response = ""

    await axios.post(`${API_URL}/prestataire/validerCommande.php?ref_commande=${ref_commande}&Num_prestataire=${Num_prestataire}`,config)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}

export const annulerCommande = async (ref_commande) => {
    let response = ""

    await axios.post(`${API_URL}/prestataire/annulerCommande.php?ref_commande=${ref_commande}`)
        .then(async res => response = res)
        .catch(err => console.log(err))
    
    
        return response
}
