import firebase from 'firebase';
import React, { Component } from 'react'
import { View } from 'react-native'
import { Header, Button, Spinner, CardSection } from './components/common'
import SignupForm from './components/SignupForm';

export default class App extends Component {

    state = {
        loggedIn: null
    }

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBPbDDEjcDeFlrjI2BiDvIZgJ2RVyCm1Nw',
            authDomain: 'authentication-b6311.firebaseapp.com',
            databaseURL: 'https://authentication-b6311.firebaseio.com',
            projectId: 'authentication-b6311',
            storageBucket: '',
            messagingSenderId: '734819125044',
            appId: '1:734819125044:web:27ff2bb62f016c40'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if(user){
                this.setState({
                    loggedIn: true
                })
            } else {
                this.setState({
                    loggedIn: false
                })
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn){
            case true:
                return (
                    <CardSection>
                    <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
                    </CardSection>
                );
            case false: 
                return <SignupForm />;
            default:
                return <Spinner size="large"/>;
        }
    }

    render() {
        return (
            <View>
                <Header title="Auth"/>
                {this.renderContent()}
            </View>
        )
    }
}


