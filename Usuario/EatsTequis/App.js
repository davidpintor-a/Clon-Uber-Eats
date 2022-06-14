import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList,SafeAreaView } from 'react-native';
import { SafeAreaProvider} from "react-native-safe-area-context";
import RootNavigator from './src/navigation';
import { NavigationContainer, NavigationContext } from '@react-navigation/native';
import {Amplify} from 'aws-amplify';
import config from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
import AuthContextProvider from './src/contexts/AuthContext';
import OrdenContextProvider from './src/contexts/OrdenContext';
import PedidoContextProvider from './src/contexts/PedidoContext';

Amplify.configure({
  ...config,
  Analytics:{
    disabled: true
  }
});



function App() {
  return (
  <NavigationContainer>
    <AuthContextProvider>
      <OrdenContextProvider>
        <PedidoContextProvider>
          <RootNavigator />
        </PedidoContextProvider>
      </OrdenContextProvider>
    </AuthContextProvider>
  </NavigationContainer>
      
  );
}
export default withAuthenticator(App);