import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import ShipsInfo from "./ShipInfo";
import { APIURL } from "./Constant";

export function SignUpView({ navigation }) {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')

    function send() {

        if(username.length < 1 || password != passwordRepeat)
            return;
            

        fetch(APIURL + '/boards', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                shipsInfo: ShipsInfo()
            })
        }).then(
            r => {
                if (r.status == 200) return r.text()

                return Promise.reject("Username already exists")
            }
        ).then(
            token => {
                SecureStore.setItemAsync("token", token)
                navigation.navigate('Board')
            },
            e => setUsuario(e)
        );
    }

    return (
        <View style={{ padding: 30 }}>
            <TextInput placeholder='Username' value={username} onChangeText={setUsername} />
            <TextInput placeholder='Password' value={password} onChangeText={setPassword} />
            <TextInput placeholder='Repeat Password' value={passwordRepeat} onChangeText={setPasswordRepeat} />
            <Button title='Sign Up' onPress={send} />
        </View>
    );
}