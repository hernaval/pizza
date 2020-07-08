import React, { Component, memo } from 'react'
import { Text, View, ImageBackground } from 'react-native'
import { commandeAPayer, commandeEnAttente, achatReussi } from '../../API/client/list'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import TabBar from "@mindinventory/react-native-tab-bar-interaction";
import { List, Avatar, Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons'

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen'
import { currentClient } from "../../core/session";
import TopMenu from "../../components/TopMenu"
import { repasserCommande } from '../../API/client/commande';
class Commande extends Component {

    constructor() {
        super()
        this.state = {
            apayer: [],
            enAttente: [],
            reussi: [],
            client: "",

            isOpenDate: false,
            isOpenTime: false,

            dateRecep: new Date(),
            heureRecep: new Date(),
            isSurPlace: true,
            paniers: [],
            repassPanier: []
        }

    }

    componentDidMount = async () => {
        await this.fetchCli()
        await this.fetchCommandeAPayer()
        await this.fetchCommandeEnAttente()
        await this.fetchAchatReussi()
        await this.initPanier()

        console.log(this.state.paniers)

    }

    async initPanier() {
        let tempPanier = []
        this.state.reussi.map((p, i) => {
            tempPanier.push(p.Code_facture)
        })
        this.setState({ paniers: tempPanier })
    }
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
    fetchCli = async () => {
        let a = await currentClient()
        this.setState({ client: a })
    }

    fetchCommandeAPayer = async () => {
        let id_client = this.state.client["id_client"]
        let response = await commandeAPayer(id_client)

        response === "vide" ? this.setState({ apayer: undefined }) : this.setState({ apayer: response })

    }

    fetchAchatReussi = async () => {
        let id_client = this.state.client["id_client"]

        let response = await achatReussi(id_client)

        response !== "vide" ? this.setState({ reussi: response }) : this.setState({ reussi: undefined })
    }

    fetchCommandeEnAttente = async () => {
        let id_client = this.state.client["id_client"]
        let response = await commandeEnAttente(id_client)


        response !== "vide" ? this.setState({ enAttente: response }) : this.setState({ enAttente: undefined })

    }



    renderEnAttente = (ref, date) => (
        <List.Item
            style={{ backgroundColor: "#d3d3d3", margin: 10 }}
            title={ref}
            description={date}
            titleStyle={{ fontWeight: "bold" }}
            //  descriptionStyle={}
            left={props => <Avatar.Image size={70} />}

        />


    )

    renderAPayer = (ref, date) => {
        return <List.Item

            style={{ backgroundColor: "#d3d3d3", margin: 10 }}
            title={ref}
            description={date}
            titleStyle={{ fontWeight: "bold" }}
            //  descriptionStyle={}
            left={props => <Avatar.Image size={70} />}

        />
    }

    renderReussi = (codeFacture, menu, prix) => {
        return <List.Item

            style={{ backgroundColor: "#d3d3d3", margin: 10 }}
            title={menu}
            description={prix}
            titleStyle={{ fontWeight: "bold" }}
            //  descriptionStyle={}
            left={props => <Avatar.Image size={70} />}
            right={props => <TouchableOpacity onPress={() => this._toogleRepass(codeFacture)}>
                <Text>choisir</Text>
            </TouchableOpacity>}

        />
    }

    _toogleRepass = codeFacture => {
        let tempPanier = this.state.repassPanier
        if (tempPanier.includes(codeFacture)) {
            const indexOfCodeFactureInsidePaniers = tempPanier.findIndex((e) => e == codeFacture)
            tempPanier.splice(indexOfCodeFactureInsidePaniers, 1)

            this.setState({ repassPanier: tempPanier })
        } else {
            tempPanier.push(codeFacture)
            this.setState({ repassPanier: tempPanier })
        }
    }


    sendCommande = async () => {
        let response = await repasserCommande(
            this.state.repassPanier,
            "151515",
            this._fortmatDate(this.state.dateRecep),
            this._formatTime(this.state.heureRecep),
            this.state.isSurPlace,
            ["1","2"]
        )

        console.log(response)
    }


    render() {
        return (

            <TabBar bgNavBar="white" bgNavBarSelector="white" stroke="skyblue">
                <TabBar.Item

                    icon={require('../../../assets/enAttente.png')}
                    selectedIcon={require('../../../assets/enAttenteActive.png')}
                    title="Tab1"
                    screenBackgroundColor={{ backgroundColor: '#201b1b' }}
                >
                    <View>
                        <View>
                            <TopMenu title="En Attente" navigation={this.props.navigation} />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <View style={{ maxHeight: hp("45%") }}>
                                <ScrollView>
                                    {this.state.enAttente !== undefined && this.state.enAttente.map((commande, i) => {
                                        return <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate("Notifications", { ref_commande: commande.ref_commande })}>
                                            {this.renderAPayer(commande.ref, commande.Date_du_commande)}
                                        </TouchableOpacity>
                                    })}
                                </ScrollView>
                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>Commandes en attente</Text>
                                </View>

                            </View>
                        </View>
                    </View>

                </TabBar.Item>
                <TabBar.Item
                    icon={require('../../../assets/payer.png')}
                    selectedIcon={require('../../../assets/payer.png')}
                    title="Tab2"
                    screenBackgroundColor={{ backgroundColor: '#201b1b' }}
                >
                    <View>
                        <View>
                            <TopMenu title="Achats réussis" navigation={this.props.navigation} />
                        </View>
                        <View style={{ marginTop: 30 }}>


                            <View style={{ maxHeight: hp("45%") }}>

                                <ScrollView>
                                    {this.state.reussi !== undefined && this.state.reussi.map((commande, i) => {

                                        return <View key={i} onPress={() => this.props.navigation.navigate("Notifications", { ref_commande: commande.ref_commande })}>
                                            {this.renderReussi(commande.Code_facture, commande.Nom_menu_commnder, commande.Prix_du_commande)}
                                        </View>
                                    })}
                                </ScrollView>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>Achats réussis</Text>
                                </View>



                            </View>



                            <View style={{ margin: 10 }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
                                    <TouchableOpacity onPress={() => this.setState({ isOpenDate: true })} style={{ flexDirection: "row", alignItems: "center" }}>
                                        <FontAwesomeIcon color="#d3d3d3" size={24} icon={faCalendar} />
                                        <Text style={{ color: "#d3d3d3" }} >Date de réception</Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: "#d3d3d3" }}>{this._fortmatDate(this.state.dateRecep)}</Text>
                                </View>
                                <View>
                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <TouchableOpacity onPress={() => this.setState({ isOpenTime: true })} style={{ flexDirection: "row", alignItems: "center" }}>
                                            <FontAwesomeIcon color="#d3d3d3" size={24} icon={faCalendar} />
                                            <Text style={{ color: "#d3d3d3" }} >Heure de réception</Text>
                                        </TouchableOpacity>
                                        <Text style={{ color: "#d3d3d3" }}>{this._formatTime(this.state.heureRecep)}</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                                    <TouchableOpacity onPress={() => this.setState({ isSurPlace: true })} style={this.state.isSurPlace === true ? { backgroundColor: "red", padding: 20 } : { backgroundColor: "#d3d3d3", padding: 20 }}>
                                        <Text >Sur place</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.setState({ isSurPlace: false })} style={this.state.isSurPlace === false ? { backgroundColor: "red", padding: 20 } : { backgroundColor: "#d3d3d3", padding: 20 }}>
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
                                            this.state.dateRecep = selectedDate
                                            this.setState({ isOpenDate: false })
                                           
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
                                            this.state.heureRecep = selectedDate
                                            this.setState({ isOpenTime: false })
                                            
                                        }}
                                    />
                                }

                            </View>





                        </View>

                        <Button labelStyle={{ color: "#000" }}
                            style={{
                                backgroundColor: "white",
                                marginTop: 10
                            }} mode="contained"
                            onPress={() => this.sendCommande()}>
                            Repasser les commandes
                        </Button>




                    </View>

                </TabBar.Item>
                <TabBar.Item

                    icon={require('../../../assets/aPayer.png')}
                    selectedIcon={require('../../../assets/aPayer.png')}
                    title="Tab3"
                    screenBackgroundColor={{ backgroundColor: '#201b1b' }}
                >
                    <View>
                        <View>
                            <TopMenu title="A payer" navigation={this.props.navigation} />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            {/*Page Content*/}
                            <View style={{ maxHeight: hp("45%") }}>
                                <ScrollView>
                                    {this.state.apayer !== undefined && this.state.apayer.map((commande, i) => {
                                        return <TouchableOpacity key={i} onPress={() => { }}>
                                            {this.renderAPayer(commande.ref_commande, commande.Date_du_commande)}
                                        </TouchableOpacity>
                                    })}
                                </ScrollView>
                                <View style={{ flex: 1, alignItems: "center" }}>
                                    <Text style={{ color: "white", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>Commandes à payer</Text>

                                </View>
                            </View>


                        </View>
                    </View>

                </TabBar.Item>
            </TabBar>

        )
    }
}

export default memo(Commande)
{/* {this.state.apayer !== undefined && this.state.apayer.map((commande ,i) =>{
                  return   <TouchableOpacity key ={i} onPress={()=> this.props.navigation.navigate("Notifications",{ref_commande : commande.ref_commande})}>
                        <Text>{commande.ref_commande}</Text>
                    </TouchableOpacity>
                })} */}