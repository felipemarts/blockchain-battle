import {
  repository,
} from '@loopback/repository';
import {
  post,
  param,
} from '@loopback/rest';
import {Cards} from '../models';
import {CardsRepository} from '../repositories';

export class CardsController {
  constructor(
    @repository(CardsRepository)
    public cardsRepository : CardsRepository,
  ) {}

  @post('/cards/{id}/death', {
    responses: {
      '204': {
        description: 'Decks model instance',
      },
    },
  })
  async to(
    @param.path.string('id') id: typeof Cards.prototype.id
  ): Promise<void> {
    let card = await this.cardsRepository.findById(id);
    card.position = -2;
    await this.cardsRepository.update(card);
  }

}
