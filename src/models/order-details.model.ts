import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Order} from './order.model';
import {Plate} from './plate.model';

@model()
export class OrderDetails extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idOrderDetails?: string;

  @property({
    type: 'number',
    required: true,
  })
  unitPrice: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
    required: true,
  })
  discount: number;

  @belongsTo(() => Order, {name: 'order'})
  idOrder: string;

  @belongsTo(() => Plate, {name: 'plate'})
  idPlate: string;

  constructor(data?: Partial<OrderDetails>) {
    super(data);
  }
}

export interface OrderDetailsRelations {
  // describe navigational properties here
}

export type OrderDetailsWithRelations = OrderDetails & OrderDetailsRelations;
