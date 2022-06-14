import { StyleSheet, Text, View, Image, FlatList,SafeAreaView } from 'react-native';
import RestauranteItem from '../../components/RestauranteItem';
import {useState, useEffect} from "react";
import {DataStore} from 'aws-amplify';
import { Restaurant } from '../../models';



export default function PantallaInicio() {

  const [restaurants, setRestaurants]=useState([]);



  useEffect(()=>{
    DataStore.query(Restaurant).then(setRestaurants);

  }, []);


  return ( 
    <View style={styles.page}> 
      <FlatList data={restaurants} renderItem={({item})=>
      <RestauranteItem restaurant={item}/>}showsVerticalScrollIndicator={false} />
    </View>
  


  );
}

const styles = StyleSheet.create({
  page:{

    padding: 10,
  }
});
