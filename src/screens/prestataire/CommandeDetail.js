import React, { Component, memo } from 'react'
import { Text, View, StyleSheet, ImageBackground, ActivityIndicator } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { validerCommande, annulerCommande } from "../../API/prestataire/commande";
import { currentPrestataire } from '../../core/session'
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { CommandeRef } from '../../API/prestataire/list';
import { MENU_URI } from '../../core/config';
import TopMenuP from "../../components/TopMenuP"
class CommandeDetail extends Component {

    constructor() {
        super()
        this.ref_commande = null,
            this.state = {
                prestataire: "",
                commande: "",
                image: "",
                isLoading: false
            }

    }



    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.fetchConnectedPresta()
        this.ref_commande = this.props.navigation.state.params.ref_commande
        await this.fetchCommandeInfo()

        this.setState({ isLoading: false })


    }

    fetchCommandeInfo = async () => {
        let response = await CommandeRef(this.ref_commande)

        this.setState({ commande: response })
        let imageNamePath = this.state.commande["file"].split("/")
        let a = imageNamePath[0] + "/menus/" + imageNamePath[1]
        this.setState({ image: a })
    }
    fetchConnectedPresta = async () => {
        let presta = await currentPrestataire()
        this.setState({
            prestataire: presta
        })

    }


    sendCommande = async () => {
        this.setState({ isLoading: true })
        let ref_commande = this.ref_commande
        let Num_prestataire = this.state.prestataire["Num_prestataire"]
        let response = await validerCommande(ref_commande, Num_prestataire)

        //console.log(response)
        this.setState({ isLoading: false })
        this.props.navigation.navigate("MainPrestataire")
    }



    cancelCommande = async () => {
        this.setState({ isLoading: true })
        let ref_commande = this.ref_commande

        let response = await annulerCommande(ref_commande)
        this.setState({ isLoading: false })
        this.props.navigation.navigate("MainPrestataire")

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
                    <TopMenuP title="Détails" navigation={this.props.navigation} />
                </View>
                <View style={styles.container}>

                    <Card>
                        <Card.Title title={this.state.commande["Nom_client"]} subtitle={this.state.commande["Email_client"]} />
                        <Card.Content>
                            <Title>{this.state.commande["Nom_menu_commnder"]}</Title>
                            <Paragraph>{this.state.commande["Quantiter_menu_commnder"]}</Paragraph>
                            <Paragraph>{this.state.commande["Prix_du_commande"]} euro</Paragraph>
                        </Card.Content>
                        <Card.Cover source={{ uri: "http://devnaynet.com/pizza-reunion/prestataire/pages/forms/" + this.state.image }} />
                        <Card.Actions>
                            <Button style={{ backgroundColor: "red", margin: 2 }} onPress={() => this.cancelCommande()}>Annuler</Button>
                            <Button style={{ backgroundColor: "green", margin: 2 }} onPress={() => this.sendCommande()}>Valier</Button>
                        </Card.Actions>
                    </Card>



                </View>
            </ImageBackground>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
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
export default memo(CommandeDetail)