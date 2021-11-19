import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Rol} from './rol.model';
import {Order} from './order.model';

@model()
export class User extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idUser?: string;

  @property({
    type: 'string',
    required: true,
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
  })
  lastName: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  password?: string;

  @belongsTo(() => Rol, {name: 'rol'})
  idRol: string;

  @hasMany(() => Order, {keyTo: 'idUser'})
  orders: Order[];

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
