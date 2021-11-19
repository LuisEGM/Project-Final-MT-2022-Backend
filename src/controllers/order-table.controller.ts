import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Order,
  Table,
} from '../models';
import {OrderRepository} from '../repositories';

export class OrderTableController {
  constructor(
    @repository(OrderRepository)
    public orderRepository: OrderRepository,
  ) { }

  @get('/orders/{id}/table', {
    responses: {
      '200': {
        description: 'Table belonging to Order',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Table)},
          },
        },
      },
    },
  })
  async getTable(
    @param.path.string('id') id: typeof Order.prototype.idOrder,
  ): Promise<Table> {
    return this.orderRepository.table(id);
  }
}
