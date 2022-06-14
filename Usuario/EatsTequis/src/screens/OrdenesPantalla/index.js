import { View, Text, FlatList } from 'react-native';
import ListaOrdenItem from '../../components/ListaOrdenItem';
import { usePedidoContext } from '../../contexts/PedidoContext';


const OrdenPantalla = () => {
  const {pedidos} = usePedidoContext();


  return (
    <View style={{flex:1, width:"100%"}}>
      <FlatList 
      data={pedidos}
      renderItem={({item})=> <ListaOrdenItem pedido={item}/>}
      
      />
    </View>
  )
}

export default OrdenPantalla;