import { StyleSheet, Text, View, AppState } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const Test = () => {
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setappStateVisible] = useState(appState.current)

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange)
        return () =>{
        AppState.removeEventListener("change", _handleAppStateChange)
        }
    }, []) 

    const _handleAppStateChange = (nextAppState) => {
        if(appState.current.match(/inactive|background/)
        && 
        nextAppState === 'active'){
            console.log("App has come to the foreground!")
        }
        appState.current = nextAppState
        setappStateVisible(appState.current)
        
        console.log("AppState : ", appState.current)

        if (appState.current == 'active') {
            alert("Activate")
        }
    }
    
   

   
    
  return (
    <View style={{flex: 1, alignItems:'center',justifyContent:'center'}}>
      <Text>Current state is: {appStateVisible}</Text>
    </View>
  )
}

export default Test

const styles = StyleSheet.create({})