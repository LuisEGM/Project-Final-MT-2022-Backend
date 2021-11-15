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
import {Tables} from '../models';
import {TablesRepository} from '../repositories';

export class TablesController {
  constructor(
    @repository(TablesRepository)
    public tablesRepository : TablesRepository,
  ) {}

  @post('/tables')
  @response(200, {
    description: 'Tables model instance',
    content: {'application/json': {schema: getModelSchemaRef(Tables)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tables, {
            title: 'NewTables',
            exclude: ['idTable'],
          }),
        },
      },
    })
    tables: Omit<Tables, 'idTable'>,
  ): Promise<Tables> {
    return this.tablesRepository.create(tables);
  }

  @get('/tables/count')
  @response(200, {
    description: 'Tables model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Tables) where?: Where<Tables>,
  ): Promise<Count> {
    return this.tablesRepository.count(where);
  }

  @get('/tables')
  @response(200, {
    description: 'Array of Tables model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Tables, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Tables) filter?: Filter<Tables>,
  ): Promise<Tables[]> {
    return this.tablesRepository.find(filter);
  }

  @patch('/tables')
  @response(200, {
    description: 'Tables PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tables, {partial: true}),
        },
      },
    })
    tables: Tables,
    @param.where(Tables) where?: Where<Tables>,
  ): Promise<Count> {
    return this.tablesRepository.updateAll(tables, where);
  }

  @get('/tables/{id}')
  @response(200, {
    description: 'Tables model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Tables, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Tables, {exclude: 'where'}) filter?: FilterExcludingWhere<Tables>
  ): Promise<Tables> {
    return this.tablesRepository.findById(id, filter);
  }

  @patch('/tables/{id}')
  @response(204, {
    description: 'Tables PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Tables, {partial: true}),
        },
      },
    })
    tables: Tables,
  ): Promise<void> {
    await this.tablesRepository.updateById(id, tables);
  }

  @put('/tables/{id}')
  @response(204, {
    description: 'Tables PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() tables: Tables,
  ): Promise<void> {
    await this.tablesRepository.replaceById(id, tables);
  }

  @del('/tables/{id}')
  @response(204, {
    description: 'Tables DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.tablesRepository.deleteById(id);
  }
}
