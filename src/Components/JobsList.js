import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, BackHandler, ToastAndroid, Image, FlatList } from 'react-native';

// The external libraries are imported here
import { TouchableOpacity } from 'react-native-gesture-handler';

import database from '@react-native-firebase/database';

//import Icon from 'react-native-vector-icons/FontAwesome';
import { SliderBox } from "react-native-image-slider-box";
import { Col, Row, Grid } from "react-native-easy-grid";

import CompanyDetailList from "./CompanyDetailList";

import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Thumbnail,
    Left,
    Body,
    Item,
    Input,
    List,
    Icon

} from 'native-base';
// The external libraries are imported here

import JobDetailList from "../Components/JobDetailList";

import { connect } from "react-redux"

// The images are here
import slider1 from "../UI/slider1.jpg";
import slider2 from "../UI/slider2.jpg";
import slider3 from "../UI/slider3.jpg";
import slider4 from "../UI/slider4.jpg";
// The images are here

let images = [
    slider1,
    slider2,
    slider3,
    slider4, // Network image
]

class JobsList extends React.PureComponent {

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

        let jobData = [];
        //Taking data from job vacancy form
        database().ref(`Jobs/`).on('value', (snapshot) => {
            snapshot.forEach(function (data) {
                jobData.push(data.val())
                console.log(data.val())
            })

            //console.log(jobData);
            this.setState({
                user_data: jobData
            })

        })
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


    //////////////////////// Now This is where I am going for the search and other related features///////////////////////
    renderFooter = () => {
        if (!this.state.loading) return null
        return (
            <View style={{ paddingVertical: 20, borderTopWidth: 1, borderColor: "#CED0CE" }}>
                <ActivityIndicator animating size="large" />
            </View>
        )
    }
    handleSearch(text) {
        this.setState({
            searchString: text
        });



        var search = text.split(' ');
        var found = [];
        this.state.user_data.forEach(i => {
            // Extra step here to count each search query item (after splitting by space)
            var matches = 0;
            search.forEach(s => {
                var props = 0;
                for (var prop in i) {
                    // Check if property value contains search
                    if (i[prop].toString().indexOf(s) > -1) {
                        props++;
                    }
                }
                if (props >= 1) {
                    // Found a matching prop, increase our match count
                    matches++;
                }
            })
            if (matches == search.length) {
                // if all search paramters were found
                found.push(i);
            }
        })
        this.setState({
            user_data: found
        })

    }

    //////////////////////// Now This is where I am going for the search and other related features///////////////////////


    render() {
        console.log("The JOBS ALL data is : ", this.state.user_data);
        return (
            <Container>
                <Header searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search"

                            value={this.state.searchString}
                            autoFocus={true}
                            onChangeText={(text) => this.handleSearch(text)}
                        // onKeyPress={({ nativeEvent }) => {
                        //     if (nativeEvent.key === 'Backspace') {
                        //         this.setState({
                        //             data: this
                        //         })
                        //     }
                        // }} 
                        />
                        {/* <Icon name="ios-people" /> */}
                    </Item>
                </Header>


                <List>
                    <FlatList
                        data={this.state.user_data}

                        keyExtractor={(item, index) => index.toString()}
                        style={{
                            borderColor: "green", borderWidth: 0.3, width: "95%", shadowColor: "#000",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 12,
                            },
                            shadowOpacity: 0.58,
                            shadowRadius: 16.00,
                            elevation: 5,
                            marginLeft: "2%",
                            height: "auto"
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
           
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('JobDetailsPage', {
                                        ceoName: item.ceoName,
                                        dateFounded: item.dateFounded, 
                                        email: item.email,
                                        dateFounded: item.dateFounded,
                                        jobDescription: item.jobDescription,
                                        contactNo: item.contactNo,
                                        experience: item.experience,
                                        officeAddress: item.officeAddress,
                                        field: item.field,
                                        photoUrl: item.photoUrl,
                                        timeSubmitted: item.timeSubmitted,

                                    })}>

                                        <JobDetailList
                                               ceoName = {item.ceoName}
                                               dateFounded = {item.dateFounded}
                                               email = {item.email}
                                               dateFounded = {item.dateFounded}
                                               jobDescription = {item.jobDescription}
                                               contactNo = {item.contactNo}
                                               experience={item.experience}
                                               officeAddress={item.officeAddress} 
                                               field={item.field}
                                               photoUrl={item.photoUrl}
                                               timeSubmitted={item.timeSubmitted}       
                                        />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </List>

            </Container>
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

const mapStateToProps = (state) => ({
    USER_AUTH_DATA: state.auth.USER,
})

//updating the data of the state
// const mapDispatchToProp = (dispatch) => ({
//   get_seller_all_data: () => dispatch(get_seller_all_data())
// })
//updating the data of the state
export default connect(mapStateToProps, null)(JobsList);