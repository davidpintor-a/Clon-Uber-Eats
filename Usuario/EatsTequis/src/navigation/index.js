import {createNativeStackNavigator}from "@react-navigation/native-stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DetallesRestaurantePage from '../../src/screens/DetalleRestaurantePantalla';
import DetallesMenuPantalla from '../../src/screens/MenuDetallesPantalla';
import Orden from '../../src/screens/Orden';
import OrdenPantalla from '../../src/screens/OrdenesPantalla';
import OrdenDetalles from '../../src/screens/OrdenDetalles';
import PantallaInicio from "../screens/PantallaInicio";
import {Foundation, FontAwesome5, MaterialIcons} from '@expo/vector-icons';
import MenuListaItem from "../components/MenuListaItem";
import ProfileScreen from "../screens/ProfileScreen";
import  {useAuthContext}  from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();


const RootNavigator = () => {
    const {dbUser} = useAuthContext();
    return(
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {dbUser?(
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
            ):(
                <Stack.Screen name="Perfil" component={ProfileScreen} />
            )}
        </Stack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

const HomeTabs =() => {
    return(
        <Tab.Navigator screenOptions={{headerShown: false}} barStyle={{backgroundColor: "white"}} >
            <Tab.Screen name="Inicio" component={HomeStackNavigator} 
            options={{tabBarIcon: ({color}) => <Foundation name="home" size={24} color={color}/>}}/>
            <Tab.Screen name="Ordenes" component={OrdenStackNavigator} 
            options={{tabBarIcon: ({color}) => <MaterialIcons name="list-alt" size={24} color={color}/>}}/>
            <Tab.Screen name="Perfil" component={ProfileScreen} 
            options={{tabBarIcon: ({color}) => <FontAwesome5 name="user-alt" size={24} color={color}/>}}/>
        </Tab.Navigator>
    )
}

const HomeStack = createNativeStackNavigator();


const HomeStackNavigator = () =>{
    return(
        <HomeStack.Navigator>
            <HomeStack.Screen name="Restaurantes" component={PantallaInicio}/>
            <HomeStack.Screen name="Restaurante" component={DetallesRestaurantePage} options={{headerShown: false}}/>
            <HomeStack.Screen name="Menu" component={DetallesMenuPantalla}/>
            <HomeStack.Screen name="Orden" component={Orden}/>
        </HomeStack.Navigator>
    )
}

const OrdenStack = createNativeStackNavigator();


const OrdenStackNavigator = () =>{
    return(
        <OrdenStack.Navigator>
            <OrdenStack.Screen name="Pedidos" component={OrdenPantalla}/>
            <OrdenStack.Screen name="Pedido" component={OrdenDetalles}/>
        </OrdenStack.Navigator>
    )
}


export default RootNavigator;