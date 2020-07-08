import {API_URL } from "../../core/config"
import axios from "axios"
import qs from "qs"
const config = 
{headers : {
    "Content-Type" :    "application/x-www-form-urlencoded"
}}
export const ajouterMenu = async (menu) =>{
    let response = ""
    let pizza = {
        menu
    }
    await axios.post(`${API_URL}/prestataire/menu.php`,
        qs.stringify({pizza}),
        config
    )
    .then(async res => response =res.data)
    .catch(err => console.log(err))

    return response
}

export const deleteProduit = async (code_produit) => {
    let response = ""

    await axios.get(`${API_URL}/prestataire/deleteMenu.php?Code_produit=${code_produit}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}

export const updateProduit = async (Code_produit,{Nom_menu,Type,Taille,Description,Prix}) => {
    let response = ""
    console.log(Nom_menu)
    await axios.post(`${API_URL}/prestataire/menu.php?Code_produit=${Code_produit}`,
        qs.stringify({Nom_menu,Type,Taille,Description,Prix}),config)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}



