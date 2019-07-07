import React, { Component } from 'react'
import { Text } from 'react-native'
import { Button, Card, CardSection, Input, Spinner } from './common'
import firebase from 'firebase';

class SignupForm extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }

    onButtonPress = () => {

        const { email, password } = this.state;

        this.setState({
            error: '',
            loading: true
        });

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFailed.bind(this));
                }
            );  
    }

    onLoginFailed() {
        this.setState({
            error: 'Authentication Failed.',
            loading: false
        })
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            error: '',
            loading: false
        })
    }

    renderButton(){
        if(this.state.loading){
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)} >Log In</Button>
        )
    }

    render() {

        const { errorTextStyle } = styles;

        return (
            <Card>
                <CardSection>
                    <Input 
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.text}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>
                
                <CardSection>
                    <Input 
                        placeholder="password"
                        label="Password"
                        value={this.state.text}
                        onChangeText={password => this.setState({ password })}
                        secure={true}
                    />
                </CardSection>
                <Text style={errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                   {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default SignupForm;
