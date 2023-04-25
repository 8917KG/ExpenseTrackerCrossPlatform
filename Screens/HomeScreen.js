import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, FlatList } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useState, useEffect } from "react"

export function HomeScreen(props) {

  const navigation = useNavigation()

  const [showModal, setShowModal] = useState(false)
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [itemType, setItemType] = useState("")
  const [amount, setAmount] = useState("")

  const saveExpense = () => {
    setShowModal(false)
    const itemObj = {
      date: date,
      location: location,
      itemType: itemType,
      amount: amount
    }
    props.add(itemObj)
  }

  useEffect(() => {
    if (!props.authStatus) {
      navigation.navigate("Sign In")
      navigation.reset({ index: 0, routes: [{ name: "Sign In" }] })
    }
  }, [props.authStatus])



  const ListItem = (props) => {
    return (
      <View
        style={styles.listItem}
      >
        <TouchableOpacity onPress=
          {
            () => ListClickHandler({ date: props.date, location: props.location, itemType: props.itemType, amount: props.amount })
          }>
          <Text style={styles.listItemText}>
            Expense Date: {props.date}
            {'\n'}Location: {props.location}
            {'\n'}Expense For: {props.itemType}
            {'\n'}Amount: {props.amount}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  const ListClickHandler = (data) => {
    navigation.navigate("Expense Detail", data)
  }

  return (
    <View style={styles.screen}>
      <Text>Welcome To Expense Tracker</Text>

      <Modal
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modal}>
          <Text>Date:</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="dd/mm/yyyy"
            value={date}
            onChangeText={(val) => setDate(val)}
          />
          <Text>Location:</Text>
          <TextInput
            style={styles.modalInput}
            value={location}
            onChangeText={(val) => setLocation(val)}
          />
          <Text>Item:</Text>
          <TextInput
            style={styles.modalInput}
            value={itemType}
            onChangeText={(val) => setItemType(val)}
          />
          <Text>Amount:</Text>
          <TextInput
            style={styles.modalInput}
            value={amount}
            onChangeText={(val) => setAmount(val)}
          />
          <View style={styles.buttonStyle}>
            <TouchableOpacity
              onPress={() => saveExpense()}
              style={styles.addButton}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TouchableOpacity
        style={styles.addExpenseButton}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText}>Add Expenses</Text>
      </TouchableOpacity>

      <FlatList
        data={props.data}
        renderItem={
          ({ item }) =>
          (<ListItem
            date={item.date}
            location={item.location}
            itemType={item.itemType}
            amount={item.amount}
          />)
        }
        keyExtractor={item => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
    padding: 10,
    marginVertical: 10,
    flex: 1
  },
  addExpenseButton: {
    backgroundColor: "black",
    padding: 10,
    marginVertical: 10,
    // flex: 1
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  screen: {
    justifyContent: "center",
  },
  modal: {
    padding: 10,
    flex: 1,
    justifyContent: "start",
    margin: 10,
    backgroundColor: "lightgreen",
  },
  modalInput: {
    backgroundColor: "white",
    color: "black",
    padding: 10,
  },
  buttonStyle: {
    flexDirection: "row",
  },
  addButton: {
    padding: 10,
    backgroundColor: "green",
    flex: 1,
    marginVertical: 10,
  },
  listItem: {
    padding: 2,
  },
  listItemText: {
    backgroundColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 5,

  }
})