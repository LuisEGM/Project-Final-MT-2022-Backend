import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  OrderDetails,
  Order,
} from '../models';
import {OrderDetailsRepository} from '../repositories';

export class OrderDetailsOrderController {
  constructor(
    @repository(OrderDetailsRepository)
    public orderDetailsRepository: OrderDetailsRepository,
  ) { }

  @get('/order-details/{id}/order', {
    responses: {
      '200': {
        description: 'Order belonging to OrderDetails',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Order)},
          },
        },
      },
    },
  })
  async getOrder(
    @param.path.string('id') id: typeof OrderDetails.prototype.idOrderDetails,
  ): Promise<Order> {
    return this.orderDetailsRepository.order(id);
  }
}
