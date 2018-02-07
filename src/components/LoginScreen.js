import React,{Component} from 'react';
import {Text, ScrollView, TextInput, View, StyleSheet, TouchableOpacity,AsyncStorage,Button} from 'react-native';
import firebase from 'firebase';
import { Card, Spinner ,BackgroundImage ,Logo ,Input } from './common'; 

//import { List, ListItem } from 'react-native-elements';

 



 /**
  * LOGIN
  * --------------
*/
class LoginScreen extends Component{
    static navigationOptions = {
        title: 'Login',
        navigatationBarHidden:true
    };
    state = { loggedin :false,loginPage:true,pageText:'Login',userData:null, email: 'sonydaman@gmail.com', password: 'sony7000', err: '', loading: false};
    componentWillMount(){
        if (!firebase.apps.length) 
            firebase.initializeApp({
                apiKey: "AIzaSyCCH3Bvo83MjSOXwtVhTzJqT6Z_50146jc",
                authDomain: "api-project-842404858396.firebaseapp.com",
                databaseURL: "https://api-project-842404858396.firebaseio.com",
                projectId: "api-project-842404858396",
                storageBucket: "api-project-842404858396.appspot.com",
                messagingSenderId: "842404858396"
            });
        
        // Sign in using a popup.
        //firebase.app();
            firebase.auth().onAuthStateChanged((user)=>{
                if(user){
                   this.setState({loggedin :true,userData:user.providerData[0]}); 
                   this.goToHomePage();
                }
                else{
                    this.setState({loggedin :false});
                    console.log("FALSE")
                    //this.props.navigation.navigate("Login");
                }
            });
    }
    goToHomePage(){        
                    try {
                        AsyncStorage.setItem('userData', JSON.stringify(this.state.userData));
                        this.props.navigation.navigate("ProfileScreen");
                        } 
                    catch (error) {
                        console.log('Some Error',error);
                        }
    }
    onButtonPress = () => {
        console.log("Click");
        const { email, password } = this.state;
        this.setState({ 'err': '', loading: true });
        if(this.state.loginPage)
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                this.onLoginFail.bind(this);
            });
        /*else
             firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this))
                    */
    }
    onLoginFail() {
        this.setState({ 'err': 'Authention failed', loading: false, });
    }
    goToRegisterPage(){
        this.props.navigation.navigate("Register");
        return false;
    }
    onLoginSuccess(res) {
        this.setState({
            'err': '',
            loading: false,
            email: '',
            password: '',
            loggedin :true,userData:res.providerData[0]
        });
        this.goToHomePage();
    }
 
    render() {
        //Button Page links ....
        const arrPageBottomLinks = [ 
            {
                name: 'Register'
            }
        ];
        //...
        return (
            <View style={viewStyles.view}>
                <Logo location="top-center" />
                <View style={viewStyles.pagePanel}>  
                    <TouchableOpacity onPress={this.goToRegisterPage.bind(this)}>
                        <Text style={{fontSize:20,marginLeft:120,color:'#fff'}}>Register</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:40,marginLeft:120,color:'#fff'}}>{this.state.pageText}</Text>
                    <View style={viewStyles.frameInputs}>
                        <Input type='email' placeholder='email' borderBottom="true" value={ this.state.email } onChangeText={ email => this.setState({email}) } />
                        <Input type='password' placeholder='password' value={ this.state.passwprd } onChangeText={ passwprd => this.setState({passwprd}) } />
                    </View>

                    {/* Auth Errors */}
                    <Text style={viewStyles.txtError}>{this.state.err} Hi</Text>

                    <View style={viewStyles.frameCta}>
                        <Button disabled={this.state.loading} type="primary" title={this.state.pageText} onPress={this.onButtonPress.bind(this)}></Button>
                    </View> 

                    {/* Spinner */}
                    { this.state.loading && <Spinner />} 
                </View>
 
                
  
                <BackgroundImage /> 
            </View>
        )
    }
}
 

//[Eric Njanga]
/**
 * Stylesheet
 * ----------
*/
const viewStyles = StyleSheet.create({
    view: {  
        flex: 1 
    },  
    pageBottomLinksContainer: {
        position: 'absolute',
        zIndex: 10,
        start: 0,
        end: 0,
        bottom: 0, 
        borderTopWidth: 0,
        borderBottomWidth: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.4)' 
    },
    pageBottomLink: { 
        color: 'white', 
    }, 
    pagePanel: {
        position: 'absolute', 
        top: 200,
        start: 60,
        end: 60,
        flex: 1, 
        zIndex: 10
    },
    frameInputs: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)', 
        borderRadius:5
    },
    txtError: {
        fontSize: 14, 
        color: 'red', 
        padding: 5
    },
    frameCta: {
        marginTop:30
    }
});


export default LoginScreen;
// react-native run-android