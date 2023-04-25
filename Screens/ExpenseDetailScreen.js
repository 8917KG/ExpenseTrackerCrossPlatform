import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useRoute } from "@react-navigation/native"

export function ExpenseDetailScreen(props) {

 const route = useRoute()
 const { date, location, itemType, amount } = route.params

 return (
  <View>
   <Text>
    Expense Date: {date}
    {'\n'}Location: {location}
    {'\n'}Expense For: {itemType}
    {'\n'}Amount: {amount}
   </Text>
  </View>
 )
}