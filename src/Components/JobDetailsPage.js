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



function JobDetailsPage({ route, navigation }){

            
    const { ceoName,email,dateFounded,jobDescription,contactNo,experience,officeAddress,field,photoUrl,timeSubmitted } = route.params;

        return (

            < Container >
                <Content>
                    <Card style={{ flex: 0 }}>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: `${photoUrl}` }} />
                                <Body>
                                    {/* ceoName = {item.ceoName}
                                               dateFounded = {item.dateFounded}
                                               email = {item.email}
                                               dateFounded = {item.dateFounded}
                                               jobDescription = {item.jobDescription}
                                               contactNo = {item.contactNo}
                                               experience={item.experience}
                                               officeAddress={item.officeAddress} 
                                               field={item.field}
                                               photoUrl={item.photoUrl}
                                               timeSubmitted={item.timeSubmitted}  */}
                                    <Text>CEO Company Name:  {JSON.stringify(ceoName)}</Text>
                                    <Text note>Time Submitted:  {JSON.stringify(timeSubmitted)}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Company EMAIL: {JSON.stringify(email)}</Text>
                                <Text>Company Contact : {JSON.stringify(contactNo)}</Text>
                                <Text>Experience : {JSON.stringify(experience)} </Text>
                                <Text>Office Address: {JSON.stringify(officeAddress)} </Text>
                            </Body>
                        </CardItem>

                    </Card>
                </Content>
            </Container >
        );
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

export default JobDetailsPage;