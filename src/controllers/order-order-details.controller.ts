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
  Order,
  OrderDetails,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderOrderDetailsController {
  constructor(
    @repository(OrderRepository) protected orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/order-details', {
    responses: {
      '200': {
        description: 'Array of Order has many OrderDetails',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(OrderDetails)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<OrderDetails>,
  ): Promise<OrderDetails[]> {
    return this.orderRepository.orderDetails(id).find(filter);
  }

  @post('/orders/{id}/order-details', {
    responses: {
      '200': {
        description: 'Order model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderDetails)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Order.prototype.idOrder,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {
            title: 'NewOrderDetailsInOrder',
            exclude: ['idOrderDetails'],
            optional: ['idOrder']
          }),
        },
      },
    }) orderDetails: Omit<OrderDetails, 'idOrderDetails'>,
  ): Promise<OrderDetails> {
    return this.orderRepository.orderDetails(id).create(orderDetails);
  }

  @patch('/orders/{id}/order-details', {
    responses: {
      '200': {
        description: 'Order.OrderDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {partial: true}),
        },
      },
    })
    orderDetails: Partial<OrderDetails>,
    @param.query.object('where', getWhereSchemaFor(OrderDetails)) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.orderRepository.orderDetails(id).patch(orderDetails, where);
  }

  @del('/orders/{id}/order-details', {
    responses: {
      '200': {
        description: 'Order.OrderDetails DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrderDetails)) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.orderRepository.orderDetails(id).delete(where);
  }
}
