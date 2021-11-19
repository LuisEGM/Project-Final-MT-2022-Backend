import {Entity, model, property, hasMany} from '@loopback/repository';
import {Order} from './order.model';

@model()
export class Table extends Entity {
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
    type: 'string',
    required: true,
  })
  chairsNumber: string;

  @hasMany(() => Order, {keyTo: 'idTable'})
  orders: Order[];

  constructor(data?: Partial<Table>) {
    super(data);
  }
}

export interface TableRelations {
  // describe navigational properties here
}

export type TableWithRelations = Table & TableRelations;
