import React from 'react';
import { StyleSheet, Text,AsyncStorage, View,LayoutAnimation, Image,Linking, TextInput, Button, Alert,TouchableOpacity, ImageBackground, StatusBar, Dimensions, Component } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TimerMixin from 'react-timer-mixin';
import md5 from "react-native-md5";
import { BarCodeScanner, Permissions } from 'expo';
async function  isPasswordable(gID)  {
  let ogo = 1;
  await fetch("https://gnoctec.com/Controllers/isHavingPass.php", {
  method: 'POST',
  headers: new Headers({
             'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
    }),
  body: "tcode="+gID//+gpw // <-- Post parameters
  })
  .then((response) => response.text())
    .then(function(rra){
      ogo = rra;
    })
  .catch((error) => {

  });
  return ogo;
}
export default class myList extends React.Component {
constructor(props) {
      super(props);
      this.state = { cgID: "", cgPW: "",hasCameraPermission: null,lastScannedGnoc: "",showQR:'none' };
    }
  static navigationOptions = {
    header: null
  }

  changeTextIn = (value) =>{
    Alert.alert('Fetch', gid , [{text: 'ok'}])
  }
  GetHeightFunction = () =>
  {
     Alert.alert('Fetch', gid , [{text: 'ok'}])
  }
   DataYenile = () =>
   {

   }

  componentDidMount() {
    this._requestCameraPermission();
    const {state} = this.props.navigation;
    var toGID = this.state.cgID;
    var toGPW = this.state.cgPW;
    setInterval(() =>{},3000);
    AsyncStorage.getItem("gnocs").then((value) => {
      this.setState({"gnocs": value});
      console.log(value);
  }).done();
   }
   _requestCameraPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({
        hasCameraPermission: status === 'granted',
      });
    };


    _handleBarCodeRead = result => {
      const navigation = this.props.navigation;
      const {state} = this.props.navigation;
      var ttt = this.state.lastScannedGnoc;
      var g = result.data;
        if(g != null && g != "" && g.length == 8){
          this.setState({cgID:result.data});
          isPasswordable(g).then(function(gelen){
            if(gelen=="0"){ // aynı ıdliyi 50 kere açmasın.
              //if(ttt != g || this.state.cgID != g){
              //this.setState({lastScannedGnoc:g});
              navigation.navigate("gText", {screen: "Index", gcode: g});
                //}
              }
          });

        }

    };

   setInputState(event) {
    this.setState({ gInfo: event.target.value });
  }


  render() {

    var opts = {
      input: 'a'
    };
    const {state} = this.props.navigation;
    const {goBack} = this.props.navigation;
    let logo = {
      uri: 'logo.png'
    };
    const navigation = this.props.navigation;
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    var myHeaders = new Headers();
    var myInit = { method: 'POST',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
    function girisYap(g, p){

      if(g != null && g != "" && g.length == 8){
        let hex_md5v = md5.hex_md5(p);
        navigation.navigate("gText", {screen: "Index", gcode: g, gpw: hex_md5v});
      }
      else{
        Alert.alert('HATA', "GnocID veya Şifre hatalı!" , [{text: 'OK'}])
      }
    }
    return (

      <View style={{flex: 1}}>
      <View style={{height:height*.15}}>
          <View style={{height:StatusBar.currentHeight, backgroundColor: 'rgb(76,76,76)'}}/>
          <View style={{height:height*.18-StatusBar.currentHeight, backgroundColor: 'rgb(48,48,48)', flexDirection:'row', flexWrap:'wrap'}}>
            <Image source={require('./img/logo.png')} onPress={() => goBack()} style={{marginLeft:15, width:width*.13 , height: height*.08, marginTop:6, resizeMode:'stretch' }}/>
            <Text style={{color:'rgb(243,255,45)', textAlign:'center', fontSize:30, marginLeft:height*.1, marginTop:width*.025}}>Listem</Text>
          </View>
        </View>
        <View style={{flex:0.89, backgroundColor:'lightgrey'}}>

        </View>
        <View style={{flex:0.11, backgroundColor:'rgb(48,48,48)',flexDirection:'row', flexWrap:'wrap'}}>
        <TouchableOpacity style={{flex:0.25}} onPress={() => goBack()}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>Geri</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:0.50}} onPress={() => navigation.navigate("gList", {screen: "gList"})}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>Listem</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:0.25}} onPress={() => {if(this.state.showQR == 'none'){this.setState({ showQR: 'flex' })} else{this.setState({ showQR: 'none' })}}}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>QR</Text>
        </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }
// QR okunsun, şifre yoksa eğer direk girsin. fetchle onu. Aslında aynı fetchi bu yanlış alerti içn de kullanabiliriz

}
const styles = StyleSheet.create({
  container: {

  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
});
