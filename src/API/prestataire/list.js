import {API_URL } from "../../core/config"
import axios from "axios"
import qs from "qs"

export const commandeAvalider =async (Num_prestataire) =>{
    let response =[]

    await axios.get(`${API_URL}/prestataire/commande.php?Num_prestataire=${Num_prestataire}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))
    
     return response
}

export const allCommande = async (Num_prestataire) =>{
    let response = []

    await axios.get(`${API_URL}/prestataire/facture.php?Num_prestataire=${Num_prestataire}`)
        .then(async res => response =res.data)
        .catch(err => console.log(err))

    return response
}
export const allMenuByPrest =async (Num_prestataire) => {
    let response = []

    await axios.get(`${API_URL}/prestataire/menuList.php?Num_prestataire=${Num_prestataire}`)
        .then(async res => response =res.data)
        .catch(async err => console.log(err))
    
        return response
}

export const CommandeRef = async (ref_commande) => {
    let response = ""

    await axios.get(`${API_URL}/prestataire/commandeQuery.php?ref_commande=${ref_commande}`)
        .then(async res => response =res.data)
        .catch(err => console.log(err))
    
    
        return response
}

export const getProduitByCode = async (Code_produit) => {
    let response = ""
    await axios.get(`${API_URL}/prestataire/menuList.php?Code_produit=${Code_produit}`)
        .then(async res => response = res.data)
        .catch(err => console.log(err))

    return response
}