
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';


const OrdenMenuItem =({ordenMenu})=>{
    return(
    <View style={styles.row}>
        <View style={styles.cantidadContainer}>
            <Text>{ordenMenu.cantidad}</Text>
        </View>
        <Text style={{fontWeight: 'bold'}}>{ordenMenu.Dish.name}</Text>
        <Text style={{marginLeft: "auto"}}>${ordenMenu.Dish.price}</Text>
    </View>
    );
};


const styles= StyleSheet.create({
    row:{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 15,
    },
    cantidadContainer:{
        backgroundColor: "lightgray",
        paddingHorizontal: 5,
        paddingVertical: 2,
        marginRight: 10,
        borderRadius: 3,
    },
});
export default OrdenMenuItem;
