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
  Plate,
  OrderDetails,
} from '../models';
import {PlateRepository} from '../repositories';

export class PlateOrderDetailsController {
  constructor(
    @repository(PlateRepository) protected plateRepository: PlateRepository,
  ) { }

  @get('/plates/{id}/order-details', {
    responses: {
      '200': {
        description: 'Array of Plate has many OrderDetails',
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
    return this.plateRepository.orderDetails(id).find(filter);
  }

  @post('/plates/{id}/order-details', {
    responses: {
      '200': {
        description: 'Plate model instance',
        content: {'application/json': {schema: getModelSchemaRef(OrderDetails)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Plate.prototype.idPlate,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OrderDetails, {
            title: 'NewOrderDetailsInPlate',
            exclude: ['idOrderDetails'],
            optional: ['idPlate']
          }),
        },
      },
    }) orderDetails: Omit<OrderDetails, 'idOrderDetails'>,
  ): Promise<OrderDetails> {
    return this.plateRepository.orderDetails(id).create(orderDetails);
  }

  @patch('/plates/{id}/order-details', {
    responses: {
      '200': {
        description: 'Plate.OrderDetails PATCH success count',
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
    return this.plateRepository.orderDetails(id).patch(orderDetails, where);
  }

  @del('/plates/{id}/order-details', {
    responses: {
      '200': {
        description: 'Plate.OrderDetails DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(OrderDetails)) where?: Where<OrderDetails>,
  ): Promise<Count> {
    return this.plateRepository.orderDetails(id).delete(where);
  }
}
