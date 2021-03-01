import React, { Component } from 'react';
import { View, Button, Text } from 'react-native';

// All the components imoprt is here
import Login from "../Components/Login";
import MainScreen from "../Components/MainScreen";
import Registration from "../Components/Registration";
import CompanyRegistration from "../Components/CompanyRegistration";
import StudentRegistration from "../Components/StudentRegistration";
import RegisteredCompany from "../Components/RegisteredCompany";
import RegisteredStudent from "../Components/RegisteredStudent";

import StudentDetailList from "../Components/StudentDetailList";

import JobDetailsPage from "../Components/JobDetailsPage";
import CompanyDetailsPage from "../Components/CompanyDetailsPage";
import StudentDetailsPage from "../Components/StudentDetailsPage";

import StudentHome from "../Components/StudentHome";
import CompanyHome from "../Components/CompanyHome";
import PostJob from "../Components/PostJob";
import JobsList from "../Components/JobsList";

// All the components imoprt is here

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function Navigate() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={MainScreen} /> 
        <Stack.Screen name="registration" component={Registration} />
        <Stack.Screen name="companyRegistration" component={CompanyRegistration} />
        <Stack.Screen name="studentRegistration" component={StudentRegistration} />
        <Stack.Screen name="RegisteredCompany" component={RegisteredCompany} />
        <Stack.Screen name="RegisteredStudent" component={RegisteredStudent} />
        <Stack.Screen name="StudentDetailList" component={StudentDetailList} />

        <Stack.Screen name="StudentHome" component={StudentHome} />
        <Stack.Screen name="CompanyHome" component={CompanyHome} />
        <Stack.Screen name="PostJob" component={PostJob} />
        <Stack.Screen name="JobsList" component={JobsList} />

        <Stack.Screen name="CompanyDetailsPage" component={CompanyDetailsPage} />

        <Stack.Screen name="StudentDetailsPage" component={StudentDetailsPage} />

        <Stack.Screen name="JobDetailsPage" component={JobDetailsPage} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigate;
