import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, ActivityIndicator, Image, ToastAndroid, StyleSheet } from 'react-native'
import { pizzaByPrestataire } from '../../API/client/list'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { addToPanier } from '../../API/client/commande'
import { List, Avatar, Button } from 'react-native-paper';
import Background from '../../components/Background'
import { MENU_URI } from '../../core/config'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faCartPlus } from '@fortawesome/free-solid-svg-icons';

import { currentClient } from "../../core/session";
import TopMenu from "../../components/TopMenu"
import { noterPrestataire } from '../../API/client/authClient'
import { Rating, AirbnbRating } from 'react-native-ratings';
class Pizza extends Component {
    constructor() {
        super()
        this.state = {
            pizzas: [],
            client: "",
            isLoading: false,
            note: 1,
        }
    }
    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.fetchCli()
        await this.fetchPizzaOwn()
        this.setState({ isLoading: false })
    }

    fetchCli = async () => {
        let a = await currentClient()
        this.setState({ client: a })
    }


    fetchPizzaOwn = async () => {
        let piz = await pizzaByPrestataire(this.props.navigation.state.params.Num_prestataire)

        this.setState({ pizzas: piz })
    }

    addPanier = async (Code_produit) => {
        this.setState({ isLoading: true })
        let id_client = this.state.client["id_client"]
        let Num_prestataire = this.props.navigation.state.params.Num_prestataire

        let res = await addToPanier({ Code_produit, id_client, Num_prestataire })

        console.log(res)

        res === "yet" ?
            ToastAndroid.show("Ajouté au panier", ToastAndroid.SHORT)
            : ToastAndroid.show("Déjà dans le panier", ToastAndroid.SHORT)
        this.setState({ isLoading: false })
    }

    renderPizza = (id, nom_menu, description, image, prix) => (

        <List.Item
            key={id}
            style={{ backgroundColor: "#d3d3d3", margin: 10 }}
            title={nom_menu}
            description={description}
            titleStyle={{ fontWeight: "bold" }}
            //  descriptionStyle={}
            left={props => <Avatar.Image source={{ uri: `${MENU_URI}/${image}` }} size={70} />}
            right={props => <TouchableOpacity style={{ ...props }, { alignItems: "center" }} onPress={() => this.addPanier(id)}>
                <Text style={{ fontWeight: "bold" }}>{prix} Euro</Text>
                <FontAwesomeIcon size={20} icon={faCartPlus} />
            </TouchableOpacity>}
        />
    )

    evaluate = async () => {
        let idCli = this.state.client["id_client"]
        let num_prestataire = this.props.navigation.state.params.Num_prestataire
        let note = this.state.note
        let response = await noterPrestataire(idCli, num_prestataire, note)


    }


    render() {
        return (

            /*  {this.state.pizzas.map((pizza,i)=>{
                 return <TouchableOpacity key={i} onPress={()=> this.addPanier(pizza.Code_produit)}>
                     <Text>
                         {pizza.Nom_menu}
                     </Text>
                 </TouchableOpacity>
             })} */

            <ImageBackground
                source={require("../../../assets/bgPizza5.jpg")}
                style={{ flex: 1, width: "100%" }}
            >
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}
                <View>
                    <TopMenu title="Nos Pizzas" navigation={this.props.navigation} />
                </View>
                <View style={{ margin: 10 }}>
                    <View style={{ maxHeight: hp("45%") }}>
                        <ScrollView>
                            {this.state.pizzas.length > 0 && this.state.pizzas.map((pizza, i) => {
                                return this.renderPizza(pizza.Code_produit, pizza.Nom_menu, pizza.Description, pizza.file, pizza.Prix)
                            })}
                        </ScrollView>
                    </View>

                    {this.state.isLoading === false && <View>

                        <Button loading={this.state.isLoading} labelStyle={{ color: "#000" }} style={{ backgroundColor: "white", marginTop: 10 }} mode="contained" onPress={() => this.props.navigation.navigate("Panier", { Num_prestataire2: this.props.navigation.state.params.Num_prestataire })}>
                            Voir votre panier
                         </Button>

                        <View>


                            <View style={{ backgroundColor: "white" }}>
                                <AirbnbRating
                                    count={5}
                                    showRating={true}
                                    reviews={["Terrible", "Mauvais", "Bien", "Très bien", "Excellent",]}
                                    defaultRating={3}
                                    size={30}
                                    fraction={1}
                                    ratingBackgroundColor='white'
                                    onFinishRating={(value) => {
                                        this.setState({ note: value })
                                    }}
                                />
                            </View>



                            <Button loading={this.state.isLoading} labelStyle={{ color: "#000" }} style={{ backgroundColor: "white", marginTop: 10 }} mode="contained" onPress={() => this.evaluate()}>
                                NOter
                         </Button>
                        </View>

                    </View>}



                </View>


            </ImageBackground>


        )
    }
}

const styles = StyleSheet.create({
    container: {

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

export default memo(Pizza)

