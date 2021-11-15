import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Rol extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRol?: string;

  @property({
    type: 'string',
    required: true,
  })
  rolName: string;

  @property({
    type: 'string',
    required: true,
  })
  rolDescription: string;

  @hasMany(() => User, {keyTo: 'idRol'})
  users: User[];

  constructor(data?: Partial<Rol>) {
    super(data);
  }
}

export interface RolRelations {
  // describe navigational properties here
}

export type RolWithRelations = Rol & RolRelations;
