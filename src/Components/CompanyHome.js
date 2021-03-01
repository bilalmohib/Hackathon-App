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

class CompanyHome extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            user_data: {}
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
            <Container>
                <SliderBox autoplay={true} circleLoop={true} images={images} />



                <Content>


                    <Card>

                        <CardItem>
                            <Text style={styles.topHead}>
                                Hi! Dear {this.props.USER_AUTH_DATA.name} Welcome to the Company Section.You can explore the Students Here.
    </Text>
                        </CardItem>
                        <CardItem>
                            <Left>
                                <Thumbnail source={{ uri: `${this.props.USER_AUTH_DATA.photo}` }} />
                                <Body>
                                    <Text style={styles.subhead}>CEO Name: {this.props.USER_AUTH_DATA.name}</Text>
                                    <Text style={styles.subhead} note>EMAIL: {this.props.USER_AUTH_DATA.email}</Text>
                                </Body>
                            </Left>
                        </CardItem>

                        <CardItem>
                            <Grid>
                                <Row>
                                    <Col>
                                        <CardItem>
                                            <Body>
                                                <Body>
                                                    <Icon.Button
                                                        name="send"
                                                        style={{ width: 150, height: 100 }}
                                                        name="user"
                                                        iconStyle={{ fontSize: 25 }}
                                                        backgroundColor="purple"
                                                        onPress={() =>
                                                            this.props.navigation.navigate('RegisteredStudent')
                                                        }
                                                    >
                                                        <Text style={{ color: "white", fontSize: 20 }}>List Of All registered Students</Text>
                                                    </Icon.Button>

                                                </Body>
                                            </Body>
                                        </CardItem>
                                    </Col>
                                    <Col>
                                        <CardItem>
                                            <Body>
                                                <Body>
                                                    <Icon.Button
                                                        name="list"
                                                        style={{ width: 150, height: 100 }}

                                                        iconStyle={{ fontSize: 25 }}
                                                        backgroundColor="green"
                                                        onPress={() => {
                                                            /* 1. Navigate to the Details route with params */
                                                            this.props.navigation.navigate('PostJob');
                                                        }}
                                                    >
                                                        <Text style={styles.buttonText}>POST JOB</Text>
                                                    </Icon.Button>
                                                </Body>
                                            </Body>
                                        </CardItem>
                                    </Col>
                                </Row>

                            </Grid>
                        </CardItem>
                        <CardItem>
                            {/* <Image
                style={{ width: "100%", height: 300 }}
                source={bloodmap}
              /> */}
                        </CardItem>
                        <CardItem>

                        </CardItem>

                        <Icon.Button
                            name="star"
                            style={{ height: 50, borderRadius: 0, width: "100%", textAlign: "center" }}
                            iconStyle={{ fontSize: 25 }}
                            backgroundColor="#d9534f"
                            onPress={() => {
                                /* 1. Navigate to the Details route with params */
                                navigation.navigate('Feed');
                            }}
                        >
                            <Text style={{ textAlign: "center", fontSize: 30, color: "white", width: "100%" }}>Rate Us</Text>
                        </Icon.Button>
                    </Card>
                </Content>








            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 20, color: "white",
        width: "100%"
    },
    headerText: {
        fontSize: 20,
        color: "blue",
        fontStyle: "italic"
    },
    topHead: {
        fontSize: 27,
        backgroundColor: "#f7f7f7",
        color: "#292b2c",
        borderRadius: 5,
        fontStyle: "italic"
    },
    subhead: {
        fontSize: 20,
        textAlign:'left'
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
export default connect(mapStateToProps, null)(CompanyHome);