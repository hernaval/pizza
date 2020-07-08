import React, { Component, memo } from 'react'
import { Text, View, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import { allCommande } from "../../API/prestataire/list";
import { currentPrestataire } from '../../core/session'
import { DataTable, Avatar } from 'react-native-paper';
import { PRESTA_URI } from '../../core/config'
import TopMenuP from "../../components/TopMenuP"
class Historiques extends Component {

    constructor() {
        super()
        this.state = {
            facture: [],
            prestataire: "",
            isLoading: false,
            somme : 0
        }
    }

    componentDidMount = async () => {
        this.setState({isLoading : true})
        await this.fetchConnectedPresta()
        await this.fetchAllPrestataireCmd()
        await this.calculTotal()
        this.setState({isLoading : false})
        console.log(this.state.facture)
    }

    fetchConnectedPresta = async () => {
        let presta = await currentPrestataire()
        this.setState({
            prestataire: presta
        })

    }

    fetchAllPrestataireCmd = async () => {
        let Num_prestataire = this.state.prestataire["Num_prestataire"]
        let response = await allCommande(Num_prestataire)

        console.log(response)
        response === "vide" ? this.setState({facture : undefined}) : this.setState({facture : response})
        
    }

    renderHistorique = (id,menu, client, revenu) => (
        <DataTable.Row key={id}>
            <DataTable.Cell>{menu}</DataTable.Cell>
            <DataTable.Cell numeric>{client}</DataTable.Cell>
            <DataTable.Cell numeric>{revenu} Euro</DataTable.Cell>
        </DataTable.Row>
    )

    calculTotal = async () => {
        let s = 0
        this.state.facture.map(fact => s += this.calculDipr(fact["Prix_du_commande"]) )

        this.setState({somme : s})
    }

    calculDipr = val =>{
        return val - (val * 0.1)
    }
    render() {

        return (
            <ImageBackground source={require("../../../assets/home.jpg")}
                style={{ flex: 1, width: "100%" }}>
                {this.state.isLoading && <View style={styles.loading_container}>
                    <ActivityIndicator size="large" />
                </View>}
                <View>
                    <TopMenuP title="Historiques" navigation={this.props.navigation} />
                </View>
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                    <Avatar.Image size={150} source={{ uri: `${PRESTA_URI}/${this.state.prestataire["nom_file"]}` }} />
                    <Text style={{ color: "yellow" }}>{this.state.prestataire["Nom_etablissement"]}</Text>
                </View>
                <View style={styles.container}>
                    <DataTable style={{backgroundColor : "white"}}>
                        <DataTable.Header>
                            <DataTable.Title>Menu</DataTable.Title>
                            <DataTable.Title numeric>Client</DataTable.Title>
                            <DataTable.Title numeric>Revenu </DataTable.Title>
                        </DataTable.Header>
                        {this.state.facture !== undefined && this.state.facture.map((fact,i)=>{
                            const dipr = this.calculDipr(fact.Prix_du_commande)
                            return this.renderHistorique(i,fact.Nom_menu_commnder,fact.Nom_client,dipr)
                        })} 
                    </DataTable>

                    <View style={{backgroundColor : "red", padding : 20}}>
                        {this.state.somme != 0 &&  <Text style={{textAlign : "right" ,fontWeight : "bold", fontSize : 20}}>{this.state.somme} Euro</Text>}
                        
                    </View>
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

export default memo(Historiques)
{/* <View>
                {this.state.facture.length !== 0 && this.state.facture.map((fact,i)=>{
                    return <Text key={i}>{fact.ref_commande}</Text>
                })}
            </View> */}