import React, { Component } from 'react';
import { View, StyleSheet, BackHandler, ToastAndroid, Image, Platform } from 'react-native';

// The external libraries are imported here
import { TouchableOpacity } from 'react-native-gesture-handler';

import FIcon from 'react-native-vector-icons/FontAwesome';
import { SliderBox } from "react-native-image-slider-box";
import { Col, Row, Grid } from "react-native-easy-grid";

import { Container, CardItem, Content, Picker, Form, Item, Input, Text, Body, Radio, Icon, Button, Card } from 'native-base';
// The external libraries are imported here

import DateTimePicker from '@react-native-community/datetimepicker';
import database from '@react-native-firebase/database';

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

class PostJob extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            user_data: {},
            date: new Date(2001, 1, 4, 11, 30, 20, 20),
            mode: 'date',
            show: false,
            formattedDate: '--/--/--',
            postalAddress: '',
            phone: "",
            jobTitle: "",
            experience: "",
            jobDescription: ""
        }
    }


    // This is the code for picking date and time from the user
    onDateChange = (event, selectedDate) => {

        if (this.state.date === undefined) {
            // dismissedAction
        }

        const currentDate = selectedDate || this.state.date;



        let month = currentDate.getMonth() + 1; //months from 1-12
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();

        let formattedDates = year + "/" + month + "/" + day;


        this.setState({
            formattedDate: formattedDates,
            date: currentDate,
            show: (Platform.OS === 'ios')
        })

        console.log("The current selected Date is : ", formattedDates);
    };

    showMode = (currentMode) => {

        this.setState({
            show: true,
            mode: currentMode
        })

    };

    showDatepicker = () => {
        this.showMode('mode')
    };

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
        // this.setState({
        //   user_data: this.props.USER_AUTH_DATA
        // })
        let jobData = [];
        //Taking data from job vacancy form
        database().ref(`CompanyRegistration/`).on('value', (snapshot) => {
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

    setYearsOfExperience = (val) => {
        this.setState({
            experience: val
        })
        console.log("Expeirence in years ==>", val);
    }

    setWorkType = (val) => {
        this.setState({
            workType: val
        })
        console.log("Work Type ==>", val);
    }

    setPhoneNumber = (text) => {

        let newText = '';
        let numbers = '0123456789';


        for (var i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
                return;
            }
        }
        this.setState({
            phone: text
        })
    }


    sendData = () => {

        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date + ' ' + time;
        dateTime = dateTime.toString();


        // Here I will be sending the user data to firebase realtime database
        database()
            .ref('/Jobs/')
            .push()
            .set({
                ceoName: this.props.USER_AUTH_DATA.name,
                dateFounded: this.state.formattedDate,
                email: this.props.USER_AUTH_DATA.email,
                jobDescription: this.state.jobDescription,
                contactNo: this.state.phone,
                experience: this.state.experience,
                officeAddress: this.state.postalAddress,
                field: this.state.workType,
                photoUrl: this.props.USER_AUTH_DATA.photo,
                timeSubmitted: dateTime,
            })
            .then(() => alert(`Your JOB is submitted successfully.`));


        this.props.navigation.navigate('CompanyHome');


        // Here I will be sending the user data to firebase realtime database
    }

    render() {
        return (
            <Container>
                <Text style={styles.headerText}>Register the Company</Text>
                <Content>
                    <Form style={styles.formStyling}>

                        <Row>
                            <Col>
                                <Item>
                                    <Input disabled={false} value={this.state.jobTitle} placeholder="Please Enter a Job title" onChangeText={(e) => this.setState({ jobTitle: e })} style={styles.Input} />
                                </Item>
                            </Col>
                        </Row>


                        <Row>
                            <Text></Text>
                        </Row>

                        <Row>
                            <Col>
                                <Item style={styles.PostalAddress}>
                                    <Input placeholder='Please Enter the JOB Description' defaultValue={this.state.jobDescription} onChangeText={(txt) => this.setState({ jobDescription: txt })} />
                                    <Icon name='md-disc' />
                                </Item>
                            </Col>
                        </Row>



                        <Row>
                            <Text></Text>
                        </Row>

                        <Item>

                            <TouchableOpacity onPress={this.showDatepicker}>
                                {(this.state.formattedDate == "--/--/--") ? (
                                    <Text style={styles.datePicker}>Select Date of Ending: {this.state.formattedDate}</Text>
                                ) : (
                                        <Text style={styles.datePickerSelected}>Date of Ending of Job is: {this.state.formattedDate}</Text>
                                    )}

                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={showTimepicker}>
                            <Text style={styles.datePicker}>{JSON.stringify(date)}</Text>
                        </TouchableOpacity> */}

                            {this.state.show && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={this.state.date}
                                    mode={this.state.mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={this.onDateChange}
                                    neutralButtonLabel="clear"
                                />
                            )}

                        </Item>

                        <Row>
                            <Text></Text>
                        </Row>

                        <Item>
                            <Input disabled={true} value={this.props.USER_AUTH_DATA.email} placeholder="Like : bilalmohib7896@gmail.com" style={styles.Input} />
                        </Item>


                        <Row>
                            <Text></Text>
                        </Row>


                        <Row>
                            <Col>
                                <Item>
                                    <Input defaultValue={this.state.phone} placeholder="Please Enter contact No." style={styles.Input} onChangeText={(text) => this.setPhoneNumber(text)} />
                                </Item>
                            </Col>
                        </Row>

                        <Row>
                            <Text></Text>
                        </Row>

                        <Item>
                            <Text>
                                LEVEL :
                            </Text>
                            <Picker
                                mode="dropdown"
                                iosHeader="Please enter your year of experience"
                                iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "blue", fontSize: 25 }} />}
                                style={styles.pickerStyle}
                                selectedValue={this.state.experience}
                                onValueChange={(itemValue, itemIndex) => this.setYearsOfExperience(itemValue)}
                            >
                                <Picker.Item label="JUNIOR" value="JUNIOR" />
                                <Picker.Item label="ASSOCIATE LEVEL" value="ASSOCIATE LEVEL" />
                                <Picker.Item label="SENIOR" value="SENIOR" />
                            </Picker>
                        </Item>

                        <Item style={styles.PostalAddress}>
                            <Input placeholder='Please Enter Your Office Address' defaultValue={this.state.postalAddress} onChangeText={(txt) => this.setState({ postalAddress: txt })} />
                            <Icon name='md-location' style={styles.postalIcon} />
                        </Item>

                        <Row>
                            <Text></Text>
                        </Row>

                        <Item>
                            <Text>
                                Field Of Work :
                            </Text>
                            <Picker
                                mode="dropdown"
                                iosHeader="Please enter your year of experience"
                                iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "blue", fontSize: 25 }} />}
                                style={styles.pickerStyle}
                                selectedValue={this.state.workType}
                                onValueChange={(itemValue, itemIndex) => this.setWorkType(itemValue)}
                            >
                                <Picker.Item label="Mechanical" value="Mechanical" />
                                <Picker.Item label="Electrical" value="Electrical" />
                                <Picker.Item label="Bio Medical" value="Bio Medical" />
                                <Picker.Item label="Pharmaceutical" value="Pharmaceutical" />
                                <Picker.Item label="Metallurgical" value="Metallurgical" />
                                <Picker.Item label="Environmental" value="Environmental" />
                                <Picker.Item label="Computer Science" value="Computer Science" />
                                <Picker.Item label="Software Engineering" value="Software Engineering" />
                                <Picker.Item label="Architectural" value="Architectural" />
                                <Picker.Item label="Civil" value="Civil" />
                            </Picker>
                        </Item>

                        <Item>
                            <Row>
                                <Col>


                                    {((this.state.formattedDate == "--/--/--" || this.state.postalAddress == "" || this.state.phone == "" || this.state.experience == "" || this.state.workType == "")) ? (
                                        <View>
                                            <Text></Text>
                                            <Text style={{ color: "red", textAlign: "center" }}>Please Fill all fields to continue * </Text>
                                            <Text></Text>
                                        </View>
                                    ) : (
                                            <View>
                                                <Text></Text>
                                                <Body>
                                                    <Body>
                                                        <Button style={{backgroundColor:"grey"}} onPress={this.sendData}>
                                                            <Text style={{color:"white"}}>
                                                                Post Job Now
                                                            </Text>
                                                        </Button>
                                                    </Body>
                                                </Body>
                                                <Text></Text>
                                            </View>
                                        )}
                                </Col>
                            </Row>
                        </Item>

                    </Form>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    headerText: {
        textAlign: "center", fontSize: 25, marginTop: 10, marginBottom: 15, fontWeight: "bold", color: "#292b2c", borderBottomColor: "#5bc0de", borderBottomWidth: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 0.3,
        borderRadius: 10
    },
    formStyling: {
        paddingRight: 15,
    },
    Input: {
        color: 'black',
        fontWeight: 'normal',
        fontSize: 18,
        borderWidth: 1,
        height: 44,
        borderColor: "green",
        backgroundColor: "#F0F0F0",
        borderRadius: 3
    },
    PostalAddress: {
        marginTop: 10,
        fontWeight: 'normal',
        fontSize: 20,
        borderWidth: 1,
        height: 80,
        borderColor: "#F0F0F0",
        backgroundColor: "#F0F0F0",
        borderRadius: 3,
        marginBottom: 10,
    },
    pickerStyle: {
        width: undefined, color: "blue",
        fontSize: 20
    },
    datePicker: {
        marginTop: 10,
        fontSize: 17,
        marginBottom: 10
    },
    datePickerSelected: {
        marginTop: 10,
        fontSize: 17,
        marginBottom: 10,
        color: "green"
    },
    postalIcon: {
        color: "green",
        fontSize: 30
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
export default connect(mapStateToProps, null)(PostJob);