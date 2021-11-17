import {Entity, model, property} from '@loopback/repository';

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
    required: true,
  })
  plateState: boolean;

  @property({
    type: 'string',
    required: true,
  })
  plateDescription: string;

  @property({
    type: 'string',
  })
  idDishCategory?: string;

  constructor(data?: Partial<Plate>) {
    super(data);
  }
}

export interface PlateRelations {
  // describe navigational properties here
}

export type PlateWithRelations = Plate & PlateRelations;
