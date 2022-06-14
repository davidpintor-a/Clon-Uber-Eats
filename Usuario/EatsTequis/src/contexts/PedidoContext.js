import { createContext, useContext, useState, useEffect } from "react";
import {DataStore} from 'aws-amplify';
import {Pedido, PedidoMenu, Orden} from '../models';
import { useAuthContext } from "./AuthContext";
import { useOrdenContext } from "./OrdenContext";


const PedidoContext = createContext({});



const PedidoContextProvider = ({children}) => {
    const {dbUser} = useAuthContext();
    const {restaurant, precioTotal, menuOrdenes,orden} = useOrdenContext();
    
    const [pedidos, setPedidos]= useState([]);

    useEffect(()=>{
        DataStore.query(Pedido, o => o.usuarioID("eq", dbUser.id)).then(setPedidos);
    },[dbUser])

    //Se crea el pedido
    const crearPedido = async () =>{
        const nuevoPedido = await DataStore.save(
            new Pedido({
            usuarioID: dbUser.id,
            Restaurant: restaurant,
            estado: 'NUEVO',
            total: precioTotal,
        }));
    //Agrega todas las ordenes al pedido
    await Promise.all(
        menuOrdenes.map((pedidoMenu)=>
        DataStore.save(
            new PedidoMenu({
                cantidad: pedidoMenu.cantidad,
                pedidoID: nuevoPedido.id,
                Dish: pedidoMenu.Dish,
                
            }))
        )
    )


    //Elimina la orden
    await DataStore.delete(orden);
    
    setPedidos([...pedidos, nuevoPedido]);
    }

    const getPedido = async (id) =>{
        const pedido = await DataStore.query(Pedido, id);
        const menuOrdenes = await DataStore.query(PedidoMenu, (od)=>
        od.pedidoID("eq", id));

        return{...pedido, dishes: menuOrdenes};
    }
    return(
        <PedidoContext.Provider value={{crearPedido, pedidos, getPedido}}>
            {children}
        </PedidoContext.Provider>
    )
        
    
}

export default PedidoContextProvider;

export const usePedidoContext = () => useContext(PedidoContext);