import React, { memo, useState } from 'react'
import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native"
import axios from "axios"
import Background from "../../components/Background"
import TextInput from "../../components/TextInput"
import SignButton from "../../components/SignButton";

import { emailValidator, passwordValidator, credValidator } from "../../core/utils";
import { theme } from "../../core/theme";
import { loginPrestataire } from '../../API/prestataire/authPrestataire'
import { storeDate } from '../../core/session'

const LoginPrestataire = ({ navigation }) => {
    const [email, setEmail] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const _handleSign = async () => {
        console.log("ato")



        if (loading) return;
        setLoading(true);
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)

        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError });
            setPassword({ ...password, error: passwordError });
            return;
        } else {
            let response = await loginPrestataire({
                email: email.value,
                password: password.value
            })


            if (response == "ok") {
                await storeDate("prestataire",email.value)
                navigation.navigate("MainPrestataire")
            } else if (response == "bloque") {
                setEmail({ ...email, error: "Vous êtes actuellement bloqué" });
            } else {
                setEmail({ ...email, error: "Indentifiant incorrect" });
                setPassword({...email,error : "Identifiant incorrect"})
            }

        }




        setLoading(false)
    }
    return (
        <Background>
            <Image
                style={{ maxWidth: 200, maxHeight: 200 }}
                source={require("../../../assets/logo.png")}
                resizeMode="contain"
            />
            <Text style={{ color: "yellow" }}>PIZZA REUNION</Text>
            <TextInput
                label="Email"
                returnKeyType="next"
                autoCapitalize="none"
                value={email.value}
                onChangeText={text => setEmail({ value: text, error: "" })}
                error={!!email.error}
                errorText={email.error}
            />
            <TextInput
                label="Mot de passe"
                returnKeyType="done"
                autoCapitalize="none"
                value={password.value}
                onChangeText={text => setPassword({ value: text, error: "" })}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
            />

            <View style={styles.forgotPassword}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ForgotPrestataire")}
                >
                    <Text style={{ color: "white" }}>Mot de passe oublié?</Text>
                </TouchableOpacity>
            </View>

            <SignButton loading={loading} mode="contained" onPress={_handleSign}>
                Me connecter
            </SignButton>

            <View style={styles.row}>
                <Text style={{ color: "white" }}>Nouveau prestataire? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("RegisterPrestataire")}>
                    <Text style={styles.link}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.row}>
                <Text style={{ color: "white" }}>Plutôt client ? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen",{express : false,isNewCli : false})}>
                    <Text style={styles.link}>ici</Text>
                </TouchableOpacity>
            </View>

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


export default memo(LoginPrestataire)
