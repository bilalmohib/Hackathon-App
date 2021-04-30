import React, { useEffect, useState } from 'react';
import {
    View,
    BackHandler,
    ToastAndroid,
    Image,
    StyleSheet,
    TextInput,
    Linking,
    StatusBar,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import { Container, Header, Content, Form, Item, Input, Button, Text } from 'native-base'

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

class AdminLogin extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }


    componentDidMount = () => {

    }

    signInNow = () => {
        auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                console.log('User signed in!');
                alert('User signed in Succcessfully!');
                this.props.navigation.navigate('AdminPage');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                    alert("That email address is invalid!")
                }

                console.error(error);
            });

    }


    render() {


        return (

            <Container>
                <Header />
                <Content>
                    <Form>
                        <Item>
                            <Input value={this.state.email} onChangeText={(e) => this.setState({ email: e })} placeholder="Username" />
                        </Item>
                        <Item last>
                            <Input value={this.state.password} onChangeText={(e) => this.setState({password:e})} placeholder="Password" />
                        </Item>
                        <Item>
                            <Text></Text>
                        </Item>
                        <Item>
                            <Button onPress={this.signInNow}>
                                <Text>Log In </Text>
                            </Button>
                        </Item>
                    </Form>
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
        textAlign: 'center',
        color: "#292b2c"
    }
});


export default AdminLogin;