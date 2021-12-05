import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cards} from './cards.model';

@model()
export class Decks extends Entity {
  @property({
    id: true,
    type: 'string',
    defaultFn: 'uuid',
  })
  id: string;

  @hasMany(() => Cards)
  cards: Cards[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Decks>) {
    super(data);
  }
}

export interface DecksRelations {
  // describe navigational properties here
}

export type DecksWithRelations = Decks & DecksRelations;
