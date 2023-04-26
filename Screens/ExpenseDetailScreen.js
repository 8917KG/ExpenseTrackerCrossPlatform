import { View, Text, TouchableOpacity, StyleSheet, TextInput,Pressable } from "react-native"
import { useNavigation, useRoute } from "@react-navigation/native"
import { useContext, useState } from "react"
import { AuthContext } from "../contexts/AuthContext"
import { doc, deleteDoc, updateDoc } from "firebase/firestore"
import { DBContext } from "../contexts/DBContext"

export function ExpenseDetailScreen(props) {

 const navigation = useNavigation()
 const route = useRoute()
 const authStatus = useRoute(AuthContext)
 const DB = useContext(DBContext)
 const { date, location, itemType, amount, id } = route.params

 const [expenseDate, setExpenseDate] = useState(date)
 const [expenseLocation, setExpenseLocation] = useState(location)
 const [expenseItemType, setExpenseItemType] = useState(itemType)
 const [expenseAmount, setExpenseAmount] = useState(amount)

 const deleteExpense = async () => {
  const path = `userExpenses/${authStatus.uid}/expenses`
  await deleteDoc(doc(DB, path, id))
  navigation.goBack()
 }

 const updateExpense = async () => {
  const path = `userExpenses/${authStatus.uid}/expenses`
  await updateDoc(doc(DB, path, id), { date: expenseDate, location: expenseLocation, itemType: expenseItemType, amount: expenseAmount })
  navigation.goBack()
 }

 return (
  <View style={styles.viewStyle}>
   <Text style={styles.labelText}>ID:</Text>
   <TextInput
    style={styles.textInput}
    value={id}
    onChangeText={(val) => setExpenseDate(val)} />

   <Text style={styles.labelText}>Expense Date:</Text>
   <TextInput
    style={styles.textInput}
    value={expenseDate}
    onChangeText={(val) => setExpenseDate(val)} />

   <Text style={styles.labelText}>Expense Location:</Text>
   <TextInput
    value={expenseLocation}
    onChangeText={(val) => setExpenseLocation(val)}
    style={styles.textInput}
   />

   <Text style={styles.labelText}>Expense Item Type:</Text>
   <TextInput
    value={expenseItemType}
    style={styles.textInput}
    onChangeText={(val) => setExpenseItemType(val)} />

   <Text style={styles.labelText}>Expense Amount:</Text>
   <TextInput
    style={styles.textInput}
    value={expenseAmount}
    onChangeText={(val) => setExpenseAmount(val)} />

   <View style={styles.buttonStyleDetail}>
    
    <TouchableOpacity style={styles.buttonUpdate} onPress={()=> updateExpense()}>
     <Text style={styles.buttonText}>Update</Text>
    </TouchableOpacity >

    <TouchableOpacity style={styles.buttonDelete} onPress={() => deleteExpense()}>
     <Text style={styles.buttonText}>Delete</Text>
    </TouchableOpacity>
   </View>
  </View>
 )
}

const styles = StyleSheet.create({
 labelText: {
  fontSize: 13,
  fontWeight: "bold",
  marginBottom: 5,
 },
 textInput: {
  borderWidth: 0.5,
  padding: 3,
  marginTop: 5,
 },
 viewStyle: {
  //backgroundColor: "#CCCCCC",
  marginTop: 10,
  marginHorizontal: 10,
 },
 buttonText: {
  color: "black",
  textAlign: "center",
 },
 buttonStyleDetail: {
  flexDirection: "row",
 },
 buttonUpdate: {
  backgroundColor: "yellow",
  padding: 10,
  marginVertical: 10,
  flex: 1

 },
 buttonDelete: {
  backgroundColor: "red",
  padding: 10,
  marginVertical: 10,
  flex: 1
 },

})