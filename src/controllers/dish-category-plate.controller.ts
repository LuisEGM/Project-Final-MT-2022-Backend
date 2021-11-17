import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  DishCategory,
  Plate,
} from '../models';
import {DishCategoryRepository} from '../repositories';

export class DishCategoryPlateController {
  constructor(
    @repository(DishCategoryRepository) protected dishCategoryRepository: DishCategoryRepository,
  ) { }

  @get('/dish-categories/{id}/plates', {
    responses: {
      '200': {
        description: 'Array of DishCategory has many Plate',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Plate)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Plate>,
  ): Promise<Plate[]> {
    return this.dishCategoryRepository.plates(id).find(filter);
  }

  @post('/dish-categories/{id}/plates', {
    responses: {
      '200': {
        description: 'DishCategory model instance',
        content: {'application/json': {schema: getModelSchemaRef(Plate)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof DishCategory.prototype.idDishCategory,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plate, {
            title: 'NewPlateInDishCategory',
            exclude: ['idPlate'],
            optional: ['idDishCategory']
          }),
        },
      },
    }) plate: Omit<Plate, 'idPlate'>,
  ): Promise<Plate> {
    return this.dishCategoryRepository.plates(id).create(plate);
  }

  @patch('/dish-categories/{id}/plates', {
    responses: {
      '200': {
        description: 'DishCategory.Plate PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plate, {partial: true}),
        },
      },
    })
    plate: Partial<Plate>,
    @param.query.object('where', getWhereSchemaFor(Plate)) where?: Where<Plate>,
  ): Promise<Count> {
    return this.dishCategoryRepository.plates(id).patch(plate, where);
  }

  @del('/dish-categories/{id}/plates', {
    responses: {
      '200': {
        description: 'DishCategory.Plate DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Plate)) where?: Where<Plate>,
  ): Promise<Count> {
    return this.dishCategoryRepository.plates(id).delete(where);
  }
}
