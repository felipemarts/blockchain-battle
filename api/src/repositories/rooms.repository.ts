import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Rooms, RoomsRelations} from '../models';

export class RoomsRepository extends DefaultCrudRepository<
  Rooms,
  typeof Rooms.prototype.id,
  RoomsRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Rooms, dataSource);
  }
}
