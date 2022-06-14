import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import OrdenMenuItem from '../../components/OrdenMenuItem';
import {useOrdenContext} from '../../contexts/OrdenContext';
import { usePedidoContext } from '../../contexts/PedidoContext';
import { useNavigation } from '@react-navigation/native';


const Orden=()=>{
    const {restaurant, menuOrdenes, precioTotal} = useOrdenContext();
    const {crearPedido} = usePedidoContext();
    const navigation = useNavigation();
    const onCrearPedido = async () =>{
        await crearPedido();
        navigation.goBack();
    }
    

    return(
        <View style={styles.page}>
            <Text style={styles.name}>{restaurant?.name}</Text>
            <Text style={{fontWeight: 'bold', marginTop: 20, fontSize: 20}}>Tus articulos</Text>
            <FlatList data={menuOrdenes}
            renderItem={({item}) => <OrdenMenuItem ordenMenu={item} /> }/>
           
            
            <View style={styles.separator}></View>
            
            <Pressable onPress={onCrearPedido} style={styles.button}>
                <Text style={styles.buttonText}>Ordenar &#8226; ${precioTotal.toFixed(0)}</Text>
                
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
        marginVertical: 15,
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
    cantidadContainer:{
        backgroundColor: "lightgray",
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginRight: 10,
        borderRadius: 3,
    },
});

export default Orden;