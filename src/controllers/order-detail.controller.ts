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
import {OrderDetails} from '../models';
import {OrderDetailsRepository} from '../repositories';

export class OrderDetailController {
  constructor(
    @repository(OrderDetailsRepository)
    public orderDetailsRepository : OrderDetailsRepository,
  ) {}

  @post('/order-details')
  @response(200, {
    description: 'OrderDetails model instance',
    content: {'application/json': {schema: getModelSchemaRef(OrderDetails)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {
            title: 'NewOrderDetails',
            exclude: ['idOrderDetails'],
          }),
        },
      },
    })
    orderDetails: Omit<OrderDetails, 'idOrderDetails'>,
  ): Promise<OrderDetails> {
    return this.orderDetailsRepository.create(orderDetails);
  }

  @get('/order-details/count')
  @response(200, {
    description: 'OrderDetails model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(OrderDetails) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.orderDetailsRepository.count(where);
  }

  @get('/order-details')
  @response(200, {
    description: 'Array of OrderDetails model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(OrderDetails, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(OrderDetails) filter?: Filter<OrderDetails>,
  ): Promise<OrderDetails[]> {
    return this.orderDetailsRepository.find(filter);
  }

  @patch('/order-details')
  @response(200, {
    description: 'OrderDetails PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {partial: true}),
        },
      },
    })
    orderDetails: OrderDetails,
    @param.where(OrderDetails) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.orderDetailsRepository.updateAll(orderDetails, where);
  }

  @get('/order-details/{id}')
  @response(200, {
    description: 'OrderDetails model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(OrderDetails, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(OrderDetails, {exclude: 'where'}) filter?: FilterExcludingWhere<OrderDetails>
  ): Promise<OrderDetails> {
    return this.orderDetailsRepository.findById(id, filter);
  }

  @patch('/order-details/{id}')
  @response(204, {
    description: 'OrderDetails PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {partial: true}),
        },
      },
    })
    orderDetails: OrderDetails,
  ): Promise<void> {
    await this.orderDetailsRepository.updateById(id, orderDetails);
  }

  @put('/order-details/{id}')
  @response(204, {
    description: 'OrderDetails PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() orderDetails: OrderDetails,
  ): Promise<void> {
    await this.orderDetailsRepository.replaceById(id, orderDetails);
  }

  @del('/order-details/{id}')
  @response(204, {
    description: 'OrderDetails DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.orderDetailsRepository.deleteById(id);
  }
}
