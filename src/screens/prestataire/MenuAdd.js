import React, { Component, memo } from 'react'
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import TextInput from "../../components/TextInput"
import { theme } from "../../core/theme"
import SignButton from "../../components/SignButton"
import { ajouterMenu } from "../../API/prestataire/menu";
import { PRESTA_URI } from '../../core/config'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { API_URL } from "../../core/config"
import axios from "axios"
import { Button, Avatar } from 'react-native-paper';
import { currentPrestataire } from '../../core/session'
import TopMenuP from "../../components/TopMenuP"
class MenuAdd extends Component {
  constructor() {
    super()
    this.type = ""
    this.nom = ""
    this.description = ""
    this.taille = ""
    this.prix = ""
    this.image = "",

      this.state = {
        displayImg: null,
        prestataire: "",
        isLoading: false,
      }

  }

  componentDidMount = async () => {
    await this.getCameraPermissions()
    await this.fetchConnectedPresta()
  }
  fetchConnectedPresta = async () => {
    let presta = await currentPrestataire()
    this.setState({
      prestataire: presta
    })

  }
  getCameraPermissions = async () => {

    let { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      Alert("permission not granteed")

    } else {

    }
  }

  _addMenu = async () => {
    this.setState({ isLoading: true })
    let Num_prestataire = this.state.prestataire["Num_prestataire"]
    let menu = {
      Type: this.type,
      Nom_menu: this.nom,
      Description: this.description,
      Taille: this.taille,
      Prix: this.prix,
      image: this.image,
      nom_image: Math.random(),
      Num_prestataire: Num_prestataire
    }

    let response = await ajouterMenu(menu)
    this.setState({ isLoading: false })
    this.props.navigation.navigate("Menu")

  }


  upload = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({

      base64: true
    });

    if (!result.cancelled) {

      this.image = result.base64
      this.setState({ displayImg: result.uri })
    }

  }
  render() {
    return (
      <ImageBackground
        source={require("../../../assets/home.jpg")}
        style={{ flex: 1, width: "100%" }}>

        <View>
          <TopMenuP title="Ajout Menu" navigation={this.props.navigation} />
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
              onChangeText={text => this.type = text}

            />
            <TextInput
              label="Nom du menu"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={text => this.nom = text}
            />

            <TextInput
              label="Descriptions et ingrédients"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={text => this.description = text}
            />

            <TextInput
              label="Taille"
              returnKeyType="next"
              onChangeText={text => this.taille = text}
            />
            <TextInput
              label="Prix"
              returnKeyType="done"
              autoCapitalize="none"
              onChangeText={text => this.prix = text}
            />


            <Button style={{ backgroundColor: "red", marginBottom: 5 }} icon="camera" mode="contained" onPress={() => this.upload()}>
              Ajouter une photo
  </Button>

            {this.state.displayImg !== null && <Text>Votre image a été selectionnée</Text>}

            {this.state.displayImg !== null && <Image width={50} style={{width : 100}} source={{uri : this.state.displayImg}} />}

          </ScrollView>

        </View>

        <View>
          <SignButton
            loading={this.state.isLoading}
            mode="contained"
            onPress={this._addMenu}
            style={styles.button}
          >
            Ajouter
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
  }
});

export default memo(MenuAdd)
