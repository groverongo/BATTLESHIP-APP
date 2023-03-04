import { View, Button, Text } from "react-native";

export function AccessMenuView({navigation}){

    return (
        <View style={{ padding: 30 }}>
            <Text>BATTLESHIP APP</Text>
            <Button title='Log In' onPress={() => navigation.navigate('LogIn')} />
            <Button title='Sign Up' onPress={() => navigation.navigate('SignUp')} />
        </View>
    );
}