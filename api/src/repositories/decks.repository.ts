import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {DbDataSource} from '../datasources';
import {Decks, DecksRelations, Cards} from '../models';
import {CardsRepository} from './cards.repository';

export class DecksRepository extends DefaultCrudRepository<
  Decks,
  typeof Decks.prototype.id,
  DecksRelations
> {

  public readonly cards: HasManyRepositoryFactory<Cards, typeof Decks.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('CardsRepository') protected cardsRepositoryGetter: Getter<CardsRepository>,
  ) {
    super(Decks, dataSource);
    this.cards = this.createHasManyRepositoryFactoryFor('cards', cardsRepositoryGetter,);
    this.registerInclusionResolver('cards', this.cards.inclusionResolver);
  }
}
