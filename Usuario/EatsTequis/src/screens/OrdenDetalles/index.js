import { View, Text, Image, FlatList,ActivityIndicator } from 'react-native';
import orders from "../../../assets/data/orders.json";
import OrdenMenuItem from '../../components/OrdenMenuItem';
import { usePedidoContext, } from '../../contexts/PedidoContext';
import { useEffect, useState } from 'react';
import styles from './styles';
import { useRoute } from '@react-navigation/native';

const order = orders[0];


const OrdenDetallesEncabezado = ({pedido}) => {
  return (
    <View>
        <View style={styles.page}>
            <Image source={{uri: pedido.Restaurant.image}} style={styles.image}/>       
            <View style={styles.container}>
                <Text style={styles.title}>{pedido.Restaurant.name}</Text>
                <Text style={styles.subtitle}>{pedido.estado} &#8226;  Hace 2 días</Text>
            <Text style={styles.menuTitle}>Tus pedidos</Text>
            </View>
        </View>
    </View>
  )
}
const OrdenDetalles = () => {
    
    const [pedido, setPedidos] = useState();
    const {getPedido} = usePedidoContext();
    const route = useRoute();
    const id = route.params?.id;

    useEffect(()=>{
        getPedido(id).then(setPedidos);

    }, [])

    if(!pedido){
        return <ActivityIndicator size={"large"} color="gray"/>
    }
    return(
        <FlatList
        ListHeaderComponent={()=> <OrdenDetallesEncabezado pedido={pedido}/>} 
        data={pedido.dishes} 
        renderItem={({item}) => <OrdenMenuItem ordenMenu={item}/>}
        />
    )
}


export default OrdenDetalles;