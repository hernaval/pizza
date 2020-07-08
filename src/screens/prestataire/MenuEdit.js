import React, { Component, memo } from 'react'
import { Text, View, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ImageBackground } from 'react-native'
import TextInput from "../../components/TextInput"
import { theme } from "../../core/theme"
import SignButton from "../../components/SignButton"

import { PRESTA_URI } from '../../core/config'
import * as Permissions from 'expo-permissions'

import { API_URL } from "../../core/config"

import { Button, Avatar } from 'react-native-paper';
import { currentPrestataire } from '../../core/session'
import { getProduitByCode } from '../../API/prestataire/list'
import { updateProduit } from '../../API/prestataire/menu'
import TopMenuP from "../../components/TopMenuP"
class MenuEdit extends Component {
    constructor() {
        super()

        this.state = {

            type: "",
            nom: "",
            description: "",
            taille: "",
            prix : "",

            displayImg: null,
            prestataire: "",
            isLoading: false
        }

    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.getCameraPermissions()
        await this.fetchConnectedPresta()
        await this.fethMenuToEdit()
        this.setState({ isLoading: false })
    }
    fetchConnectedPresta = async () => {
        let presta = await currentPrestataire()
        this.setState({
            prestataire: presta
        })

    }
    getCameraPermissions = async () => {

        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
            Alert("permission not granteed")

        } else {

        }
    }

    fethMenuToEdit = async () => {
        let Code_produit = this.props.navigation.state.params.CodePdt
        let response = await getProduitByCode(Code_produit)

        this.setState({
            type: response["Type"],
            nom: response["Nom_menu"],
            description: response["Description"],
            taille: response["Taille"],
            prix : response["Prix"]
        })
    }


    _editMenu = async  () => {
        this.setState({isLoading : true})
        let Code_produit = this.props.navigation.state.params.CodePdt
        let response = await updateProduit(Code_produit,{

            Nom_menu : this.state.nom,
            Type : this.state.type,
            Taille : this.state.taille,
            Description : this.state.description,
            Prix : this.state.prix,
            
        })
            console.log(response)
        this.setState({isLoading : false})
        this.props.navigation.navigate("MainPrestataire")
    }

    render() {
        return (
            <ImageBackground
                source={require("../../../assets/home.jpg")}
                style={{ flex: 1, width: "100%" }}>

                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}

                <View>
                    <TopMenuP title="Modification" navigation={this.props.navigation} />
                </View>

                <View style={{ flex: 1, padding: 20, justifyContent: "center", }}>
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Avatar.Image size={150} source={{ uri: `${PRESTA_URI}/${this.state.prestataire["nom_file"]}` }} />
                        <Text style={{ color: "yellow" }}>Ajouter un menu</Text>

                    </View>
                    <ScrollView>
                        <TextInput
                            label="Type"
                            returnKeyType="next"
                            autoCapitalize="none"
                            value={this.state.type}
                            onChangeText={text => this.setState({type : text})}

                        />
                        <TextInput
                            label="Nom du menu"
                            returnKeyType="next"
                            autoCapitalize="none"
                            value={this.state.nom}
                            onChangeText={text => this.setState({nom : text})}
                        />

                        <TextInput
                            label="Descriptions et ingrédients"
                            returnKeyType="next"
                            autoCapitalize="none"
                            value={this.state.description}
                            onChangeText={text => this.setState({description : text})}
                        />

                        <TextInput
                            label="Taille"
                            returnKeyType="next"
                            value={this.state.taille}
                            onChangeText={text => this.setState({taille : text})}
                        />
                        <TextInput
                            label="Prix"
                            returnKeyType="done"
                            autoCapitalize="none"
                            value={this.state.prix}
                            onChangeText={text => this.setState({prix : text})}
                        />


                    </ScrollView>

                </View>

                <View>
                    <SignButton
                        mode="contained"
                        onPress={this._editMenu}
                        style={styles.button}
                    >
                        Enregistrer
            </SignButton>




                </View>
            </ImageBackground>


        )
    }
}

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary
    },
    button: {
        marginTop: 24
    },
    row: {
        flexDirection: "row",
        marginTop: 4
    },
    link: {
        fontWeight: "bold",
        color: theme.colors.primary
    },
    loading_container: {
        position: 'absolute',
        zIndex: 10,
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default memo(MenuEdit)
