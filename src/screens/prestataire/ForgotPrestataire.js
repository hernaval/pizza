import React, { memo, useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import axios from "axios"
import Background from "../../components/Background"
import TextInput from "../../components/TextInput"
import SignButton from "../../components/SignButton";
import { motDePasseOublie } from '../../API/prestataire/authPrestataire'
import { theme } from "../../core/theme";
import { set } from 'react-native-reanimated'
const ForgotPrestataire = () => {


    const [email, setEmail] = useState({ value: "", error: "" })
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    
    const _resetPassword = async () => {
        let response = await motDePasseOublie(email.value)

        console.log(response)

        response === "emailnotexist" ? setEmail({ ...email, error: "Cet adresse email n'existe pas dans notre base" }) : setSent(true)
    }


    return (
        <Background>
            <Image
                style={{ maxWidth: 200, maxHeight: 200 }}
                source={require("../../../assets/logo.png")}
                resizeMode="contain"
            />
            <Text style={{ color: "yellow" }}>Réinitialisation mot de passe</Text>

            <TextInput
                label="Email"
                returnKeyType="next"
                autoCapitalize="none"
                value={email.value}

                onChangeText={text => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
            />
            {sent === true && <View>
                <Text style={{ color: "white" }}>Vous allez recevoir un mot de passe réinitialisé dans votre email.</Text>
                <View style={styles.row}>
                    <Text style={{ color: "white" }}>Vous n'avez reçu aucun mail ? </Text>
                    <TouchableOpacity onPress={() => {
                        setEmail({value :"",error :""})
                        setSent(false)
                        }}>
                        <Text style={styles.link}>Réessayer</Text>
                    </TouchableOpacity>
                </View>
            </View>}

            {sent === false &&

                <SignButton loading={loading} mode="contained" onPress={_resetPassword}>
                    Envoyer le code
            </SignButton>
            }

            {sent === false &&
                <View style={styles.row}>
                    <Text style={{ color: "white" }}>Nouveau client ? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
                        <Text style={styles.link}>S'inscrire</Text>
                    </TouchableOpacity>
                </View>
            }



        </Background>
    )
}

const styles = StyleSheet.create({
    forgotPassword: {
        width: "100%",
        alignItems: "flex-end",
        marginBottom: 24
    },
    row: {
        flexDirection: "row",
        marginTop: 4
    },
    label: {
        color: theme.colors.secondary
    },
    link: {
        fontWeight: "bold",
        color: theme.colors.primary
    }
})


export default memo(ForgotPrestataire)
