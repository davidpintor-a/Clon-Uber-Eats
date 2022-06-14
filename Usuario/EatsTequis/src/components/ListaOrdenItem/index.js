import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usePedidoContext } from '../../contexts/PedidoContext';


const ListaOrdenItem = ({pedido}) => {
  const navigation=useNavigation();
  return (
    <Pressable onPress={()=> navigation.navigate("Pedido", {id: pedido.id})}  style={{flexDirection: "row", margin: 10, alignItems: "center"}}>
      <Image 
      source={{uri: pedido.Restaurant.image}}
      style={{width:75, height: 75, marginRight: 5}}
      />
      <View>
          <Text style={{fontWeight: "600", fontSize: 16}}>{pedido.Restaurant.name}</Text>
          <Text style={{marginVertical: 5}}>4 articulos $38.45</Text>
          <Text>Hace 2 días &#8226; {pedido.status}</Text>
      </View>
    </Pressable>
  );
}

export default ListaOrdenItem;