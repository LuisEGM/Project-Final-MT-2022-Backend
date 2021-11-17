import {Entity, model, property, hasMany} from '@loopback/repository';
import {Plate} from './plate.model';

@model()
export class DishCategory extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idDishCategory?: string;

  @property({
    type: 'string',
    required: true,
  })
  dishCategoryName: string;

  @property({
    type: 'string',
    required: true,
  })
  dishCategoryDescription: string;

  @hasMany(() => Plate, {keyTo: 'idDishCategory'})
  plates: Plate[];

  constructor(data?: Partial<DishCategory>) {
    super(data);
  }
}

export interface DishCategoryRelations {
  // describe navigational properties here
}

export type DishCategoryWithRelations = DishCategory & DishCategoryRelations;
