import { View, Text, Pressable, StyleSheet } from "react-native";


export function ListItem( props ) {

 const data = {
  date: props.date,
  location: props.location,
  itemType: props.itemType,
  amount: props.amount,
 }

 return (
  <Pressable onPress={ () => props.handler( data )}>
   <View style={styles.listItem}>
    <Text style={styles.listItemText}>
     Expense Date: {props.date}
     {'\n'}Location: {props.location}
     {'\n'}Expense For: {props.itemType}
     {'\n'}Amount: {props.amount}
    </Text>
   </View>
  </Pressable>
 )
}

const styles = StyleSheet.create({
 listItem: {
  padding: 2,
 },
 listItemText: {
  backgroundColor: "#CCCCCC",
  borderWidth: 1,
  borderRadius: 5,

 }
})