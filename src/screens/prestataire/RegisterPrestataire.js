import React, { memo, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'
import TextInput from "../../components/TextInput"
import SignButton from "../../components/SignButton"
import Background from "../../components/Background"
import { theme } from "../../core/theme"
import { emailValidator, passwordValidator, userExist, nameValidator } from "../../core/utils";
import ViewPager from '@react-native-community/viewpager';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from 'react-native-gesture-handler'
import { signUpClient } from '../../API/client/authClient'
import { signUpPrestataire } from '../../API/prestataire/authPrestataire'
import { Button } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const RegisterScreen = ({ navigation }) => {
  const [nom, setNom] = useState({ value: "", error: "" });
  const [prenom, setPrenom] = useState({ value: "", error: "" })
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({value : "", error :""})
  const [loading, setLoading] = useState(false);
  const [pseudo, setPseudo] = useState({ value: "", error: "" })
  const [phone, setPhone] = useState({ value: "", error: "" })
  const [etab, setEtab] = useState({ value: "", error: "" })
  const [ouverture, setOuverture] = useState({ value: "", error: "" })
  const [fermeture, setFermeture] = useState({ value: "", error: " " })
  const [houverture, setHOuverture] = useState({ value: "", error: "" })
  const [hfermeture, setHFermeture] = useState({ value: "", error: "" })
  const [numRue, setNumRue] = useState({ valuel: "", error: "" })
  const [rue, setRue] = useState({ value: "", error: "" })
  const [ville, setVille] = useState({ value: "", error: "" })
  const [codePostal, setCodePostale] = useState({ value: "", error: "" })

  const [error, setError] = useState("")
  const [image, setImage] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [openDate, setOpenDate] =useState(false)
  const [closeDate, setCloseDate] = useState(false)
  const [time, setTime] = useState(new Date())
  const _handleSignUp = async () => {

    if (loading) return;

    /* const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    } */

    setLoading(true);

    const response = await signUpClient({
      nom: nom.value,
      phone: phone.value,
      pseudo: pseudo.value,
      email: email.value,
      password: password.value
    })



    if (response == "emailuser") {
      const emailError = userExist(email.value);

      setEmail({ ...email, error: emailError })
    } else {
      navigation.navigate("LoginScreen")
    }

    setLoading(false);

  }

  upload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({

      base64: true
    });

    if (!result.cancelled) {

      setImage(result.base64)
    }
  }

  inscription = async () => {
    console.log("entrai de")
    let data = {
      nom: nom.value,
      prenom: prenom.value,
      email: email.value,
      telephone: phone.value,
      pseudo: pseudo.value,
      password: password.value,
      nom_etablissement: etab.value,
      ouverture: ouverture.value,
      fermeture: fermeture.value,
      postale: codePostal.value,
      ville_prestataire: ville.value,
      heure_overture: houverture.value,
      heure_fermeture: hfermeture.value,
      Numero_du_rue: numRue.value,
      Rue: rue.value,
      image: image,
      nom_image: Math.random()
    }



    let response = await signUpPrestataire(data)
    console.log(response)

    if(response === "emailused"){
       
        setEmail({...email, error : "Adresse email utilisé"})
        this.viewPager.setPage(0)
    }
   
    response ==="ok" && navigation.navigate("RegisterDone")
  }

  renderInformation = () => (
    <View style={styles.page}>
      <ScrollView>
        <TextInput
          label="Nom"
          returnKeyType="next"
          autoCapitalize="none"
          value={nom.value}
          onChangeText={text => setNom({ value: text, error: "" })}
          error={!!nom.error}
          errorText={nom.error}
        />
        <TextInput
          label="Prénom"
          returnKeyType="next"
          autoCapitalize="none"
          value={prenom.value}
          onChangeText={text => setPrenom({ value: text, error: "" })}
          error={!!prenom.error}
          errorText={prenom.error}
        />


        <TextInput
          label="Téléphone"
          returnKeyType="next"
          autoCapitalize="none"
          value={phone.value}
          onChangeText={text => setPhone({ value: text, error: "" })}
          error={!!phone.error}
          errorText={phone.error}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          autoCapitalize ="none"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}

        />

      </ScrollView>

      <Button mode="contained" onPress={() => this.viewPager.setPage(1)}>
        Etape suivante
  </Button>
    </View>
  )
  renderCompte = () => (
    <View style={styles.page}>
      <ScrollView>
        <TextInput
          label="Pseudo"
          returnKeyType="next"
          autoCapitalize="none"
          value={pseudo.value}
          onChangeText={text => setPseudo({ value: text, error: "" })}
          error={!!pseudo.error}
          errorText={pseudo.error}
        />
        <TextInput
          label="Mot de passe"
          returnKeyType="next"
          autoCapitalize="none"
          value={password.value}
          onChangeText={text => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry

        />
        <TextInput
          label="Confirmation mot de passe"
          returnKeyType="done"
          autoCapitalize="none"
          value={confirmPassword.value}
          onChangeText={text => setConfirmPassword({ value: text, error: "" })}
          error={!!confirmPassword.error}
          errorText={confirmPassword.error}
          secureTextEntry

        />
      </ScrollView>


      <Button style={{ backgroundColor: "red", marginBottom: 5 }} icon="camera" mode="contained" onPress={() => this.upload()}>
        Ajouter une photo
  </Button>

      <Button style={{ marginBottom: 5 }} uppercase={false} mode="contained" onPress={() => this.viewPager.setPage(0)}>
        Etape précédente
  </Button>
      <Button style={{ marginBottom: 5 }} uppercase={false} mode="contained" onPress={() => {
       /*  if(confirmPassword !== password){
          setConfirmPassword({...password,error : "Mot de passe non identique"})
        }else{
          this.viewPager.setPage(2)
        } */
        this.viewPager.setPage(2)
      }}>
        Etape suivante
  </Button>

    </View>
  )
  renderBoutique = () => (
    <View style={styles.page}>
      <ScrollView>
        <TextInput
          label="Nom etablissement"
          returnKeyType="next"
          value={etab.value}
          onChangeText={text => setEtab({ value: text, error: "" })}


        />
        <TextInput
          label="Ouverture"
          returnKeyType="next"
          value={ouverture.value}
          onChangeText={text => setOuverture({ value: text, error: "" })}

        />
        <TextInput
          label="Fermeture"
          returnKeyType="next"
          value={fermeture.value}
          onChangeText={text => setFermeture({ value: text, error: "" })}

        />
        <TouchableOpacity onPress={()=> setOpenDate(true)}>
          <Text style={{textAlign : "center",textDecorationLine :"underline",color : "#fff"}}>Heure d'ouverture</Text>
        </TouchableOpacity>
        {openDate ===true &&
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
           
            setOpenDate(false)
            setHOuverture({value : selectedDate, error :""})
          }}
        /> }
        <TouchableOpacity onPress={()=> setCloseDate(true)}>
          <Text style={{textAlign : "center",textDecorationLine :"underline",color : "#fff"}}>Heure de fermeture</Text>
        </TouchableOpacity>
        {closeDate === true && 
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={time}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={(event, selectedDate) => {
            
            setCloseDate(false)
            setHFermeture({value : selectedDate,error : ""})
          }}
        />}
       
        <TextInput
          label="Ville"
          returnKeyType="next"
          autoCapitalize="none"
          value={ville.value}
          onChangeText={text => setVille({ value: text, error: "" })}

        />
        <TextInput
          label="code postale"
          returnKeyType="next"
          autoCapitalize="none"
          value={codePostal.value}
          onChangeText={text => setCodePostale({ value: text, error: "" })}

        />
        <TextInput
          label="Rue"
          returnKeyType="next"
          autoCapitalize="none"
          value={rue.value}
          onChangeText={text => setRue({ value: text, error: "" })}

        />
        <TextInput
          label="Numero de rue"
          returnKeyType="next"
          autoCapitalize="none"
          value={numRue.value}
          onChangeText={text => setNumRue({ value: text, error: "" })}

        />
      </ScrollView>

      <Button style={{ marginTop: 3 }} uppercase={false} mode="contained" onPress={() => this.viewPager.setPage(1)}>
        Etape précédente
  </Button>
      <View>
        <SignButton
          mode="contained"
          loading={loading}
          style={styles.button}
          onPress={() => this.inscription()}>
          M'inscrire
            </SignButton>

      </View>
    </View>

  )
  return (

    <ImageBackground
      source={require("../../../assets/bgPizza7.jpg")}
      style={{ flex: 1, width: "100%" }}>


      <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>

        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image
            style={{ maxWidth: 200, maxHeight: 200 }}
            source={require("../../../assets/logo.png")}
            resizeMode="contain"
          />
          <Text style={{ color: "yellow" }}>Devenez notre partenaire</Text>
        </View>


        <ViewPager
          initialPage={0}
          style={{ flexGrow: 1 }}
          ref={viewPager => {
            this.viewPager = viewPager
          }}

        >
          {this.renderInformation()}
          {this.renderCompte()}
          {this.renderBoutique()}
        </ViewPager>

        <View style={styles.row}>
          <Text style={{ color: "white" }}>Déjà notre prestataire ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginPrestataire")}>
            <Text style={styles.link}>Se connecter</Text>
          </TouchableOpacity>
        </View>
      </View>



    </ImageBackground>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  label: {
    color: theme.colors.secondary
  },
  button: {
    marginTop: 24
  },
  row: {
    flexDirection: "row",
    marginTop: 4
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary
  },
  page: {
    flex: 1,

  },
});

export default memo(RegisterScreen)

