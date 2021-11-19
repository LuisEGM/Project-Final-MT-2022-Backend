import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {DishCategory} from './dish-category.model';
import {OrderDetails} from './order-details.model';

@model()
export class Plate extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPlate?: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  plateName: string;

  @property({
    type: 'boolean',
    default: true,
  })
  plateState?: boolean;

  @property({
    type: 'string',
    required: true,
  })
  plateDescription: string;

  @belongsTo(() => DishCategory, {name: 'dishCategory'})
  idDishCategory: string;

  @hasMany(() => OrderDetails, {keyTo: 'idPlate'})
  orderDetails: OrderDetails[];

  constructor(data?: Partial<Plate>) {
    super(data);
  }
}

export interface PlateRelations {
  // describe navigational properties here
}

export type PlateWithRelations = Plate & PlateRelations;
