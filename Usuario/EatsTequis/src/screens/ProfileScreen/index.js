import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Auth,DataStore } from "aws-amplify";
import { User } from "../../models";
import { useAuthContext, AuthContextProvider } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";



const Perfil = () => {
  const {dbUser} = useAuthContext();

  const [nombre, setNombre] = useState(dbUser?.nombre || "");
  const [direccion, setDireccion] = useState(dbUser?.direccion || "");
  const [lat, setLat] = useState((dbUser?.lat + "") || "0");
  const [lng, setLng] = useState((dbUser?.lng + "") || "0");
  const navigation = useNavigation();

  const {sub,setDbUser} = useAuthContext();


  const onSave = async () => {  
    if(dbUser){
      await updateUser();
    }else{
      await createUser();
    }
    navigation.goBack();
  };

  const updateUser = async () => {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated)=> {
        updated.nombre=nombre;
        updated.direccion=direccion;
        updated.lat = parseFloat(lat);
        updated.lng = parseFloat(lng);
      })
    )
    setDbUser(user);
  }

  const createUser = async () =>{
    try{
      const user = await DataStore.save(
        new User({
          nombre, 
          direccion, 
          lat: parseFloat(lat), 
          lng: parseFloat(lng),
          sub, 
          })
        );
        console.log(user);
        setDbUser(user);
    }catch (e){
      Alert.alert("Error", e.message)
    }
  }

  return (
    <SafeAreaView>
      <Text style={styles.title}>Perfil</Text>
      <TextInput
        value={nombre}
        onChangeText={setNombre}
        placeholder="Nombre"
        style={styles.input}
      />
      <TextInput
        value={direccion}
        onChangeText={setDireccion}
        placeholder="Dirección"
        style={styles.input}
      />
      <TextInput
        value={lat}
        onChangeText={setLat}
        placeholder="Latitud"
        style={styles.input}
        keyboardType="numeric"
      />
      <TextInput
        value={lng}
        onChangeText={setLng}
        placeholder="Longitud"
        style={styles.input}
        keyboardType="numeric"
      />
      <Button onPress={onSave} title="Guardar" />
      <Text onPress={()=> Auth.signOut()}  style={{textAlign: "center", color: "red", margin: 10}}>
        Cerrar Sesión
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 5,
  },
});

export default Perfil;
