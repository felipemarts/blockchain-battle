import {Entity, model, property} from '@loopback/repository';

@model()
export class Cards extends Entity {
  @property({
    id: true,
    type: 'string',
    defaultFn: 'uuid',
  })
  id?: string;

  @property({
    type: 'string',
  })
  name: string;

  @property({
    type: 'number',
    default: -1,
  })
  position?: number;

  @property({
    type: 'string',
  })
  costType: string;

  @property({
    type: 'string',
  })
  cardType: string;

  @property({
    type: 'number',
  })
  cost: number;

  @property({
    type: 'number',
  })
  attack: number;

  @property({
    type: 'number',
  })
  defense: number;

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'string',
  })
  bonusTarget: string;

  @property({
    type: 'number',
  })
  bonusAmountAttack: number;

  @property({
    type: 'number',
  })
  bonusAmountDefense: number;

  @property({
    type: 'number',
  })
  bonusAmountLife: number;

  @property({
    type: 'boolean',
  })
  bonusSuportCommunity: boolean;

  @property({
    type: 'string',
  })
  decksId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cards>) {
    super(data);
  }
}

export interface CardsRelations {
  // describe navigational properties here
}

export type CardsWithRelations = Cards & CardsRelations;
