import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum EstadoPedido {
  NUEVO = "NUEVO",
  PREPARANDO = "PREPARANDO",
  LISTO_PARA_RECOGER = "LISTO_PARA_RECOGER",
  EN_CAMINO = "EN_CAMINO",
  ENTREGADO = "ENTREGADO"
}



type OrdenMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type OrdenMenuMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type DishMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PedidoMenuMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PedidoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RestaurantMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Orden {
  readonly id: string;
  readonly OrdenMenus?: (OrdenMenu | null)[] | null;
  readonly usuarioID: string;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Orden, OrdenMetaData>);
  static copyOf(source: Orden, mutator: (draft: MutableModel<Orden, OrdenMetaData>) => MutableModel<Orden, OrdenMetaData> | void): Orden;
}

export declare class OrdenMenu {
  readonly id: string;
  readonly cantidad: number;
  readonly Dish?: Dish | null;
  readonly ordenID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ordenMenuDishId?: string | null;
  constructor(init: ModelInit<OrdenMenu, OrdenMenuMetaData>);
  static copyOf(source: OrdenMenu, mutator: (draft: MutableModel<OrdenMenu, OrdenMenuMetaData>) => MutableModel<OrdenMenu, OrdenMenuMetaData> | void): OrdenMenu;
}

export declare class Dish {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly description?: string | null;
  readonly price: number;
  readonly restaurantID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Dish, DishMetaData>);
  static copyOf(source: Dish, mutator: (draft: MutableModel<Dish, DishMetaData>) => MutableModel<Dish, DishMetaData> | void): Dish;
}

export declare class PedidoMenu {
  readonly id: string;
  readonly cantidad: number;
  readonly Dish?: Dish | null;
  readonly pedidoID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly pedidoMenuDishId?: string | null;
  constructor(init: ModelInit<PedidoMenu, PedidoMenuMetaData>);
  static copyOf(source: PedidoMenu, mutator: (draft: MutableModel<PedidoMenu, PedidoMenuMetaData>) => MutableModel<PedidoMenu, PedidoMenuMetaData> | void): PedidoMenu;
}

export declare class Pedido {
  readonly id: string;
  readonly usuarioID: string;
  readonly Restaurant?: Restaurant | null;
  readonly total: number;
  readonly estado: EstadoPedido | keyof typeof EstadoPedido;
  readonly PedidoMenus?: (PedidoMenu | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly pedidoRestaurantId?: string | null;
  constructor(init: ModelInit<Pedido, PedidoMetaData>);
  static copyOf(source: Pedido, mutator: (draft: MutableModel<Pedido, PedidoMetaData>) => MutableModel<Pedido, PedidoMetaData> | void): Pedido;
}

export declare class Restaurant {
  readonly id: string;
  readonly name: string;
  readonly image: string;
  readonly deliveryFee: number;
  readonly mindeliveryTime: number;
  readonly maxdeliveryTime: number;
  readonly rating?: number | null;
  readonly address: string;
  readonly lat: number;
  readonly long: number;
  readonly Dishes?: (Dish | null)[] | null;
  readonly Ordens?: (Orden | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Restaurant, RestaurantMetaData>);
  static copyOf(source: Restaurant, mutator: (draft: MutableModel<Restaurant, RestaurantMetaData>) => MutableModel<Restaurant, RestaurantMetaData> | void): Restaurant;
}

export declare class User {
  readonly id: string;
  readonly nombre: string;
  readonly direccion: string;
  readonly lat: number;
  readonly lng: number;
  readonly Pedidos?: (Pedido | null)[] | null;
  readonly Ordens?: (Orden | null)[] | null;
  readonly sub: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}