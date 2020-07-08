import React, { memo } from 'react'
import { View, Text,Image, StyleSheet } from 'react-native'
import Background from '../../components/Background'
import { TouchableRipple } from 'react-native-paper'
import { Button } from 'react-native-paper'

const RegisterDone = ({ navigation }) => {
    return (
        <Background>
            <Image
                style={{ maxWidth: 200, maxHeight: 200 }}
                source={require("../../../assets/logo.png")}
                resizeMode="contain"
            />
            <Text style={{ color: "yellow" }}>PIZZA REUNION</Text>
            <View>
                <Text style={styles.message}>Pizza Reunion vous remercie de votre inscription.</Text>
                <Text style={styles.message}>Un email de confirmation vous serez  envoyé par un administateur</Text>
                <Button uppercase={false} mode="contained" onPress={() => navigation.navigate("LoginPrestataire")}>
                    Terminer
                </Button>
            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    container : {

    },
    message : {
        textAlign : "center",
        color : "white",
    }
})
export default memo(RegisterDone)
