import React from 'react';
import { StyleSheet,Switch, SceneComponent,AsyncStorage, Text,TextInput, View, Image, Button, Alert,TouchableOpacity, ImageBackground, StatusBar, Dimensions, Component } from 'react-native';
import { StackNavigator } from 'react-navigation';
import TimerMixin from 'react-timer-mixin';
import md5 from "react-native-md5";
export default class Index extends React.Component {
constructor(props) {
      super(props);
      this.state = { gInfoTIcerik: 'Loading...', gcode:null,isNotAdmin:true, gpw:null, otoYenile:true, passDisp:'none',passNotDisp:'flex', editShowPass:false, menu2:'Şifre' };
    }
  static navigationOptions = {
    header: null
  }

  changeTextIn = (value) =>{
    Alert.alert('Fetch', gid , [{text: 'ok'}])
  }
  YapimAsamasi = () =>
  {
     Alert.alert('Yapım Aşamasında!', "Bir dahaki sürümde kullanılabilecek!" , [{text: 'Tamam'}])
  }
   DataYenile = () =>
   {

   }

  componentDidMount() {
    const {state} = this.props.navigation;
    const {goBack} = this.props.navigation;
    var gpw = state.params ? state.params.gpw : "";
    var gcode = state.params ? state.params.gcode : "<undefined>";
    var isNotAdmin = true;
    this.state.gcode = gcode;
    this.state.gpw = gpw;
    if(gpw != null) this.setState({editShowPass:true});
    //Alert.alert((gpw!=null).toString());
    fetch("https://gnoctec.com/Controllers/fetchText.php", {
    method: 'POST',
    headers: new Headers({
               'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
      }),
    body: "tcode="+gcode+"&pw="+gpw//+gpw // <-- Post parameters
    })
    .then((response) => response.json())
    .then(responseText => {
    this.setState({gInfo: responseText});
    this.setState({gInfoTIcerik: responseText.ticerik});
    if(responseText.passon == "0")
    {
      isNotAdmin = false;
      this.setState({isNotAdmin:isNotAdmin});
    }
    else{
      isNotAdmin = (responseText.editpass != null) ? false : true;
      this.setState({isNotAdmin:isNotAdmin});
    }
    })
    .catch((error) => {
      goBack();
    });

    setInterval(() =>

    {
      if(this.state.otoYenile == true){
      fetch("https://gnoctec.com/Controllers/fetchText.php", {
      method: 'POST',
      headers: new Headers({
                 'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: "tcode="+gcode+"&pw="+gpw//+gpw // <-- Post parameters
      })
      .then((response) => response.json())
      .then(responseText => {
      this.setState({gInfo: responseText});
      this.setState({gInfoTIcerik: responseText.ticerik});
      })
      .catch((error) => {
        goBack();
      });
    }
  }
    ,3000);


   }
   _changeVeri = () => {
     fetch("https://gnoctec.com/Controllers/updateText.php", {
     method: 'POST',
     headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
       }),
     body: "tcode="+this.state.gcode+"&pw="+this.state.gpw+"&ticerik="+this.state.gInfoTIcerik//+gpw // <-- Post parameters
     })
     .then((response) => {

     })
     .catch((error) => {
       console.error(error);
     });
      //console.log(this.state.gInfoTIcerik)
    }
   setInputState(event) {
    this.setState({ gInfo: event.target.value });
  }

  render() {

    var opts = {
      input: 'a'
    };
    const {state} = this.props.navigation;
    const {goBack} = this.props.navigation;
    var gcode = state.params ? state.params.gcode : "<undefined>";
    var gpw = state.params ? state.params.gpw : "";
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
    function saveText() {
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
    async function cp(g,pow,np,simdikiSifre){
      await fetch("https://gnoctec.com/Controllers/cp.php", {
      method: 'POST',
      headers: new Headers({
                 'Content-Type': 'application/x-www-form-urlencoded', // <-- Specifying the Content-Type
        }),
      body: "tcode="+g+"&tpass="+simdikiSifre+"&newpass="+np+"&power="+pow//+gpw // <-- Post parameters
      })
      .then((response) => {
      })
      .catch((error) => {
        console.error(error);
      });
    }
    function changePasswords(g,ep,sp,simdikiSifre){
      if(ep != null && ep!="")
      {
        cp(g,'edit',ep,simdikiSifre);
      }
      if(sp != null && sp!="")
      {
        cp(g,'show',sp,simdikiSifre);
      }
      if(ep!=null && ep!=""){
        //değiştiyse
        var hh = md5.hex_md5(ep);
        goBack();
        navigation.navigate("gText", {screen: "Index", gcode: g, gpw: hh });
      }
      else{
        goBack();
        navigation.navigate("gText", {screen: "Index", gcode: g, gpw: simdikiSifre});
      }
    }
    function fetchText() {
    //  return
    }
    async function AddToList(){

      var gnocs = AsyncStorage.getItem('gnocs');
      AsyncStorage.setItem('gnocs', gnocs += "," + gcode);

      //not login: on mobile, if login: on database
    }

    /*<Image source={require('./img/logo.png')} style={{ flex:1, width: null, height: null, resizeMode:'stretch' }}/>*/
    return (

      <View style={{flex: 1}}>


      <View style={{height:height*.15}}>
          <View style={{height:StatusBar.currentHeight, backgroundColor: 'rgb(76,76,76)'}}/>
          <View style={{height:height*.18-StatusBar.currentHeight, backgroundColor: 'rgb(48,48,48)', flexDirection:'column', flexWrap:'wrap'}}>
            <Image source={require('./img/logo.png')} onPress={() => goBack()} style={{marginLeft:15, width:width*.13 , height: height*.08, marginTop:6, resizeMode:'stretch' }}/>
            <Text style={{color:'rgb(243,255,45)', textAlign:'center', fontSize:25, marginLeft:height*.1, marginTop:width*.025}}>{gcode}</Text>
            <View style={{marginLeft:width*.15, marginTop:6}}>
            <Image source={{uri:'https://gnoctec.com/Contents/qr/'+gcode+'.png'}} style={{ width:width*.13 , height: height*.08, resizeMode:'stretch' }}/>
            </View>
          </View>
        </View>
        <View style={{flex:0.89, backgroundColor:'lightgrey',display:this.state.passDisp}}>
          <Text>{"\n\nDeğiştirilebilir şifre yönetici şifresidir, bu şifreyle tüm yetkilere erişip yazıyı değiştirebilirsiniz."}</Text>
          <Text>{"\nGörüntülenebilir şifre sadece yazılanları görebilen kişilere vermek için bir şifredir.\nGörüntülenebilir şifre oluşturmak için Değiştirilebilir şifre oluşturmanız gerekmektedir.\n"}</Text>
          <Text>Değiştirilebilir Şifre:</Text>
          <TextInput style={{}} textAlign={'center'} placeholderTextColor={'grey'} editable={true} maxLength={50} placeholder={"Varsayılan"} secureTextEntry={true} onChangeText={(gCEditPass) => {this.setState({gCEditPass});}} value={this.state.gCEditPass ? this.state.gCEditPass : ""} />
          <Text>Görüntülenebilir Şifre:</Text>
          <TextInput style={{}}  textAlign={'center'} placeholderTextColor={'grey'} editable={this.state.editShowPass} maxLength={50} placeholder={"Varsayılan"} secureTextEntry={true} onChangeText={(gCShowPass) => {this.setState({gCShowPass});}} value={this.state.gCShowPass ? this.state.gCShowPass : ""} />
          <Button onPress={() => changePasswords(gcode,this.state.gCEditPass,this.state.gCShowPass,gpw)} title={"Şifreleri Değiştir"}/>
        </View>
        <View  style={{flex:0.89, backgroundColor:'lightgrey', display:this.state.passNotDisp}}>

        <Text style={{textAlign:'right'}}>Oto-Yenile</Text>
        <Switch
        value={this.state.otoYenile}
        onValueChange={(otoYenile) => {this.setState({otoYenile})}}
        onChange={this._changeSwitch}
        />
        <TextInput
        style={{marginTop:20, textAlignVertical: "top" ,marginBottom:40,marginLeft:10, marginRight:10, borderColor: 'black', borderWidth: 1}}
        onChangeText={(gInfoTIcerik) => {
          this.setState({gInfoTIcerik});
        }
      }
        value={this.state.gInfoTIcerik ? this.state.gInfoTIcerik : ""}
        onChange={this._changeVeri}
        multiline={true}
        numberOfLines={50}
        editable = {true}
        maxLength = {400}
        placeholder={"Gnoctec.com adresine gidip yukarıdaki kod ile başka cihazlar ile veri aktarımı gerçekleştirebilirsin. \n\nHadi durma bir şeyler yaz! \n\nYazarken veri kaybı oluşmaması için sağ üstten otomatik yenileme özelliğinin kapatılmasını öneriyoruz."}
          />

        </View>
        <View style={{flex:0.11, backgroundColor:'rgb(48,48,48)',flexDirection:'row', flexWrap:'wrap'}}>
        <TouchableOpacity style={{flex:0.30}} onPress={() => goBack()}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>Geri</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity disabled={this.state.isNotAdmin} style={{flex:0.30}} onPress={() => {if(this.state.passDisp == 'none'){this.setState({ passDisp: 'flex', passNotDisp:'none', menu2:'Yazı' })} else{this.setState({ passDisp: 'none', passNotDisp:'flex', menu2:'Şifre' })}}}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>{this.state.menu2}</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:0.40}} /*onPress={()=>AddToList()}*/ onPress={this.YapimAsamasi}>
        <View style={{ borderRadius: 0, borderWidth: 2, borderColor: 'rgb(243,255,45)', flex:1, alignItems:'center', justifyContent: 'center' }}>
        <Text style={{textAlign:'center', fontSize:20, color:'rgb(243,255,45)'}}>Listeme Ekle</Text>
        </View>
        </TouchableOpacity>
        </View>
      </View>
    );
  }


}
