import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import { useState, useEffect, useContext } from "react"
import { useNavigation } from "@react-navigation/native"
import { AuthContext } from "../contexts/AuthContext"


export function SignUpScreen(props) {

 const [email, setEmail] = useState("")
 const [vaildEmail, setValidEmail] = useState(false)
 const [password, setPassword] = useState("")
 const [validPw, setValidPw] = useState(false)
 const [validForm, setValidForm] = useState(false)

 const navigation = useNavigation()
 const authStatus = useContext(AuthContext)

 useEffect(() => {
  if (email.indexOf('@') > 0) {
   setValidEmail(true)
  } else {
   setValidEmail(false)
  }
 }, [email])

 useEffect(() => {
  if (password.length >= 8) {
   setValidPw(true)
  }
  else {
   setValidPw(false)
  }
 }, [password])

 useEffect(() => {
  if (vaildEmail && validPw) {
   setValidForm(true)
  } else {
   setValidForm(false)
  }
 })

 useEffect(() => {
  if (authStatus) {
   //navigation.navigate("Expense Tracker")
   navigation.reset({ index: 0, routes: [{ name: "Expense Tracker" }] })
  }
 }, [authStatus])



 return (
  <View style={styles.page}>
   <Text style={styles.title}>Sign Up for an Account</Text>
   <View style={styles.inputGroup}>
    <Text>Email Address</Text>
    <TextInput
     style={(vaildEmail) ? styles.validInput : styles.input}
     placeholder="you@domain.com"
     value={email}
     onChangeText={(emailText) => setEmail(emailText)}
    />
   </View>
   <View style={styles.inputGroup}>
    <Text>Password</Text>
    <TextInput
     style={(validPw) ? styles.validInput : styles.input}
     placeholder="minimum 8 characters"
     value={password}
     onChangeText={(pwText) => setPassword(pwText)}
     secureTextEntry={true}
    />
   </View>
   <TouchableOpacity
    style={(validForm) ? styles.button : styles.buttonDisable}
    disabled={(validForm) ? false : true}
    onPress={() => props.handler(email, password)}
   >
    <Text style={styles.buttonText}>Sign Up</Text>
   </TouchableOpacity>
   <TouchableOpacity
    style={styles.signInLink}
    onPress={() => navigation.navigate("Sign In")}
   >
    <Text style={styles.signInLinkText}>Already have an account, Sign In</Text>
   </TouchableOpacity>
  </View>
 )
}

const styles = StyleSheet.create({
 page: {
  marginHorizontal: 50,
 },
 title: {
  fontSize: 20,
  textAlign: "center",
  marginTop: 20,
 },
 input: {
  backgroundColor: "white",
  padding: 10,
  marginVertical: 2,
 },
 validInput: {
  backgroundColor: "white",
  padding: 10,
  marginVertical: 2,
  borderColor: "green",
  borderWidth: 2,
 },
 inputGroup: {
  marginVertical: 10,

 },
 button: {
  backgroundColor: "black",
  padding: 10,
  marginVertical: 5,
 },
 buttonText: {
  color: "white",
  textAlign: "center",
 },
 buttonDisable: {
  backgroundColor: "#666666",
  padding: 10,
  marginVertical: 5,
 },
 signInLink: {
  marginVertical: 4,
 },
 signInLinkText: {
  textAlign: "center",
 }
})