import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';

//contexts
import { AuthContext } from './contexts/AuthContext'


//Screens 
import { HomeScreen } from './Screens/HomeScreen';
import { SignUpScreen } from './Screens/SignUpScreen';
import { SignInScreen } from './Screens/SignInScreen';
import { ExpenseDetailScreen } from './Screens/ExpenseDetailScreen';

//firebase 
import { firebaseConfig } from './config/config';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'

const Stack = createNativeStackNavigator();
const FBApp = initializeApp(firebaseConfig)
const FBAuth = getAuth(FBAuth)
const FBdb = getFirestore(FBApp)


export default function App() {

  const [auth, setAuth] = useState()
  const [errorMsg, setErrorMsg] = useState()
  const [expenseData, setExpenseData] = useState([])

  onAuthStateChanged(FBAuth, (user) => {
    if (user) {
      setAuth(user)
      //console.log(user.uid)
    } else {
      setAuth(null)
    }
  })

  useEffect(() => {
    if (expenseData.length === 0 && auth) {
      GetData()
    }
  })

  const SignUp = (email, password) => {
    createUserWithEmailAndPassword(FBAuth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error))
  }

  const SignIn = (email, password) => {
    signInWithEmailAndPassword(FBAuth, email, password)
      .then((userCredential) => console.log(userCredential))
      .catch((error) => console.log(error))
  }

  const SignOut = () => {
    signOut(FBAuth)
      .then(() => {

      }).catch((error) => console.log(error))
  }

  const AddData = async (item) => {
    const userId = auth.uid
    const path = `userExpenses/${userId}/expenses`
    //const data = {id: new Date().getTime(), description: "sample expense"}
    const ref = await addDoc(collection(FBdb, path), item)
  }

  const GetData = () => {
    const userId = auth.uid
    const path = `userExpenses/${userId}/expenses`
    const dataQuery = query(collection(FBdb, path))
    const unsubscribe = onSnapshot(dataQuery, (responseData) => {
      let expenses = []
      responseData.forEach((expense) => {
        let item = expense.data()
        item.id = expense.id
        expenses.push(item)
      })
      // console.log(expenses)
      setExpenseData(expenses)
    })

  }
  
  const SignOutButton = ( props ) => {
  return (
   <TouchableOpacity onPress= {()=> SignOut()}>
    <Text>Logout</Text>
   </TouchableOpacity>
  )
 }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign Up">
          {(props) => <SignUpScreen {...props} handler={SignUp} authStatus={auth} />}
        </Stack.Screen>
        <Stack.Screen name="Sign In" >
          {(props) => <SignInScreen {...props} handler={SignIn} authStatus={auth} />}
        </Stack.Screen>
        <Stack.Screen name="Expense Tracker" options = {{headerRight: () => <SignOutButton/>}}>
          {(props) => <HomeScreen {...props} authStatus={auth} add={AddData} data = {expenseData}/>}
        </Stack.Screen>
        <Stack.Screen name="Expense Detail">
          {(props) => <ExpenseDetailScreen {...props}/>}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
