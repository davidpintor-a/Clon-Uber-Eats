import {useState, useEffect} from 'react';
import {View, FlatList, ActivityIndicator, Pressable, Text} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import MenuListaItem from '../../components/MenuListaItem';
import Encabezado from './Encabezado';
import styles from './styles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import {Restaurant, Dish} from '../../models/';
import { useOrdenContext } from '../../contexts/OrdenContext';



const DetallesRestaurantePage =()=> {
    const [restaurant, setRestaurant] = useState(null);
    const [dishes, setDishes] = useState([]);



    const route = useRoute();
    const navigation = useNavigation();

    const id = route.params?.id;

    const {setRestaurant: setOrdenRestaurant, orden, menuOrdenes } = useOrdenContext();

    useEffect(()=>{
        if(!id){
            return;
        }
        setOrdenRestaurant(null);
        DataStore.query(Restaurant, id).then(setRestaurant);
        DataStore.query(Dish, (dish) => dish.restaurantID('eq', id)).then(setDishes);

    },[id])

    useEffect(() => {
        setOrdenRestaurant(restaurant);
    },[restaurant])

    if (!restaurant){
        return<ActivityIndicator size={"large"} color={"gray"}/>;
    }

    return(
        <View style={styles.page}>
            <FlatList 
                ListHeaderComponent={()=> <Encabezado restaurant={restaurant}/>}            
                data={dishes}
                renderItem={({item})=><MenuListaItem dish={item}/>}
                keyExtractor={(item)=>item.name} 
            />
            <Ionicons 
            onPress={() => navigation.goBack()}
            name="arrow-back-circle" 
            size={45} 
            color="white" 
            style={styles.iconContainer}/>
            {orden &&( 
            <Pressable onPress={() => navigation.navigate("Orden")} style={styles.button}>
                <Text style={styles.buttonText}>
                    Ver Orden ({menuOrdenes.length})
                </Text>
            </Pressable>
            )}

        </View>
    );
};

export default DetallesRestaurantePage;


