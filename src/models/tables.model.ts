import {Entity, model, property, hasMany} from '@loopback/repository';
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
  qrCode: string;

  @property({
    type: 'number',
    required: true,
  })
  numberChairs: number;

  @hasMany(() => Order, {keyTo: 'idTable'})
  orders: Order[];

  constructor(data?: Partial<Tables>) {
    super(data);
  }
}

export interface TablesRelations {
  // describe navigational properties here
}

export type TablesWithRelations = Tables & TablesRelations;
