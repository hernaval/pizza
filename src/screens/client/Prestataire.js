import React, { Component, memo, useState } from 'react'
import { Text, View, ImageBackground, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { allPrestataire } from '../../API/client/list'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { Avatar, Card, IconButton, Button } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { PRESTA_URI } from '../../core/config';
import TopMenu from "../../components/TopMenu"
class Prestataire extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prestataires: [],
            isLoading : false
        }
    }
    componentDidMount = async () => {
        this.setState({isLoading : true})
        await this.fetchPrestataire()
        this.setState({isLoading : false})
    }
    fetchPrestataire = async () => {
        let prestataires = await allPrestataire()
        this.setState({ prestataires: prestataires })
    }

    renderPrestataire = (id, image, etab) => (
        <TouchableOpacity key={id} onPress={() =>
            this.props.navigation.navigate("Pizza", { Num_prestataire: id })
        } style={styles.cardContainer}>
            <View style={styles.imageContainer}>
                <Avatar.Image size={70} source={{ uri: `${PRESTA_URI}/${image}` }} />
            </View>
            <View>
                <Text style={{ fontWeight: "bold", fontSize: 18 }}>{etab}</Text>
            </View>

        </TouchableOpacity>
    )
    render() {
        return (
            /* <View style={}>
                {  this.state.prestataires.map((p,i) =>{
                    return <TouchableOpacity key={i} onPress={()=> this.props.navigation.navigate("Pizza",{Num_prestataire : p.Num_prestataire})}>
                        <Text>{p.Nom_etablissement}</Text>
                    </TouchableOpacity>
                }) 
            </View> */
            <ImageBackground
                source={require("../../../assets/bgPizza6.jpg")}
                style={{ flex: 1, width: "100%" }}
            >
                 <View>
                    <TopMenu title="Nos Prestataires" navigation={this.props.navigation} />
                </View>
                <View style={styles.container}>
                    {this.state.isLoading && <View style={styles.loading_container}>
                        <ActivityIndicator size="large" />
                    </View>}
                    <View style={styles.prestaContainer}>
                    <Text style={styles.greeting}>Nos prestataires près de chez vous</Text>

                        <ScrollView horizontal={true}>
                            {this.state.prestataires.length > 0 && this.state.prestataires.map((p, i) => {
                                return this.renderPrestataire(p.Num_prestataire, p.nom_file, p.Nom_etablissement)
                            })}


                        </ScrollView>

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
        alignItems: "center"
    },
    prestaContainer: {
        flexDirection: "row",
        margin: 20,
        flexWrap: "wrap"
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
    greeting: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,

    }
})

export default memo(Prestataire)

