import React, { useEffect, useState } from 'react';
import {
    View,
    BackHandler,
    ToastAndroid,
    Image,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Linking,
    StatusBar,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
} from 'native-base';

import database from '@react-native-firebase/database';

import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import Logo from "../UI/logo.jpg"

// Importing the action set functions for the setting user data
import { set_data } from "../store/action/index";
// Importing the action set functions for the setting user data

// importing the connect from react redux
import { connect } from 'react-redux';
// importing the connect from react redux

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            // show: false,
            // isSignedIn: false,
            student_data: [],
            company_data: []
        }
    }


    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // this.setState({
        //   user_data: this.props.USER_AUTH_DATA
        // })

        let studentData = [];
        let companyData = [];
        //Taking data from student form
        database().ref(`StudentRegistration/`).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                studentData.push(data.val())
                console.log(data.val())
            })

            //console.log(jobData);
            this.setState({
                student_data: studentData
            })
        })

        //Taking data from student form
        database().ref(`CompanyRegistration/`).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                companyData.push(data.val())
                console.log(data.val())
            })

            //console.log(jobData);
            this.setState({
                company_data: companyData
            })

        })
    }


    async onFacebookButtonPress() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        auth().signInWithCredential(facebookCredential)
            .then((user) => {
                console.log("User ==>", user);
                let today = new Date();
                let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                let dateTime = date + ' ' + time;
                dateTime = dateTime.toString();
                //////////////////////////////

                let userdata = {
                    name: user.user.displayName,
                    email: user.user.email,
                    photo: user.user.photoURL,
                    uid: user.user.uid,
                    LoginTime: dateTime
                }

                console.log("Yahan par -> ", userdata)

                this.setState({
                    user_data: userdata
                })

                this.props.set_data(userdata);

                var sizeOfArray = this.state.company_data.length;

                if (this.state.student_data.length > this.state.company_data.length) {
                    sizeOfArray = this.state.student_data.length;
                }
                else {
                    sizeOfArray = this.state.company_data.length
                }


                for (let i = 0; i < sizeOfArray; i++) {
                    if (this.state.company_data[i].email == user.user.email || this.state.student_data[i].email == user.user.email) {

                        if (this.state.company_data[i].email == user.user.email) {
                            alert("User Already Exists as a company");
                            this.props.navigation.navigate('CompanyHome');
                            break;
                        }
                        else if (this.state.student_data[i].email == user.user.email) {
                            alert("User Already exists as a student");
                            this.props.navigation.navigate('StudentHome');
                            break;
                        }

                    }
                    else {
                        continue;
                    }
                }


                for (let i = 0; i < sizeOfArray; i++) {
                    if (this.state.company_data[i].email != user.user.email && this.state.student_data[i].email != user.user.email) {
                        this.props.navigation.navigate('registration');
                    }
                }


            })
            .catch((err) => {
                console.log("Error==>", err);
            })
    }
    render() {

        console.log("The Student Data==>", this.state.student_data);

        console.log("The Company Data==>", this.state.company_data[0]);


        return (

            <Container>
                <Content>
                    <Card style={{ flex: 1, marginTop: "0%" }}>
                        <CardItem>
                            <Body>
                                <Body>
                                    <Text></Text>
                                    <Text></Text>
                                    <Text></Text>
                                    <Text></Text>
                                    <Image source={require("../UI/logo.jpg")} />
                                </Body>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Body>
                                    <Text style={styles.textHeading}>
                                        Welcome to the System Management App
                                    </Text>
                                </Body>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Body>

                                    <Icon.Button name="facebook" backgroundColor="#3b5998" size={25}
                                        onPress={() => this.onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))}>
                                        <Text style={{ fontFamily: 'Arial', fontSize: 20, color: "white" }}>
                                            Login with Facebook
                                        </Text>
                                    </Icon.Button>
                                    <Text>Note: The Facebook Login is intended for both the students and the companies.The settings is handled at the backend.</Text>
                                    <Text></Text>
                                   
                                    <Icon.Button onPress={styles.admin} name="cog" backgroundColor="#d9534f" size={25}
                                        onPress={() => this.props.navigation.navigate('AdminLogin')}>
                                        <Text style={{ fontFamily: 'Arial', fontSize: 20, color: "white" }}>
                                            Admin Login
                                        </Text>
                                    </Icon.Button>
                                    <Text></Text>
                                    <Text></Text>
                                    <Text></Text>
                                    <Text></Text>
                                </Body>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeading: {
        color: 'black',
        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: 30,
        textAlign: 'center'
    },
    admin: {
        fontSize: 25
    }
});

const mapStateToProps = (state) => ({
    USER: state.app.USER,
    //AUTH:state.auth.user_name
})

//updating the data of the state
const mapDispatchToProp = (dispatch) => ({
    set_data: (data) => dispatch(set_data(data))
})
//updating the data of the state
export default connect(mapStateToProps, mapDispatchToProp)(Login);