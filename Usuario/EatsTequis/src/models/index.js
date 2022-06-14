// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const EstadoPedido = {
  "NUEVO": "NUEVO",
  "PREPARANDO": "PREPARANDO",
  "LISTO_PARA_RECOGER": "LISTO_PARA_RECOGER",
  "EN_CAMINO": "EN_CAMINO",
  "ENTREGADO": "ENTREGADO"
};

const { Orden, OrdenMenu, Dish, PedidoMenu, Pedido, Restaurant, User } = initSchema(schema);

export {
  Orden,
  OrdenMenu,
  Dish,
  PedidoMenu,
  Pedido,
  Restaurant,
  User,
  EstadoPedido
};