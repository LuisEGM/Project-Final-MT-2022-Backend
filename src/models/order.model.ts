import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {User} from './user.model';
import {Table} from './table.model';
import {OrderDetails} from './order-details.model';

@model()
export class Order extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idOrder?: string;

  @property({
    type: 'date',
    required: true,
  })
  orderDate: string;

  @belongsTo(() => User, {name: 'user'})
  idUser: string;

  @belongsTo(() => Table, {name: 'table'})
  idTable: string;

  @hasMany(() => OrderDetails, {keyTo: 'idOrder'})
  orderDetails: OrderDetails[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
