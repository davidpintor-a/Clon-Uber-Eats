import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ActivityIndicator } from 'react-native';

import {AntDesign} from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import {Dish} from '../../models';
import { useOrdenContext } from '../../contexts/OrdenContext';



const DetallesMenuPantalla=()=>{
    const [dish, setDish] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    const navigation = useNavigation();
    const route = useRoute();
    const id = route.params?.id;

    const {agregarMenuAOrden} = useOrdenContext();

    useEffect(()=>{
        if (id){
            DataStore.query(Dish, id).then(setDish);
        }
    },[id])

    const onAgregarAOrden = async () =>{
        await agregarMenuAOrden(dish, cantidad);
        navigation.goBack();

    }


    const onMinus =()=>{if (cantidad > 1 )
        setCantidad(cantidad -1);   
    }
    const onPlus=()=>{
        setCantidad(cantidad +1);
    }
    const getTotal =()=>{
        //toFixed es para mostrar solo dos decimales
        return (dish.price*cantidad).toFixed(2);
    }

    if(!dish){
        return <ActivityIndicator size="large" color="gray"/>
    }

    return(
        <View style={styles.page}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description}>{dish.description}</Text>
            <View style={styles.separator}></View>
            <View style={styles.row}>
                <AntDesign name='minuscircleo' size={60} color= {"black"} onPress={onMinus}/>
                <Text style={styles.cantidad}>{cantidad}</Text>
                <AntDesign name='pluscircleo' size={60} color= {"black"} onPress={onPlus}/>
            </View>
            <Pressable onPress={onAgregarAOrden} style={styles.button}>
                <Text style={styles.buttonText}>Agregar {cantidad} a tu orden &#8226; ${getTotal()} Mxn</Text>
            </Pressable>
        </View>
    );
};

const styles= StyleSheet.create({
    page:{
        flex:1,
        width: "100%",
        paddingVertical: 40,
        padding: 10,
    },
    name:{
        fontSize:30,
        fontWeight: "600",
        marginVertical:10,
    },
    description:{
        color: "grey",
    },

    separator:{
        height: 1,
        backgroundColor: "lightgrey",
        marginVertical: 10,

    },
    row:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    cantidad:{
        fontSize: 25,
        marginHorizontal: 20,

    },
    button:{
        backgroundColor: "black",
        marginTop: "auto",
        padding: 20,
        alignItems: "center",

    },
    buttonText:{
        color: "white",
        fontWeight: "600",
        fontSize: 18,

    },


});

export default DetallesMenuPantalla;