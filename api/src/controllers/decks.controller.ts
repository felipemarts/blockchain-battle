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
import { NewDeckDTO } from '../dto/decks.dto';
import { Cards, Decks } from '../models';
import { CardsRepository, DecksRepository } from '../repositories';
import fs from 'fs';

const getRandomCards = (allCards: Cards[], cards: Cards[], costType: string, amount: number) => {
  let typeCards: Cards[] = [];
  allCards.forEach(card => {
    if (card.costType === costType) {
      typeCards.push(card);
    }
  });
  for (let i = 0; i < amount; i++) {
    cards.push(typeCards[Math.floor(Math.random() * typeCards.length)]);
  }
}

export class DecksController {
  constructor(
    @repository(DecksRepository) public decksRepository: DecksRepository,
    @repository(CardsRepository) public cardsRepository: CardsRepository,
  ) { }

  @post('/decks')
  @response(200, {
    description: 'Decks model instance',
    content: { 'application/json': { schema: getModelSchemaRef(Decks) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewDeckDTO),
        },
      },
    })
    newDeckDTO: NewDeckDTO,
  ): Promise<Decks> {
    let json = fs.readFileSync('./src/assets/cards.json', 'utf8');
    let allCards: Cards[] = JSON.parse(json);
    allCards.forEach(card => {
      card.id = undefined;
    })
    let cards: Cards[] = [];

    getRandomCards(allCards, cards, 'blockchain', newDeckDTO.blockchainCards);
    getRandomCards(allCards, cards, 'frontend', newDeckDTO.frontendCards);
    getRandomCards(allCards, cards, 'smartcontract', newDeckDTO.smartcontractsCards);
    getRandomCards([new Cards({costType: 'blockchain'})], cards, 'blockchain', newDeckDTO.blockchainDevs);
    getRandomCards([new Cards({costType: 'frontend'})], cards, 'frontend', newDeckDTO.frontendDevs);
    getRandomCards([new Cards({costType: 'smartcontract'})], cards, 'smartcontract', newDeckDTO.smartcontractsDevs);
    getRandomCards([new Cards({costType: 'intern'})], cards, 'intern', newDeckDTO.internDevs);

    let deck = new Decks();
    deck = await this.decksRepository.create(deck);
    for await (let card of cards) {
      card.decksId = deck.id;
      await this.cardsRepository.create(card);
    }
    return deck;
  }

  @get('/decks/count')
  @response(200, {
    description: 'Decks model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(
    @param.where(Decks) where?: Where<Decks>,
  ): Promise<Count> {

    return this.decksRepository.count(where);
  }

  @get('/decks')
  @response(200, {
    description: 'Array of Decks model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Decks, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(Decks) filter?: Filter<Decks>,
  ): Promise<Decks[]> {
    return this.decksRepository.find(filter);
  }

  @del('/decks/{id}')
  @response(204, {
    description: 'Decks DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.decksRepository.deleteById(id);
  }
}
