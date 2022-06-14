import { createContext, useState, useEffect, useContext } from "react";
import {DataStore} from "aws-amplify";
import {Orden,OrdenMenu} from "../models";
import {useAuthContext} from './AuthContext';

const OrdenContext = createContext({});

const OrdenContextProvider = ({children}) =>{
    const {dbUser} = useAuthContext();

    const [restaurant, setRestaurant] = useState(null);
    const [orden, setOrden] = useState (null);
    const [menuOrdenes, setMenuOrdenes] = useState ([]);

    const precioTotal = menuOrdenes.reduce(
        (sum, OrdenMenu) => sum + OrdenMenu.cantidad * OrdenMenu.Dish.price,
        restaurant?.deliveryFee,
    );

    useEffect(()=>{
        DataStore.query(Orden, (b) => 
        b.restaurantID("eq", restaurant.id).usuarioID("eq", dbUser.id)
        ).then((ordenes)=> setOrden(ordenes[0]));
    },[dbUser, restaurant]);

    useEffect(() =>{
        if(orden){
            DataStore.query(OrdenMenu, (bd)=>bd.ordenID("eq", orden.id)).then(
                setMenuOrdenes
            )
        }
    }, [orden])

    const agregarMenuAOrden = async (dish, cantidad) =>{
        //obtener la orden existente o crear una nueva
        let laOrden = orden || (await crearNuevaOrden());
        //crear nuevo OrdenMenu item y guardarlo en la base de datos
        const newMenu = await DataStore.save(new OrdenMenu({cantidad, Dish: dish, ordenID: laOrden.id}))
        setMenuOrdenes([...menuOrdenes, newMenu])
    };

    const crearNuevaOrden = async () =>{
        const nuevaOrden = await DataStore.save(
            new Orden({usuarioID: dbUser.id, restaurantID: restaurant.id})
        );
        setOrden(nuevaOrden);
        return nuevaOrden;
    }
    


   
    

    return (
        <OrdenContext.Provider value={{agregarMenuAOrden, setRestaurant, restaurant,orden, menuOrdenes, precioTotal }}>
            {children}
        </OrdenContext.Provider>
    );
};

export default OrdenContextProvider;

export const useOrdenContext = () => useContext(OrdenContext);