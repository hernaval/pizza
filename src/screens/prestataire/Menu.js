import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { allMenuByPrest } from "../../API/prestataire/list";
import { ScrollView } from 'react-native-gesture-handler';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { MENU_URI } from '../../core/config';
import { deleteProduit } from '../../API/prestataire/menu';
import { currentPrestataire } from '../../core/session'
import TopMenuP from "../../components/TopMenuP"
class Menu extends Component {

    constructor() {
        super()
        this.state = {
            menus: [],
            prestataire: "",
            isLoading: false
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.fetchConnectedPresta()
        await this.fetchMenu()
        this.setState({ isLoading: false })
    }
    fetchConnectedPresta = async () => {
        let presta = await currentPrestataire()
        this.setState({
            prestataire: presta
        })

    }

    fetchMenu = async () => {
        let Num_prestataire = this.state.prestataire["Num_prestataire"]
        let response = await allMenuByPrest(Num_prestataire)

        response === "vide" ? this.setState({ menus: undefined }) : this.setState({ menus: response })

    }

    renderMenu = (id, code_produit, image, nom_menu) => (
        <View key={id} onPress={() =>
            this.props.navigation.navigate("Pizza", { Num_prestataire: 15 })
        } style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Avatar.Image size={100} source={{ uri: `${MENU_URI}${image}` }} />
            </View>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{nom_menu}</Text>
                <Button mode="contained" onPress={() => this.deletePizza(code_produit)} style={{ backgroundColor: "red" }}>Supprimer</Button>
                <Button onPress={() => { this.props.navigation.navigate("MenuEdit", { CodePdt: code_produit }) }}>Modifier</Button>
            </View>

        </View>
    )

    deletePizza = async (code_produit) => {

        let response = await deleteProduit(code_produit)

        response === "ok" ? await this.fetchMenu() : ""
    }
    render() {
        return (
            <ImageBackground
                source={require("../../../assets/home.jpg")}
                style={{ flex: 1, width: "100%" }}
            >
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}

                <View>
                    <TopMenuP title="Menus" navigation={this.props.navigation} />
                </View>

                <View style={styles.container}>
                    <View style={{ flexDirection: "column", alignItems: "center" }}>
                        <Image
                            style={{ maxWidth: 200, maxHeight: 200 }}
                            source={require("../../../assets/logo.png")}
                            resizeMode="contain"
                        />
                        <Text style={{ color: "yellow" }}>Les menus</Text>
                    </View>


                    <ScrollView horizontal={true}>
                        {this.state.menus !== undefined && this.state.menus.map((menu, i) => {
                            return this.renderMenu(i, menu.Code_produit, menu.file, menu.Nom_menu)
                        })

                        }
                    </ScrollView>

                    {this.state.isLoading === false &&

                    <Button labelStyle={{ color: "#000" }} style={{ backgroundColor: "white", marginTop: 10 }} mode="contained" onPress={() => this.props.navigation.navigate("MenuAdd")}>
                        Ajouter un menu
                </Button>
                }

                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    cardContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        width: wp('70%'),

        marginRight: 10,
        borderRadius: 5
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
})
export default memo(Menu)