import React, { Component } from 'react';
import { View, StyleSheet, BackHandler, ToastAndroid, Image, FlatList } from 'react-native';


import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

// The external libraries are imported here
import { TouchableOpacity } from 'react-native-gesture-handler';

import database from '@react-native-firebase/database';



import FIcon from 'react-native-vector-icons/FontAwesome';
import { SliderBox } from "react-native-image-slider-box";
import { Col, Row, Grid } from "react-native-easy-grid";


// The external libraries are imported here



class CompanyDetailList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            user_data: [],
            query: "",
            searchString: '',
        }
    }



    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // this.setState({
        //   user_data: this.props.USER_AUTH_DATA
        // })

    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    handleBackButton() {
        ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
        return true;
    }

    showTheAppData = () => {
        console.log("The Data in redux is: ", this.state.user_data);
    }

    render() {

        return (

            < Container >
                <Content>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>
                            <Thumbnail source={{ uri: `${this.props.photoUrl}` }} />
                                <Body>
  {/* registrarName: this.props.USER_AUTH_DATA.name,
                  companyName:this.state.companyName,
                  ceoName:this.state.ceo,
                  dateFounded:this.state.formattedDate,
                  email: this.props.USER_AUTH_DATA.email,
                  contactNo:this.state.phone,
                  experience:this.state.experience,
                  officeAddress:this.state.postalAddress,
                  field:this.state.workType,
                  photoUrl: this.props.USER_AUTH_DATA.photo,
                  timeSubmitted: dateTime, */}
                                    <Text>Registrar Name: {this.props.registrarName}</Text>
                                    <Text note>Time Submitted: {this.props.timeSubmitted}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Company EMAIL: {this.props.email}</Text>
                                <Text>Company Contact : {this.props.contactNo}</Text>
                                <Text>CEO Name : {this.props.ceoName} </Text>
                                <Text>Office Address: {this.props.officeAddress} </Text>
                            </Body>
                        </CardItem>

                    </Card>
                </Content>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 25, color: "white",
        width: "100%"
    },
    headerText: {
        fontSize: 25,
        color: "black",
        fontStyle: "italic"
    }
});

export default CompanyDetailList;