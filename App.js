import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert,TouchableOpacity, ImageBackground, StatusBar, Dimensions, Component } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Index from './Index.js';
import gText from './gText.js';
import gConn from './gConn.js';
//import myList from './myList.js';

const App = StackNavigator({
    Index: { screen: Index},
    gText: {screen: gText},
    gConn: {screen: gConn},
    //myList: {screen: myList},
})

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
