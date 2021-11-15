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
  Tables,
  Order,
} from '../models';
import {TablesRepository} from '../repositories';

export class TablesOrderController {
  constructor(
    @repository(TablesRepository) protected tablesRepository: TablesRepository,
  ) { }

  @get('/tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Tables has many Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Order>,
  ): Promise<Order[]> {
    return this.tablesRepository.orders(id).find(filter);
  }

  @post('/tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Tables model instance',
        content: {'application/json': {schema: getModelSchemaRef(Order)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Tables.prototype.idTable,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {
            title: 'NewOrderInTables',
            exclude: ['idOrder'],
            optional: ['idTable']
          }),
        },
      },
    }) order: Omit<Order, 'idOrder'>,
  ): Promise<Order> {
    return this.tablesRepository.orders(id).create(order);
  }

  @patch('/tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Tables.Order PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Order, {partial: true}),
        },
      },
    })
    order: Partial<Order>,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.tablesRepository.orders(id).patch(order, where);
  }

  @del('/tables/{id}/orders', {
    responses: {
      '200': {
        description: 'Tables.Order DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Order)) where?: Where<Order>,
  ): Promise<Count> {
    return this.tablesRepository.orders(id).delete(where);
  }
}
