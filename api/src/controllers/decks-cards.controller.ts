import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
} from '@loopback/rest';
import {
  Decks,
  Cards,
} from '../models';
import { CardsRepository, DecksRepository } from '../repositories';

export class DecksCardsController {
  constructor(
    @repository(DecksRepository) protected decksRepository: DecksRepository,
    @repository(CardsRepository) public cardsRepository: CardsRepository,
  ) { }

  @get('/decks/{id}/cards', {
    responses: {
      '200': {
        description: 'Array of Decks has many Cards',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(Cards) },
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string
  ): Promise<Cards[]> {
    return this.decksRepository.cards(id).find();
  }

  @post('/decks/{id}/to-hand', {
    responses: {
      '200': {
        description: 'Decks model instance',
        content: { 'application/json': { schema: getModelSchemaRef(Cards) } },
      },
    },
  })
  async toHand(
    @param.path.string('id') id: typeof Decks.prototype.id
  ): Promise<Cards> {
    let cards = await this.decksRepository.cards(id).find();
    let card = await cards[Math.floor(Math.random() * cards.length)];
    card.position = 0;
    await this.cardsRepository.update(card);
    return card;
  }

  @post('/decks/{id}/reset', {
    responses: {
      '204': {
        description: 'Decks model instance',
      },
    },
  })
  async to(
    @param.path.string('id') id: typeof Decks.prototype.id
  ): Promise<void> {
    let cards = await this.decksRepository.cards(id).find();
    for await (const card of cards) {
      card.position = -1;
      await this.cardsRepository.update(card);
    }
  }

}
