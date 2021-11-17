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
import {Plate} from '../models';
import {PlateRepository} from '../repositories';

export class PlateController {
  constructor(
    @repository(PlateRepository)
    public plateRepository : PlateRepository,
  ) {}

  @post('/plates')
  @response(200, {
    description: 'Plate model instance',
    content: {'application/json': {schema: getModelSchemaRef(Plate)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plate, {
            title: 'NewPlate',
            exclude: ['idPlate'],
          }),
        },
      },
    })
    plate: Omit<Plate, 'idPlate'>,
  ): Promise<Plate> {
    return this.plateRepository.create(plate);
  }

  @get('/plates/count')
  @response(200, {
    description: 'Plate model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Plate) where?: Where<Plate>,
  ): Promise<Count> {
    return this.plateRepository.count(where);
  }

  @get('/plates')
  @response(200, {
    description: 'Array of Plate model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Plate, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Plate) filter?: Filter<Plate>,
  ): Promise<Plate[]> {
    return this.plateRepository.find(filter);
  }

  @patch('/plates')
  @response(200, {
    description: 'Plate PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plate, {partial: true}),
        },
      },
    })
    plate: Plate,
    @param.where(Plate) where?: Where<Plate>,
  ): Promise<Count> {
    return this.plateRepository.updateAll(plate, where);
  }

  @get('/plates/{id}')
  @response(200, {
    description: 'Plate model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Plate, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Plate, {exclude: 'where'}) filter?: FilterExcludingWhere<Plate>
  ): Promise<Plate> {
    return this.plateRepository.findById(id, filter);
  }

  @patch('/plates/{id}')
  @response(204, {
    description: 'Plate PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Plate, {partial: true}),
        },
      },
    })
    plate: Plate,
  ): Promise<void> {
    await this.plateRepository.updateById(id, plate);
  }

  @put('/plates/{id}')
  @response(204, {
    description: 'Plate PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() plate: Plate,
  ): Promise<void> {
    await this.plateRepository.replaceById(id, plate);
  }

  @del('/plates/{id}')
  @response(204, {
    description: 'Plate DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.plateRepository.deleteById(id);
  }
}
