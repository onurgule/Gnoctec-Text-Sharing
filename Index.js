import React from 'react';
import { StyleSheet, Text, View, Image, Button, Alert,TouchableOpacity, ImageBackground, StatusBar, Dimensions, Component } from 'react-native';
import { StackNavigator } from 'react-navigation';
export default class Index extends React.Component {
  static navigationOptions = {
    header: null
  }
  YapimAsamasi = () =>
  {
     Alert.alert('Yapım Aşamasında!', "Bir dahaki sürümde kullanılabilecek!" , [{text: 'Tamam'}])
  }

  render() {
    let logo = {
      uri: 'logo.png'
    };
    const navigation = this.props.navigation;
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    function createText() {
      return fetch('https://gnoctec.com/Controllers/createText.php')
        .then((response) => {
          fetch('https://gnoctec.com/Controllers/qrcreator.php')
            .then((norespon) => {
          navigation.navigate("gText", {screen: "Index", gcode: response._bodyInit});
        })
        })
        .catch((error) => {
          console.error(error);
        });
    }
    return (
      <View style={{flex: 1}}>
      <View style={{height:height*.15}}>
          <View style={{height:StatusBar.currentHeight, backgroundColor: 'rgb(76,76,76)'}}/>
          <View style={{height:height*.18-StatusBar.currentHeight, backgroundColor: 'rgb(48,48,48)', flexDirection:'row', flexWrap:'wrap'}}>
            <Image source={require('./img/logo.png')} onPress={() => navigation.navigate("Index", {screen: "Index"})} style={{marginLeft:15, width:width*.13 , height: height*.08, marginTop:6, resizeMode:'stretch' }}/>
            <Text style={{color:'rgb(243,255,45)', textAlign:'center', fontSize:30, marginLeft:height*.1, marginTop:width*.025}}>Gnoctec</Text>
          </View>
        </View>
        <View style={{flex:0.89, backgroundColor:'lightgrey'}}>
            <ImageBackground source={require('./img/backone.jpg')} style={{flex:1, opacity:0.85}}>
            <View>
            <Text style={{fontSize:25, color:'rgb(243,255,45)', fontWeight:'bold', textAlign:'center', margin:30}}>Bir cihazdan diğer cihaza veri aktarımı hiç bu kadar kolay olmamıştı.</Text>
            <Text style={{fontSize:15, color:'rgb(243,255,45)', fontWeight:'bold', textAlign:'center', margin:50}}>{"Hemen bir Gnoc oluştur veya bir Gnoc'a bağlan!"}</Text>
            </View>
            </ImageBackground>

        </View>
        <View style={{flex:0.11, backgroundColor:'rgb(48,48,48)',flexDirection:'row', flexWrap:'wrap'}}>


        <TouchableOpacity style={{flex:0.30}} onPress={() => createText()}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>Oluştur</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:0.40}} onPress={() => navigation.navigate("gConn", {screen: "gConn"})}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>Bağlan</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:0.30}} /*onPress={() => navigation.navigate("myList", {screen: "myList"})}*/ onPress={this.YapimAsamasi}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>Listem</Text>
        </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}
