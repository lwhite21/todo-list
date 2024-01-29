import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import TodoScreen from './src/screen/TodoScreen';

export default function App() {
  return (
    <SafeAreaView>
      <TodoScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
