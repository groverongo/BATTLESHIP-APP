import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BoardView } from "./Board";
import { SignUpView } from "./SignUp";
import { LogInView } from "./LogIn";

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LogIn' component={LogInView}/>
        <Stack.Screen name='SignUp' component={SignUpView}/>
        <Stack.Screen name='Board' component={BoardView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}