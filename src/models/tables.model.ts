import {Entity, model, property, hasOne} from '@loopback/repository';
import {Order} from './order.model';

@model()
export class Tables extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idTable?: string;

  @property({
    type: 'number',
    required: true,
  })
  tableNumber: number;

  @property({
    type: 'string',
    required: true,
  })
  qr_code: string;

  @property({
    type: 'number',
    required: true,
  })
  number_chairs: number;

  @hasOne(() => Order, {keyTo: 'idTable'})
  order: Order;

  constructor(data?: Partial<Tables>) {
    super(data);
  }
}

export interface TablesRelations {
  // describe navigational properties here
}

export type TablesWithRelations = Tables & TablesRelations;
