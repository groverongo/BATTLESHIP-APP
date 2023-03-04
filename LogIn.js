import { View, TextInput, Button, Text } from "react-native";
import { useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { APIURL } from "./Constant";

export function LogInView({ navigation }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function send() {

        if(username.length < 1)
            return;
            

        fetch(APIURL + '/api/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(
            r => {
                if (r.status == 200) return r.json()

                return Promise.reject("Username already exists")
            }
        ).then(
            jsonToken => {
                SecureStore.setItemAsync("token", jsonToken.token)
                navigation.navigate('Board')
            },
            e => setUsername(e)
        );
    }

    return (
        <View style={{ padding: 30 }}>
            <TextInput placeholder='Username' value={username} onChangeText={setUsername} />
            <TextInput placeholder='Password' value={password} onChangeText={setPassword} />
            <Button title='Log In' onPress={send} />
        </View>
    );
}