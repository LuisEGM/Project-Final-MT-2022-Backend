import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {DishCategory} from '../models';
import {DishCategoryRepository} from '../repositories';

export class DishCategoryController {
  constructor(
    @repository(DishCategoryRepository)
    public dishCategoryRepository : DishCategoryRepository,
  ) {}

  @post('/dish-categories')
  @response(200, {
    description: 'DishCategory model instance',
    content: {'application/json': {schema: getModelSchemaRef(DishCategory)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DishCategory, {
            title: 'NewDishCategory',
            exclude: ['idDishCategory'],
          }),
        },
      },
    })
    dishCategory: Omit<DishCategory, 'idDishCategory'>,
  ): Promise<DishCategory> {
    return this.dishCategoryRepository.create(dishCategory);
  }

  @get('/dish-categories/count')
  @response(200, {
    description: 'DishCategory model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(DishCategory) where?: Where<DishCategory>,
  ): Promise<Count> {
    return this.dishCategoryRepository.count(where);
  }

  @get('/dish-categories')
  @response(200, {
    description: 'Array of DishCategory model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(DishCategory, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(DishCategory) filter?: Filter<DishCategory>,
  ): Promise<DishCategory[]> {
    return this.dishCategoryRepository.find(filter);
  }

  @patch('/dish-categories')
  @response(200, {
    description: 'DishCategory PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DishCategory, {partial: true}),
        },
      },
    })
    dishCategory: DishCategory,
    @param.where(DishCategory) where?: Where<DishCategory>,
  ): Promise<Count> {
    return this.dishCategoryRepository.updateAll(dishCategory, where);
  }

  @get('/dish-categories/{id}')
  @response(200, {
    description: 'DishCategory model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(DishCategory, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(DishCategory, {exclude: 'where'}) filter?: FilterExcludingWhere<DishCategory>
  ): Promise<DishCategory> {
    return this.dishCategoryRepository.findById(id, filter);
  }

  @patch('/dish-categories/{id}')
  @response(204, {
    description: 'DishCategory PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DishCategory, {partial: true}),
        },
      },
    })
    dishCategory: DishCategory,
  ): Promise<void> {
    await this.dishCategoryRepository.updateById(id, dishCategory);
  }

  @put('/dish-categories/{id}')
  @response(204, {
    description: 'DishCategory PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() dishCategory: DishCategory,
  ): Promise<void> {
    await this.dishCategoryRepository.replaceById(id, dishCategory);
  }

  @del('/dish-categories/{id}')
  @response(204, {
    description: 'DishCategory DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.dishCategoryRepository.deleteById(id);
  }
}
