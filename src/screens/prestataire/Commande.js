import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, ScrollView, StyleSheet,ActivityIndicator } from 'react-native'
import { commandeAvalider } from '../../API/prestataire/list'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { currentPrestataire } from '../../core/session'
import { TouchableRipple, Avatar, Button, List, Badge } from 'react-native-paper'
import { API_URL } from '../../core/config';
import TopMenuP from "../../components/TopMenuP"
class Commande extends Component {

    constructor() {
        super()
        this.state = {
            commandes: [],
            prestataire: "",
            isLoading : false
        }
    }

    componentDidMount = async () => {
        this.setState({isLoading : true})
        await this.fetchConnectedPresta()
        await this.fetchCommande()
        this.setState({isLoading : false})

    }
    fetchConnectedPresta = async () => {
        let presta = await currentPrestataire()
        this.setState({
            prestataire: presta
        })

    }

    fetchCommande = async () => {
        let Num_prestataire = this.state.prestataire["Num_prestataire"]
        let response = await commandeAvalider(Num_prestataire)

        response == "vide" ? this.setState({ commandes: undefined }) : this.setState({ commandes: response })
    }

    goToDetail = ref => {
        this.props.navigation.navigate("CommandeDetail", { ref_commande: ref })
    }

    renderCommandes = async (index, ref, image) => (
        <List.Item
            key={index}
            style={{ backgroundColor: "#d3d3d3", margin: 10 }}
            title={ref}
            titleStyle={{ fontWeight: "bold" }}
            left={props => <Avatar.Image source={{ uri: `${MENU_URI}/${image}` }} size={70} />}

        />
    )


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
                    <TopMenuP title="Commandes" navigation={this.props.navigation} />
                </View>

                <View style={{ backgroundColor: "white", maxHeight: hp("60%") }} >

                    <ScrollView>
                        {this.state.commandes !== undefined && this.state.commandes.map((commande, i) => {

                            return <TouchableOpacity key={i} onPress={() => this.goToDetail(commande["ref"])}>
                                <List.Item
                                  
                                    style={{ backgroundColor: "#d3d3d3", margin: 10 }}
                                    title={commande["Nom_menu_commnder"]}
                                    titleStyle={{ fontWeight: "bold" }}
                                    left={props => <Avatar.Image source={{ uri: `${API_URL}/${commande["nom_file"]}` }} size={70} />}
                                    right={props => <Text style={{fontWeight : "bold"}}>{commande["Prix_du_commande"]} Euro</Text>}
                                />
                            </TouchableOpacity>
                        })}
                    </ScrollView>

                </View>

            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
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

export default memo(Commande)
/* {this.state.commandes !== undefined && this.state.commandes.map((commande, i)=>{
    return <View key={i}>
        <TouchableOpacity onPress={() => this.goToDetail(commande.ref)}>
             <Text>{commande.ref}</Text>
        </TouchableOpacity>
    </View>
})} */