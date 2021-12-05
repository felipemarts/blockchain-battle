import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Cards, CardsRelations} from '../models';

export class CardsRepository extends DefaultCrudRepository<
  Cards,
  typeof Cards.prototype.id,
  CardsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Cards, dataSource);
  }
}
