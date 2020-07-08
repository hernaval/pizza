import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { currentPrestataire } from '../../core/session'
import { PRESTA_URI } from '../../core/config'
import { Avatar } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TopMenuP from "../../components/TopMenuP"

class MainPrestataire extends Component {

    constructor() {
        super()
        this.state = {
            prestataire: ""
        }
    }

    componentDidMount = async () => {
        await this.fetchConnectedPresta()

    }

    fetchConnectedPresta = async () => {
        let presta = await currentPrestataire()
        this.setState({
            prestataire: presta
        })

    }


    render() {
        return (
            <ImageBackground
                source={require("../../../assets/home.jpg")}
                style={{ flex: 1, width: "100%" }}
            >
                <View>
                    <TopMenuP title="Dashboard" navigation={this.props.navigation} />
                </View>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    <Avatar.Image size={150} source={{ uri: `${PRESTA_URI}/${this.state.prestataire["nom_file"]}` }} />
                    <Text style={{ color: "yellow" }}>{this.state.prestataire["Nom_etablissement"]}</Text>
                </View>
                <View style={styles.container}>


                    <View style={{ flexDirection: "row" }} >
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate("Menu")
                        } style={styles.cardContainer}>
                            <View style={styles.imageContainer}>
                                <Avatar.Image source={require("../../../assets/assietePizza.png")} size={70} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 18, color: "#F6820D" }}>Menus</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate("CommandePrestataire")
                        } style={styles.cardContainer}>
                            <View style={styles.imageContainer}>
                                <Avatar.Image source={require("../../../assets/commande.jpg")} size={70} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 18, color: "#F6820D" }}>Commandes</Text>
                            </View>

                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }} >
                        <TouchableOpacity onPress={() =>
                            this.props.navigation.navigate("Historiques")
                        } style={styles.cardContainer}>
                            <View style={styles.imageContainer}>
                                <Avatar.Image source={require("../../../assets/chart.png")} size={70} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 18, color: "#F6820D" }}>Historiques</Text>
                            </View>

                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }
                        } style={styles.cardContainer}>
                            <View style={styles.imageContainer}>
                                <Avatar.Image source={require("../../../assets/user.png")} size={70} />
                            </View>
                            <View>
                                <Text style={{ fontWeight: "bold", fontSize: 18, color: "#F6820D" }}>Profil</Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                </View>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    cardContainer: {
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "white",
        width: wp('50%'),

        marginRight: 10,
        borderRadius: 5
    },
})
export default memo(MainPrestataire)
