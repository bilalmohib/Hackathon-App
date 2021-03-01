import React, { Component } from 'react';
import { View, StyleSheet, BackHandler, ToastAndroid, Image, FlatList } from 'react-native';


import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';

// The external libraries are imported here
import { TouchableOpacity } from 'react-native-gesture-handler';

import database from '@react-native-firebase/database';



import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SliderBox } from "react-native-image-slider-box";
import { Col, Row, Grid } from "react-native-easy-grid";


// The external libraries are imported here



function StudentDetailsPage({ route, navigation }) {

    const { studentName, intro, school, college, university, matricMarks, fscMarks, universityMarks, dateGraduated, contactNo, officeAddress, subject, photoUrl, timeSubmitted, email } = route.params;

    return (

        <Container >
            <Content>
                <Card style={{ flex: 0 }}>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{ uri: `${photoUrl}` }} />
                            <Body>

                                <Text>{studentName}</Text>
                                <Text note>{timeSubmitted}</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text style={styles.email}><MIcon name="email" size={30} color="#d9534f" /> {email}</Text>
                            <Text style={styles.heading}>Introduction: </Text>
                            <Text style={styles.email}><MIcon name="black-mesa" size={30} color="#5bc0de" /> {intro}</Text>
                            <Text style={styles.heading}>Education: </Text>
                            <Text style={styles.email}><MIcon name="chair-school" size={30} color="#292b2c" /> {school}</Text>
                            <Text style={styles.email}><MIcon name="school" size={30} color="#292b2c" /> {college}</Text>
                            <Text style={styles.email}><MIcon name="school-outline" size={30} color="#292b2c" /> {university}</Text>

                            <Text style={styles.heading}>Academic Info: </Text>

                            <Text style={styles.email}><MIcon name="text-subject" size={30} color="#5cb85c" /> {subject}</Text>
                            <Text style={styles.email}><MIcon name="table" size={30} color="#0275d8" />Graduated On: {dateGraduated} </Text>
                            <Text style={styles.email}><MIcon name="home-circle" size={30} color="#5cb85c" /> {officeAddress} </Text>
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
    },
    email: {
        fontSize: 20,
        color: "#292b2c"
    },
    heading: {
        fontSize: 30,
        color: "#292b2c"
    }
});

export default StudentDetailsPage;