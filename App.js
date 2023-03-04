import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BoardView } from "./intents/Board";
import { SignUpView } from "./intents/SignUp";
import { LogInView } from "./intents/LogIn";
import { AccessMenuView } from "./intents/AccessMenu";

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='AccessMenu' component={AccessMenuView}/>
        <Stack.Screen name='LogIn' component={LogInView}/>
        <Stack.Screen name='SignUp' component={SignUpView}/>
        <Stack.Screen name='Board' component={BoardView}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}