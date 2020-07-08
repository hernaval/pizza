import React, { memo, useState } from 'react'
import { View, Text, ImageBackground, StyleSheet, AsyncStorage } from 'react-native'

import { Button } from 'react-native-paper';
import { currentClient } from "../../core/session";

import TopMenu from "../../components/TopMenu"



class Dashboard extends React.Component {
    constructor() {
        super()
        this.state = {
            client: null
        }
    }
    componentDidMount = async () => {
        await this.fetchCli()
    }

    fetchCli = async () => {
        let a = await currentClient()
        this.setState({ client: a })
    }
    render() {
        return (

            <ImageBackground
                source={require("../../../assets/bgPizza6.jpg")}
                style={{ flex: 1, width: "100%" }}
            >

                <View>
                    <TopMenu title="Home" navigation={this.props.navigation} />
                </View>

                <View style={styles.container}>

                    <View style={{ marginTop: 100 }}>
                        <Text style={styles.greeting}>Bonjour {this.state.client != null && this.state.client["Nom"]}</Text>
                        <Text style={styles.greeting}>Commencez votre journée par</Text>
                    </View>

                    <Button labelStyle={{ color: "#000" }} style={{ backgroundColor: "white", margin: 10 }} mode="contained" onPress={() => this.props.navigation.navigate("Prestataire")}>
                        Trouver un prestataire
                </Button>

                    <Button labelStyle={{ color: "#000" }} style={{ backgroundColor: "white" }} mode="contained" onPress={() => this.props.navigation.navigate("Commande")}>
                        Voir mes commandes
                    </Button>
                </View>

            </ImageBackground>


        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: "center",
        alignItems: "center"
    },
    greeting: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18
    }
})

export default memo(Dashboard)
