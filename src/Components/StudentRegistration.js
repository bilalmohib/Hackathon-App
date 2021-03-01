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

class StudentRegistration extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            user_data: {},
            date: new Date(2001, 1, 4, 11, 30, 20, 20),
            mode: 'date',
            show: false,
            formattedDate: "--/--/--",
            postalAddress: "",
            intro: "",
            school: "",
            college: "",
            university:"",
            phone: "",
            matric:"",
            fsc:"",
            uni:"",
            subject:""
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


    setWorkType = (val) => {
        this.setState({
            subject: val
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

        let email = this.props.USER_AUTH_DATA.email;
        email = email.toString();

        // Here I will be sending the user data to firebase realtime database
        database()
            .ref('/StudentRegistration/')
            .push()
            .set({
                studentName: this.props.USER_AUTH_DATA.name,
                intro: this.state.intro,
                school: this.state.school,
                college:this.state.college,
                university:this.state.university,
                matricMarks:this.state.matric,
                fscMarks:this.state.fsc,
                universityMarks:this.state.uni,
                dateGraduated: this.state.formattedDate,
                email: this.props.USER_AUTH_DATA.email,
                contactNo: this.state.phone,
                officeAddress: this.state.postalAddress,
                subject: this.state.subject,
                photoUrl: this.props.USER_AUTH_DATA.photo,
                timeSubmitted: dateTime,
            })
            .then(() => alert(`Your are registered successfully as a student.`));





        this.props.navigation.navigate('registration');


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
                                    <Input disabled={true} value={this.props.USER_AUTH_DATA.name} placeholder="Student Full Name" style={styles.Input} />
                                </Item>
                            </Col>
                        </Row>

                        <Row>
                            <Text></Text>
                        </Row>

                        <Item style={styles.intro}>
                            <Input placeholder='Enter your brief intro' multiline={true} defaultValue={this.state.intro} onChangeText={(txt) => this.setState({ intro: txt })} />
                            <Icon name='md-location' style={styles.postalIcon} />
                        </Item>


                        <Row>
                            <Text></Text>
                        </Row>

                        <Row>
                            <Col>
                                <Item>
                                    <Input disabled={false} value={this.state.school} placeholder="Your school name" onChangeText={(e) => this.setState({ school: e })} style={styles.Input} />
                                </Item>
                            </Col>
                        </Row>

                        <Text></Text>

                        <Row>
                            <Col>
                                <Item>
                                    <Input disabled={false} value={this.state.college} placeholder="Your College name" onChangeText={(e) => this.setState({ college: e })} style={styles.Input} />
                                </Item>
                            </Col>
                        </Row>

                        <Text></Text>

                        <Row>
                            <Col>
                                <Item>
                                    <Input disabled={false} value={this.state.university} placeholder="Your University Name" onChangeText={(e) => this.setState({ university: e })} style={styles.Input} />
                                </Item>
                            </Col>
                        </Row>

                        <Row>
                            <Text></Text>
                        </Row>


                        <Row>
                            <Col>
                                <Item style={{ display: "flex", flexDirection: 'column' }}>
                                    <Text>Total Marks (Matric)</Text>
                                    <Input disabled={true} value="1100" placeholder="Total Marks" style={styles.Input} />
                                </Item>
                            </Col>
                            <Col>
                                <Item style={{ display: "flex", flexDirection: 'column' }}>
                                    <Text>Obtained Marks</Text>
                                    <Input disabled={false} value={this.state.matric} placeholder="Obtained Marks" style={styles.Input} onChangeText={(e) => this.setState({ matric: e })} />
                                </Item>
                            </Col>
                        </Row>


                        <Text></Text>


                        <Row>
                            <Col>
                                <Item style={{ display: "flex", flexDirection: 'column' }}>
                                    <Text>Total Marks (Fsc)</Text>
                                    <Input disabled={true} value="1100" placeholder="Total Marks" style={styles.Input} />
                                </Item>
                            </Col>
                            <Col>
                                <Item style={{ display: "flex", flexDirection: 'column' }}>
                                    <Text>Obtained Marks</Text>
                                    <Input disabled={false} value={this.state.fsc} placeholder="Obtained Marks" style={styles.Input} onChangeText={(e) => this.setState({ fsc: e })} />
                                </Item>
                            </Col>
                        </Row>

                        <Text></Text>

                        <Row>
                            <Col>
                                <Item style={{ display: "flex", flexDirection: 'column' }}>
                                    <Text>Total gpa(University)</Text>
                                    <Input disabled={true} value="4" placeholder="Total Marks" style={styles.Input} />
                                </Item>
                            </Col>
                            <Col>
                                <Item style={{ display: "flex", flexDirection: 'column' }}>
                                    <Text>Obtained GPA</Text>
                                    <Input disabled={false} value={this.state.uni} placeholder="Obtained Marks" style={styles.Input} onChangeText={(e) => this.setState({ uni: e })} />
                                </Item>
                            </Col>
                        </Row>


                        <Item>

                            <TouchableOpacity onPress={this.showDatepicker}>
                                {(this.state.formattedDate == "--/--/--") ? (
                                    <Text style={styles.datePicker}>Select Date of Graduation: {this.state.formattedDate}</Text>
                                ) : (
                                        <Text style={styles.datePickerSelected}>Selected Date of Graduation is: {this.state.formattedDate}</Text>
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
                            <Text>
                                 Graduation in field :
                            </Text>
                            <Picker
                                mode="dropdown"
                                iosHeader="Please enter your year of experience"
                                iosIcon={<Icon name="arrow-dropdown-circle" style={{ color: "blue", fontSize: 25 }} />}
                                style={styles.pickerStyle}
                                selectedValue={this.state.subject}
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


                        <Item style={styles.PostalAddress}>
                            <Input placeholder='Please Enter Your Office Address' defaultValue={this.state.postalAddress} onChangeText={(txt) => this.setState({ postalAddress: txt })} />
                            <Icon name='md-location' style={styles.postalIcon} />
                        </Item>

                        <Row>
                            <Text></Text>
                        </Row>

                       

                        <Item>
                            <Row>
                                <Col>


                                    {((this.state.formattedDate == "--/--/--" || this.state.postalAddress == "" || this.state.intro == "" || this.state.school == "" || this.state.college == "" || this.state.university == "" || this.state.subject=="" || this.state.phone=="" )) ? (
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
                                                        <Button onPress={this.sendData}>
                                                            <Text>
                                                                Register
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
    intro: {
        marginTop: 10,
        fontWeight: 'normal',
        fontSize: 20,
        borderWidth: 1,
        height: 100,
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
export default connect(mapStateToProps, null)(StudentRegistration);