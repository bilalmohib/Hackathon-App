import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, BackHandler, ToastAndroid, Image } from 'react-native';

// The external libraries are imported here
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import { SliderBox } from "react-native-image-slider-box";
import { Col, Row, Grid } from "react-native-easy-grid";

import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Item
} from 'native-base';
// The external libraries are imported here

import notifee from '@notifee/react-native';
import { AndroidColor } from '@notifee/react-native';

import { connect } from "react-redux"



function AndroidPage() {
    async function onDisplayNotification() {
        // Create a channel
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId,
                smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
            },
        });
    }
    return (
        <Container>

            <Button title="Display Notification" onPress={() => onDisplayNotification()} />

        </Container>
    );
}


const styles = StyleSheet.create({
    buttonText: {
        fontSize: 25, color: "white",
        width: "100%"
    },
    headerText: {
        fontSize: 20,
        color: "orange",
        fontStyle: "italic"
    },
    messageText: {
        fontSize: 20
    }
});

const mapStateToProps = (state) => ({
    USER_AUTH_DATA: state.auth.USER,
})

//updating the data of the state
// const mapDispatchToProp = (dispatch) => ({
//   get_seller_all_data: () => dispatch(get_seller_all_data())
// })
//updating the data of the state
export default connect(mapStateToProps, null)(AndroidPage);