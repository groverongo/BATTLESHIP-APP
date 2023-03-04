import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { BoardView } from './Board';
import { SignUp, SignUpView } from './SignUp';

export default function App() {
  return (
    <View style={styles.container}>
      <SignUpView/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
