import React, { Component, memo } from 'react'
import { Text, View, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native'
import { panierClient, simplePanier } from '../../API/client/list'
import { TouchableOpacity, ScrollView, TouchableHighlight } from 'react-native-gesture-handler'
import { TouchableRipple, Avatar, Button, List, Badge } from 'react-native-paper'
import { commander } from '../../API/client/commande'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MENU_URI } from "../../core/config";
import { currentClient } from "../../core/session";
import TopMenu from "../../components/TopMenu"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import DateTimePicker from '@react-native-community/datetimepicker';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'

class Panier extends Component {
    constructor() {
        super()
        this.state = {
            paniers: [],
            panierSimple: [],
            quantite: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            client: "",
            isLoading: false,

            isOpenDate: false,
            isOpenTime: false,

            dateRecep : new Date(),
            heureRecep : new Date(),
            isSurPlace : true
        }
            

    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })
        await this.fetchCli()
        await this.fetchMaPanier()
        await this.fetchPanierSimple()

        this.setState({ isLoading: false })

    }
    fetchCli = async () => {
        let a = await currentClient()
        this.setState({ client: a })
    }

    fetchMaPanier = async () => {
        let id_client = this.state.client["id_client"]
        let Num_prestataire = this.props.navigation.state.params.Num_prestataire2

        let cart = await panierClient(id_client, Num_prestataire)

        cart !== "vide" ? this.setState({ paniers: cart }) : this.setState({ paniers: undefined })

    }

    fetchPanierSimple = async () => {
        let id_client = this.state.client["id_client"]
        let Num_prestataire = this.props.navigation.state.params.Num_prestataire2
        let cart = await simplePanier(id_client, Num_prestataire)
        this.setState({ panierSimple: cart })
    }

    updateQuantite = (i, isMinus) => {
        let initialQt = this.state.quantite
        if (isMinus == false) {
            let newQtAtIndex = ++initialQt[i]

            initialQt.splice(i, 1, newQtAtIndex)
            this.setState({
                quantite: initialQt
            })
        } else {
            let newQtAtIndex = --initialQt[i]
            initialQt.splice(i, 1, newQtAtIndex)
            this.setState({ quantite: initialQt })
        }

    }

    sendCommande = async () => {
        this.setState({ isLoading: true })
        let qt = []
        for (i = 0; i < this.state.paniers.length; i++) {
            qt.push(this.state.quantite[i])
        }
        const now = new Date()
        let ref = Math.round(now.getTime() / 100000)
        let md = this.state.isSurPlace ===true ? "sur place" : "A emporter"
        let response = await commander(
            this.state.panierSimple,
            ref,
           this._fortmatDate(this.state.dateRecep),
           this._formatTime(this.state.heureRecep) ,
           md,
            qt
        )

        this.setState({ isLoading: false })
        this.props.navigation.navigate("Notifications", { ref_commande: ref })

    }

    renderPanier = (index, image, nom_menu, prix) => (
        <List.Item
            key={index}
            style={{ backgroundColor: "#d3d3d3", margin: 10 }}
            title={nom_menu}
            titleStyle={{ fontWeight: "bold" }}
            //  descriptionStyle={}
            left={props => <Avatar.Image source={{ uri: `${MENU_URI}/${image}` }} size={70} />}
            right={props => <View style={{ ...props }, { alignItems: "center" }} >
                <Button onPress={() => this.updateQuantite(index, true)} mode="contained">-</Button>
                <Text >{this.state.quantite[index]}</Text>
                <Button onPress={() => this.updateQuantite(index, false)} mode="contained">+</Button>
            </View>}
        />
    )
    _formatTime(date) {
        hour = date.getHours()
        minutes = date.getMinutes()

        hour = hour < 10 ? "0" + hour : hour
        minutes = minutes < 10 ? "0" + minutes : minutes

        return hour + ":" + minutes
    } 
    
    _fortmatDate(date) {
        year = date.getFullYear();
        month = date.getMonth() + 1;
        dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return year + '-' + month + '-' + dt
    }
    render() {
        return (
            <ImageBackground
                source={require("../../../assets/bgPizza5.jpg")}
                style={{ flex: 1, width: "100%" }}
            >
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}
                <View>
                    <TopMenu title="Mon Panier" navigation={this.props.navigation} />
                </View>
                <View style={{ backgroundColor: "white", margin: 10, maxHeight: hp("60%") }} >

                    <ScrollView>
                        {this.state.paniers !== undefined && this.state.paniers.map((panier, i) => {
                            return this.renderPanier(i, panier.file, panier.Nom_menu, panier.Prix)
                        })}


                    </ScrollView>


                </View>

                <View style={{margin : 10}}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between",marginTop : 12 }}>
                        <TouchableOpacity onPress={()=> this.setState({isOpenDate : true})} style={{ flexDirection: "row",alignItems : "center" }}>
                            <FontAwesomeIcon color="#d3d3d3" size={24} icon={faCalendar} />
                            <Text style={{color : "#d3d3d3"}} >Date de réception</Text>
                        </TouchableOpacity>
                        <Text style={{color : "#d3d3d3"}}>{this._fortmatDate(this.state.dateRecep)}</Text>
                    </View>
                    <View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <TouchableOpacity onPress={()=> this.setState({isOpenTime : true})} style={{ flexDirection: "row",alignItems : "center" }}>
                            <FontAwesomeIcon color="#d3d3d3" size={24} icon={faClock} />
                            <Text style={{color : "#d3d3d3"}} >Heure de réception</Text>
                        </TouchableOpacity>
                        <Text style={{color : "#d3d3d3"}}>{this._formatTime(this.state.heureRecep)}</Text>
                    </View>
                    </View>

                    <View style={{flexDirection : "row",justifyContent : "space-evenly"}}>
                        <TouchableOpacity onPress={()=> this.setState({isSurPlace : true})} style={this.state.isSurPlace === true ? {backgroundColor : "red",padding : 20}  :{backgroundColor : "#d3d3d3",padding : 20}}>
                            <Text >Sur place</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=> this.setState({isSurPlace : false})} style={this.state.isSurPlace === false ? {backgroundColor : "red",padding : 20}  :{backgroundColor : "#d3d3d3",padding : 20}}>
                            <Text>A emporter</Text>
                        </TouchableOpacity>
                    </View>


                    {this.state.isOpenDate === true &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.dateRecep}
                            mode="date"
                           
                            display="default"
                            onChange={(event, selectedDate) => {
                                this.setState({ isOpenDate: false })
                                this.state.dateRecep = selectedDate
                            }}
                        />
                    }

                    {this.state.isOpenTime === true &&
                        <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={this.state.heureRecep}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedDate) => {
                                this.setState({ isOpenTime: false })
                                this.state.heureRecep = selectedDate
                            }}
                        />
                    }

                </View>

                {this.state.paniers === undefined && <Text style={{ color: "white" }}>Votre panier est vide </Text>}
                {this.state.paniers !== undefined &&
                    <Button labelStyle={{ color: "#000" }}
                        style={{
                            backgroundColor: "white",
                            marginTop: 10
                        }} mode="contained"
                        onPress={() => this.sendCommande()}>
                        Passer la commande
                </Button>
                }
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

export default memo(Panier)
